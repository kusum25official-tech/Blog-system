// ==============================
// VIEW BLOG
// ==============================

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    document.getElementById("blogDetails").innerHTML = `
        <center>
            <h2>❌ Invalid Blog ID</h2>
            <p>No blog ID was provided.</p>
        </center>
    `;
    throw new Error("Missing Blog ID");
}

async function loadBlog() {

    try {
        console.log("Blog ID:", id);

        const response = await fetch(
       "https://blog-system-lcts.onrender.com/blogs/" + id
);

        if (!response.ok) {
            throw new Error("Blog not found");
        }
        const blog = await response.json();

        document.getElementById("blogDetails").innerHTML = `

            <center>

                <h1>${blog.title}</h1>

                <hr width="80%">

            </center>

            <p><strong>👤 Author :</strong> ${blog.author}</p>

            <p><strong>📧 Email :</strong> ${blog.email}</p>

            <p><strong>📞 Phone :</strong> ${blog.phone}</p>

            <p><strong>📂 Category :</strong> ${blog.category}</p>

            <p><strong>📅 Publish Date :</strong> ${blog.date}</p>

            <p><strong>🏷 Tags :</strong> ${blog.tags}</p>

            <p><strong>⏱ Reading Time :</strong> ${blog.readingTime} Minutes</p>

           <p><strong>📊 Difficulty :</strong> ${blog.difficulty}</p>

            <p><strong>📢 Status :</strong> ${blog.status}</p>

            <hr>

            <h2>📝 Summary</h2>

            <p>${blog.summary}</p>

            <hr>

            <h2>📖 Full Content</h2>

            <p>${blog.content}</p>

        `;

    }
    catch (error) {
         console.error(error);
         document.getElementById("blogDetails").innerHTML = `
         <center>
            <h2>❌ Blog Not Found</h2>
            <p>${error.message}</p>
        </center>
    `;
}
}
loadBlog();