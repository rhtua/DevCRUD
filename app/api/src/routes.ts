import { Router } from "express";
import { InserirDesenvolvedorController } from "./controllers/InserirDesenvolvedorController";
import { ObterDesenvolvedoresController } from "./controllers/ObterDesenvolvedoresController";
import { ObterDesenvolvedorController } from "./controllers/ObterDesenvolvedorController";
import { ExcluirDesenvolvedorController } from "./controllers/ExcluirDesenvolvedorController";
import { EditarDesenvolvedorController } from "./controllers/EditarDesenvolvedorController";

const router = Router();

router.post("/developers", new InserirDesenvolvedorController().inserir);
router.get("/developers", new ObterDesenvolvedoresController().obterTodos);
router.get("/developers/:id", new ObterDesenvolvedorController().obterUm);
router.delete("/developers/:id", new ExcluirDesenvolvedorController().excluir);
router.put("/developers/:id", new EditarDesenvolvedorController().editar);

export { router };
