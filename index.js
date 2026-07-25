const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Blog Management System Backend is Running!");
    

});

// GET Route
app.get("/blogs", (req, res) => {

    const blogs = [

        {
            id: 1,
            title: "HTML Complete Guide",
            author: "Kusum"
        },

        {
            id: 2,
            title: "CSS Mastery",
            author: "Kusum"
        }

    ];

    res.status(200).json(blogs);

});

// POST Route
app.post("/blogs", (req, res) => {

    const newBlog = req.body;

    res.status(201).json({

        message: "✅ Blog Added Successfully",

        blog: newBlog

    });

});

// Server
app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
     
});