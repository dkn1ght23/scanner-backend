import scannerRoutes from "./scanner/index.js";
import fixRouters from "./fix/index.js";

export default {
  "/api/scan": scannerRoutes,
  "/api/fix": fixRouters,
  // others...
};
