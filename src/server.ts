import express, { type Router, type Request, type Response, type NextFunction  } from "express";
import { AppError, HttpCode } from "@/core";
import { ErrorMiddleware } from "@/modules/shared";

interface ServerOptions {
  port: number,
  routes: Router
  apiPrefix: string
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly apiPrefix: string;

  constructor(options: ServerOptions) {
    const { port, routes, apiPrefix } = options;
    this.port = port;
    this.routes = routes;
    this.apiPrefix = apiPrefix;
  }

  async start(): Promise<void> {
    // Middlewares
    this.app.use(express.json()); // parse json in request body (allow raw)
    this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded

    //* Routes
		this.app.use(this.apiPrefix, this.routes);

    // Init rest api
    this.app.get("/", (_req: Request, res: Response) => {
      return res.status(HttpCode.OK).send({
      message: `We Did It \n Endpoints available at http://localhost:${this.port}/`
      });
    });

    //* Handle not found routes in /api/v1/* (only if "Public content folder" is not available)
		this.routes.all("*", (req: Request, _: Response, next: NextFunction): void => {
			next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
		});

    // Handle errors middleware
		this.routes.use(ErrorMiddleware.handleError);
    
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${this.port}...`);
    });
  }
}