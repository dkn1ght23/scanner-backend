import routes from "./routes.js";

export function registerApplicationRoutes(app) {
  for (const uri in routes) {
    app.use(uri, routes[uri]);
  }
}
