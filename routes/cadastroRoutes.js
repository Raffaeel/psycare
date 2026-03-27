
import express from 'express';
import cadastroController from '../controllers/cadastroController.js';

const router = express.Router();

router.post('/cadastro', cadastroController.criarCadastro);
router.get('/cadastro', cadastroController.listarCadastros);
router.delete('/cadastro/:id', cadastroController.removerCadastro);

export default router;  