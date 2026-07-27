const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// // Middleware
// app.use(cors());
// app.use(express.json());

// Store Blogs
const blogs = [
    {
        id: 1,
        title: "Express.js Tutorial",
        author: "Kusum Chaurasia",
        category: "Backend",
        content: "Learning Express.js APIs"
    },
    {
        id: 2,
        title: "HTML Basics",
        author: "Kusum Chaurasia",
        category: "Frontend",
        content: "HTML is the foundation of web development."
    },
    {
        id: 3,
        title: "JavaScript DOM",
        author: "Kusum Chaurasia",
        category: "JavaScript",
        content: "DOM Manipulation makes web pages interactive."
    }
];

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
