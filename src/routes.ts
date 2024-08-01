import { Router } from "express";

import { TodoRoutes } from "@/modules/todos";

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use("/todos", TodoRoutes.routes);

		return router;
	}
}