const express = require('express');
const c = require('../controllers/turnoController');
const v = require('../validators/turnoValidators');
const validate = require('../middlewares/validate');
const { verifyAccessToken } = require('../middlewares/auth');

const router = express.Router();
router.use(verifyAccessToken);
router.get('/agenda', v.agendaQuery, validate, c.agenda);
router.get('/', c.list);
router.get('/:id', v.idParam, validate, c.getById);
router.post('/', v.create, validate, c.create);
router.put('/:id', [...v.idParam, ...v.create], validate, c.update);
router.patch('/:id/estado', [...v.idParam, ...v.cambiarEstado], validate, c.cambiarEstado);
router.delete('/:id', v.idParam, validate, c.remove);
module.exports = router;