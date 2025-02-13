const express = require('express');
const site = require('../model/site');
const { handelAddSite, getAllSites, handelResponceTime, handelSiteById,handleEmailsend, handlesiteHistory, handleUserdetail } = require('../Controllers/site.controller');
const authenticateUser = require('../Middleware/authenticateUser');
const requiredToken = require('../Middleware/requiredToken');

const router = express.Router();

router.post("/site",requiredToken, handelAddSite);
router.get("/site", getAllSites);
router.patch("/site/:id", handelResponceTime);
router.get("/site/:id",requiredToken, handelSiteById);
router.get("/site/response-time",requiredToken, handelSiteById);
router.get("/user-detail",requiredToken, handleUserdetail);

router.post("/sendmail", handleEmailsend);

router. get('/sitehistory/:id',handlesiteHistory);



module.exports = router;
