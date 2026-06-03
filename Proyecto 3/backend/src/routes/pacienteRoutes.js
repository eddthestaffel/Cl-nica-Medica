const express = require('express');
const c = require('../controllers/pacienteController');
const v = require('../validators/pacienteValidators');
const validate = require('../middlewares/validate');
const { verifyAccessToken } = require('../middlewares/auth');

const router = express.Router();
router.use(verifyAccessToken);
router.get('/', c.list);
router.get('/:id', v.idParam, validate, c.getById);
router.post('/', v.create, validate, c.create);
router.put('/:id', [...v.idParam, ...v.create], validate, c.update);
router.delete('/:id', v.idParam, validate, c.remove);
module.exports = router;