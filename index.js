const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let blogs = [
  {
    id: 1,
    title: "Express.js Tutorial",
    author: "Kusum Chaurasia",
    email: "kusum@gmail.com",
    phone: "9876543210",
    category: "Backend",
    date: "2026-07-28",
    image: "",
    tags: "Express, Node",
    summary: "Learning Express.js APIs",
    content:
      "Learning Express.js APIs with CRUD operations. This is a sample blog content created for the Blog Management System project. It contains enough text for testing validation and update functionality.",
    readingTime: 5,
    difficulty: "Beginner",
    status: ["Publish"]
  },
  {
    id: 2,
    title: "JavaScript Basics",
    author: "Rahul",
    email: "rahul@gmail.com",
    phone: "9876501234",
    category: "JavaScript",
    date: "2026-07-29",
    image: "",
    tags: "JS",
    summary: "JavaScript Fundamentals",
    content:
      "JavaScript is one of the most popular programming languages. This sample blog is added to test the view, edit and update functionality of the project.",
    readingTime: 7,
    difficulty: "Intermediate",
    status: ["Draft"]
  }
];

// ======================
// HOME
// ======================

app.get("/", (req, res) => {
  res.send("Blog API Running Successfully");
});

// ======================
// GET ALL BLOGS
// ======================

app.get("/blogs", (req, res) => {
  res.status(200).json(blogs);
});

// ======================
// ADD BLOG
// ======================

app.post("/blogs", (req, res) => {

  const blog = {
    id: blogs.length + 1,
    ...req.body
  };

  blogs.push(blog);

  res.status(201).json({
    message: "Blog Added Successfully",
    blog
  });

});

// ======================
// UPDATE BLOG
// ======================

app.put("/blogs/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = blogs.findIndex(blog => blog.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Blog Not Found"
    });
  }

  blogs[index] = {
    ...blogs[index],
    ...req.body
  };

  res.status(200).json({
    message: "Blog Updated Successfully",
    blog: blogs[index]
  });

});

// ======================
// DELETE BLOG (Optional)
// ======================

app.delete("/blogs/:id", (req, res) => {

  const id = Number(req.params.id);

  blogs = blogs.filter(blog => blog.id !== id);

  res.json({
    message: "Blog Deleted Successfully"
  });

});

// ======================
// SERVER
// ======================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});