
import express from 'express';
const router = express.Router();
import { handelAddSite,getUserSites,getSiteById,deleteSite,getSiteHistory } from '../Controllers/site.controller.js';
import auth from '../Middleware/authenticateUser.js';

/**
 * SITE MANAGEMENT (USER)
 */
router.post("/", auth, handelAddSite);              // Add new site
router.get("/", auth, getUserSites);          // Get user's sites
router.get("/:id", auth, getSiteById);        // Get single site
router.delete("/:id", auth, deleteSite);      // Remove site

/**
 * SITE HISTORY
 */
router.get("/:id/history", auth, getSiteHistory);

export default router;
