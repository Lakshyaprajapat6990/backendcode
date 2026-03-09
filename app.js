require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const qs = require("qs");
const userRoutes = require("./routes/userRoutes");
const poojaRoutes = require("./routes/poojaRoutes");
const templeRoutes = require("./routes/templeRoutes");
const chadavaRoutes = require("./routes/chadhavaRoutes");
const payRoutes = require("./routes/payRoutes");
const fileRoutes = require("./routes/fileRoutes");
const reviewsRoutes = require('./routes/reviewsRoutes')
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// Middleware - Updated to parse nested FormData properly using qs
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 100000 }));

// Custom middleware to parse nested objects from FormData using qs
app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    try {
      req.body = qs.parse(req.body, { allowDots: true });
    } catch (e) {
      // Keep original body if parsing fails
    }
  }
  next();
});

// CORS setup - allow all origins in production (Vercel)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost')) {
      return callback(null, true);
    }
    
    // Allow Vercel domains
    if (origin.includes('vercel.app') || origin.includes('vercel.com')) {
      return callback(null, true);
    }
    
    // Allow custom domains
    const allowedOrigins = [
      process.env.CLIENT_URL_LOCAL,
      process.env.CLIENT_URL,
      process.env.CLIENT_URL_2,
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(null, true); // Allow all for development
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Favicon handler (prevent 404 errors in browser)
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Swagger setup (only in development)
if (process.env.NODE_ENV !== 'production') {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Dev Yogam API",
        version: "1.0.0",
        description: "API documentation for Dev Yogam",
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5000}`,
        },
      ],
    },
    apis: [path.join(__dirname, "./routes/*.js")],
  };

  const swaggerSpecs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
}

// Routes
app.use("/api/users", userRoutes);
app.use("/api/poojas", poojaRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/chadhavas", chadavaRoutes);
app.use("/api/payment", payRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/reviews", reviewsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("DevYogam API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// For local development - start server
// For Vercel - export the app
const PORT = process.env.PORT || 5000;

// Check if running on Vercel
if (process.env.VERCEL === '1' || process.env.NODE_ENV === 'production') {
  // Connect to database when the app loads on Vercel
  connectDB().catch(err => {
    console.error("Failed to connect to MongoDB:", err.message);
  });
  
  module.exports = app;
} else {
  // Local development
  (async () => {
    try {
      await connectDB();
      
      app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  })();
  
  module.exports = app;
}
