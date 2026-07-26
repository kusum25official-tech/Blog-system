const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Store Blogs
const blogs = [];

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Blog Management System Backend is Running!");
    
});

    // GET Route
app.get("/blogs", (req, res) => {

    res.status(200).json(blogs);

});

// POST Route
app.post("/blogs", (req, res) => {
    const newBlog = {
        id: blogs.length + 1,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content

    };

    blogs.push(newBlog);
    res.status(201).json({
        message: "✅ Blog Added Successfully",
        blog: newBlog
    });

});


// Server
app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
     
});