const express = require('express');
const site = require('../model/site');
const { handelAddSite, getAllSites, handelResponceTime, handelSiteById,handleEmailsend, handlesiteHistory } = require('../Controllers/site.controller');

const router = express.Router();

router.post("/site", handelAddSite);
router.get("/site", getAllSites);
router.patch("/site/:id", handelResponceTime);
router.get("/site/:id", handelSiteById);

router.post("/sendmail", handleEmailsend);

router. get('/sitehistory/:id',handlesiteHistory);



module.exports = router;
