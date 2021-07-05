import { Router } from "express";
import { InsertDeveloperController } from "./controllers/InsertDeveloperController";
import { GetDevelopersController } from "./controllers/GetDevelopersController";
import { GetDeveloperController } from "./controllers/GetDeveloperController";
import { DeleteDeveloperController } from "./controllers/DeleteDeveloperController";
import { EditDeveloperController } from "./controllers/EditDeveloperController";

const router = Router();

router.post("/developers", new InsertDeveloperController().insert);
router.get("/developers", new GetDevelopersController().getAll);
router.get("/developers/:id", new GetDeveloperController().getOne);
router.delete("/developers/:id", new DeleteDeveloperController().delete);
router.put("/developers/:id", new EditDeveloperController().edit);

export { router };
