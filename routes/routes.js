import scannerRoutes from "./scanner/index.js";
import fixRouters from "./fix/index";

export default {
  "/api/scan": scannerRoutes,
  "/api/fix": fixRouters,
  // others...
};
