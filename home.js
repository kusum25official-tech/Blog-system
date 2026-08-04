// ==============================
// DAY 7 - VIEW BLOGS
// ==============================

alert("Home.js Loaded Successfully");
console.log("Home.js Loaded Successfully");

async function loadBlogs() {

    try {

        console.log("Fetching blogs...");

        const response = await fetch("https://blog-system-lcts.onrender.com/blogs");

        console.log("Response:", response);

        if (!response.ok) {
            throw new Error("Server Error: " + response.status);
        }
        const container = document.getElementById("blogsContainer");
        container.innerHTML = "<h3>Loading blogs...</h3>";

        const blogs = await response.json();
        console.log("Blogs:", blogs);

        if (!container) {
            throw new Error("blogsContainer not found");
        }

        container.innerHTML = "";

        if (blogs.length === 0) {
            container.innerHTML = "<h3>No Blogs Available</h3>";
            return;
        }

        blogs.forEach(blog => {

         container.innerHTML += `
         <div class="blog-card">

            <h2>${blog.title}</h2>

            <p><strong>👤 Author:</strong> ${blog.author}</p>

            <p><strong>📂 Category:</strong> ${blog.category}</p>

            <p>${blog.content}</p>

            <div class="blog-buttons">

        <button class="read-btn"
            onclick="readBlog(${blog.id})">
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
    }  catch (error) {
    console.error("ERROR:", error);
    const container = document.getElementById("blogsContainer");

    if (container) {
        container.innerHTML = `
        <div style="text-align:center;padding:30px;">
            <h2>⚠ Blogs cannot be loaded</h2>
            
            <p>Unable to connect to the backend server.</p>
        </div>`;
    }
}  

} 

function editBlog(id) {
    window.location.href = "add-blog.html?id=" + id;

}
// function readBlog(id) {
//     window.location.href = "view-blog.html?id=" + id;
// }
function readBlog(id) {

    console.log("Read Blog ID:", id);

    alert("ID = " + id);

    window.location.href = "view-blog.html?id=" + id;
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

            const response = await fetch("https://blog-system-lcts.onrender.com/blogs/" + id, {
            method: "DELETE"
         });
        if (!response.ok) {
        throw new Error("Delete failed");
}

        const data = await response.json();
        alert(data.message);
        loadBlogs();

    } catch (error) {
    console.log(error);
    alert("Unable to delete the blog. Please try again.");
    }
}
