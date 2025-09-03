import scannerRoutes from "./scanner/index.js";
import fixRouters from "./fix/index.js";
import authRouters from "./auth/index.js";

export default {
  "/api/scan": scannerRoutes,
  "/api/fix": fixRouters,
  "/api/auth": authRouters,
  // others...
};
