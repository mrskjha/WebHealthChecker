
import Site from '../model/site.js';
import MonitorHistory from '../model/siteHistory.js';
import validator from 'validator';
import { checkSite } from "../Services/monitor.service.js";

export async function handelAddSite(req, res) {
  try {
    const { name, url } = req.body;

    if (!name || !url) {
      return res.status(400).json({ error: "Name and URL are required" });
    }

    if (!validator.isURL(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const newSite = await Site.create({
      name,
      url,
      userId: req.user.id,
      isActive: true,
      status: "unknown"
    });

    
    await checkSite(newSite);

    res.status(201).json({
      success: true,
      site: newSite,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



export async function getUserSites(req, res) {
    try {
      const user = req.user;
      const sites = await Site.find({ userId: user.id });
      res.status(200).json({ sites });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export async function getSiteById(req, res) {
  try {
    const user = req.user;
    const siteId = req.params.id;
    const site = await Site.findOne({ _id: siteId, userId: user.id });

    if (!site) {
      return res.status(404).json({ error: "Site not found or unauthorized" });
    }
    res.status(200).json({ site });

    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteSite(req, res) {
    try {
        const user = req.user;
        const siteId = req.params.id;
        const deletedSite = await Site.findOneAndDelete({ _id: siteId, userId: user._id });

        if (!deletedSite) {
            return res.status(404).json({ error: "Site not found or unauthorized" });
        }
        res.status(200).json({ message: "Site deleted successfully", deletedSite });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getSiteHistory(req, res) {
  try {
    const userId = req.user.id;
    const siteId = req.params.id;

    const site = await Site.findOne({ _id: siteId, userId });
    if (!site) {
      return res.status(404).json({ error: "Site not found or unauthorized" });
    }

    const history = await MonitorHistory.find({ siteId })
      .sort({ checkedAt: -1 })
      .limit(100);

    res.status(200).json({
      site: {
        id: site._id,
        name: site.name,
        url: site.url,
        createdAt: site.createdAt
      },
      history
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  handelAddSite,
  getUserSites, 
  getSiteById,
  deleteSite,
  getSiteHistory
};