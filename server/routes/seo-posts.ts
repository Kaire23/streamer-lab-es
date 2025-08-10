import { Router } from "express";
import { schedulePostPlan } from "../seo-content-generator";

const router = Router();

// Endpoint to trigger the SEO post plan creation
router.post("/create-post-plan", async (req, res) => {
  try {
    console.log("Creating SEO post plan...");
    await schedulePostPlan();
    res.json({ 
      success: true, 
      message: "SEO post plan created successfully",
      postsCreated: 8
    });
  } catch (error) {
    console.error("Error creating post plan:", error);
    res.status(500).json({ 
      error: "Failed to create post plan", 
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;