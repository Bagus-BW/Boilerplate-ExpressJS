import { envs } from "@/core";
import { Server } from "./server";
import { AppRoutes } from "./routes";

((): void => {
  main();
})();

function main(): void {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
    apiPrefix: envs.API_PREFIX,
  });

  void server.start();
}