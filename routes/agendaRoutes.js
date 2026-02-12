import express from "express";
import agendaController from "../controllers/agendaController.js";

const router = express.Router();

router.post("/agenda", agendaController.criarAgendamento);
router.get("/agenda", agendaController.listarAgendamentos);
router.delete("/agenda/:id", agendaController.removerAgendamento);

export default router;
