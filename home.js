// ==============================
// DAY 7 - VIEW BLOGS
// ==============================

alert("Home.js Loaded Successfully");

async function loadBlogs() {

    try {

        console.log("Fetching blogs...");

        const response = await fetch("http://localhost:3000/blogs");

        console.log("Response:", response);

        if (!response.ok) {
            throw new Error("Server Error: " + response.status);
        }

        const blogs = await response.json();

        console.log("Blogs:", blogs);

        const container = document.getElementById("blogsContainer");

        if (!container) {
            throw new Error("blogsContainer not found");
        }

        container.innerHTML = "";

        if (blogs.length === 0) {
            container.innerHTML = "<h3>No Blogs Available</h3>";
            return;
        }

        blogs.forEach(blog => {
//             container.innerHTML += `
//            <div class="blog-card">
//            <h2>${blog.title}</h2>

//            <p><strong>👤 Author:</strong> ${blog.author}</p>

//            <p><strong>📂 Category:</strong> ${blog.category}</p>

//            <p>${blog.content}</p>

//            <button class="read-btn"
//            onclick="showBlog('${blog.title}')">
//            Read More
//          </button>

//         </div>
// `});




         container.innerHTML += `
         <div class="blog-card">

            <h2>${blog.title}</h2>

            <p><strong>👤 Author:</strong> ${blog.author}</p>

            <p><strong>📂 Category:</strong> ${blog.category}</p>

            <p>${blog.content}</p>

            <div class="blog-buttons">

            <button class="read-btn">
            Read More
        </button>

            <button class="edit-btn"
            onclick="editBlog(${blog.id})">
            Edit
        </button>

        <button class="delete-btn"
             onclick="deleteBlog(${blog.id})">
             Delete
        </button>

</div>
        </div>
    `;

});

    } catch (error) {

        console.error("ERROR:", error);

        alert(error);

    }

}

function editBlog(id) {

    window.location.href = "add-blog.html?id=" + id;

}

window.onload = loadBlogs;

// ==============================
// DAY 9 - DELETE BLOG
// ==============================

async function deleteBlog(id) {

    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/blogs/" + id, {
            method: "DELETE"
        });

        const data = await response.json();

        alert(data.message);

        loadBlogs();

    } catch (error) {

        console.log(error);

        alert("Delete Failed");

    }

}