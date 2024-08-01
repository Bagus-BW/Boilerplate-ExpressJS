import { Router } from "express";
import { TodoController, TodoDatasourceImpl, TodoRepositoryImpl } from "@/modules/todos";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TodoDatasourceImpl();
    const repository = new TodoRepositoryImpl(datasource);
    const controller = new TodoController(repository);

    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.post("/", controller.createTodo);
    router.put("/:id", controller.updateTodo);
    router.delete("/:id", controller.deleteTodo);

    return router;
  }
}