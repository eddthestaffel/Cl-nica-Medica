const { Op } = require('sequelize');
const db = require('../models');
const { AppError } = require('../utils/errors');
const tokenService = require('./tokenService');

const { Usuario, RefreshToken } = db;

const issueTokens = async (usuario, meta = {}) => {
  const opaqueRefresh = tokenService.generateOpaqueRefreshToken();
  const session = await RefreshToken.create({
    usuarioId: usuario.id,
    tokenHash: tokenService.hashToken(opaqueRefresh),
    userAgent: meta.userAgent || null,
    ip: meta.ip || null,
    expiresAt: tokenService.getRefreshExpiresAt(),
  });
  const accessToken = tokenService.signAccessToken(usuario);
  const refreshTokenJwt = tokenService.signRefreshToken(usuario, session.id);
  return { accessToken, refreshToken: `${refreshTokenJwt}.${opaqueRefresh}`, expiresIn: '15m', sessionId: session.id };
};

const parseRefreshToken = refreshToken => {
  const lastDot = refreshToken.lastIndexOf('.');
  if (lastDot === -1) throw new AppError('Refresh token inválido', 401);
  return { jwtPart: refreshToken.slice(0, lastDot), opaquePart: refreshToken.slice(lastDot + 1) };
};

const findActiveSession = async refreshToken => {
  const { jwtPart, opaquePart } = parseRefreshToken(refreshToken);
  let payload;
  try { payload = tokenService.verifyRefreshToken(jwtPart); } catch { throw new AppError('Refresh token expirado o inválido', 401); }
  if (payload.type !== 'refresh') throw new AppError('Refresh token inválido', 401);
  const session = await RefreshToken.findByPk(payload.sid);
  if (!session || session.usuarioId !== payload.sub) throw new AppError('Sesión no encontrada', 401);
  const hash = tokenService.hashToken(opaquePart);
  if (session.tokenHash !== hash || !session.isActive()) throw new AppError('Sesión revocada o expirada', 401);
  const usuario = await Usuario.findByPk(payload.sub);
  if (!usuario) throw new AppError('Usuario no encontrado', 401);
  return { usuario, session };
};

const refreshTokens = async refreshToken => {
  const { usuario, session } = await findActiveSession(refreshToken);
  await session.update({ revokedAt: new Date() });
  return issueTokens(usuario, { userAgent: session.userAgent, ip: session.ip });
};

const revokeSession = async refreshToken => {
  const { session } = await findActiveSession(refreshToken);
  await session.update({ revokedAt: new Date() });
};

const revokeSessionById = async (usuarioId, sessionId) => {
  const session = await RefreshToken.findOne({ where: { id: sessionId, usuarioId } });
  if (!session) throw new AppError('Sesión no encontrada', 404);
  if (!session.revokedAt) await session.update({ revokedAt: new Date() });
  return session;
};

const revokeAllSessions = async (usuarioId, exceptSessionId = null) => {
  const where = { usuarioId, revokedAt: null, expiresAt: { [Op.gt]: new Date() } };
  if (exceptSessionId) where.id = { [Op.ne]: exceptSessionId };
  await RefreshToken.update({ revokedAt: new Date() }, { where });
};

const listActiveSessions = async usuarioId => {
  const sessions = await RefreshToken.findAll({
    where: { usuarioId, revokedAt: null, expiresAt: { [Op.gt]: new Date() } },
    order: [['createdAt', 'DESC']],
  });
  return sessions.map(s => s.toSessionJSON());
};

const getCurrentSessionIdFromToken = async refreshToken => {
  if (!refreshToken) return null;
  try { const { session } = await findActiveSession(refreshToken); return session.id; } catch { return null; }
};

module.exports = { issueTokens, refreshTokens, revokeSession, revokeSessionById, revokeAllSessions, listActiveSessions, getCurrentSessionIdFromToken };