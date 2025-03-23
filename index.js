const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static("public"));

// Enable CORS for testing from different origins
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Root route to serve the frontend
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// API endpoint for header parsing
app.get("/api/whoami", (req, res) => {
    const ipaddress = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
    const language = req.headers["accept-language"]?.split(",")[0] || "en-US";
    const software = req.headers["user-agent"] || "Unknown";

    res.json({
        ipaddress,
        language,
        software
    });
});

// Start the server locally (not needed for Vercel, but useful for testing)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for Vercel