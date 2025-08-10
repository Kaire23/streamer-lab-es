import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // DISABLED: Post scheduling system - disabled due to quality issues
  // Automatic post creation has been disabled to prevent low-quality content generation
  /*
  try {
    console.log("Initializing post schedule system...");
    const { initializePostSchedule, processPostPublishing, createScheduledPost } = await import("./post-scheduler");
    
    await initializePostSchedule();
    
    // Set up recurring post creation every 3 days  
    setInterval(async () => {
      try {
        await createScheduledPost();
        console.log("Created new scheduled post");
      } catch (error) {
        console.error("Error in scheduled post creation:", error);
      }
    }, 3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds
    
    // Check for posts to publish every hour
    setInterval(async () => {
      try {
        await processPostPublishing();
      } catch (error) {
        console.error("Error in post publishing:", error);
      }
    }, 60 * 60 * 1000); // 1 hour in milliseconds
    
    console.log("Post scheduling system initialized successfully");
  } catch (error) {
    console.error("Error initializing post schedule:", error);
  }
  */

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
