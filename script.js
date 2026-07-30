// =====================================
// BLOG MANAGEMENT SYSTEM
// DAY 1 + DAY 4 + DAY 8
// PART 1
// =====================================

document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("blogForm");
const title = document.getElementById("title");
const author = document.getElementById("author");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const category = document.getElementById("category");
const date = document.getElementById("date");
const image = document.getElementById("image");
const tags = document.getElementById("tags");
const summary = document.getElementById("summary");
const content = document.getElementById("content");
const readingTime = document.getElementById("readingTime");
const submitBtn = document.getElementById("submitBtn");

// ===============================
// GET BLOG ID
// ===============================

const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

/// ===============================
// LOAD BLOG DATA FOR EDIT
// ===============================

if (blogId) {

    submitBtn.value = "Update Blog";
    fetch("http://localhost:3000/blogs")
        .then(response => response.json())
        .then(blogs => {

            const blog = blogs.find(item => item.id == blogId);

            if (blog) {
                title.value = blog.title || "";
                author.value = blog.author || "";
                email.value = blog.email || "";
                phone.value = blog.phone || "";
                category.value = blog.category || "";
                date.value = blog.date || "";
                tags.value = blog.tags || "";
                summary.value = blog.summary || "";
                content.value = blog.content || "";
                readingTime.value = blog.readingTime || "";

                if (blog.difficulty) {
                    const radio = document.querySelector(
                        `input[name="level"][value="${blog.difficulty}"]`
                    );
                    if (radio) radio.checked = true;
                }

                if (blog.status) {
                    blog.status.forEach(function(item) {
                        const checkbox = document.querySelector(
                            `input[type="checkbox"][value="${item}"]`
                        );
                        if (checkbox) checkbox.checked = true;
                    });
                }
            }

        })
        .catch(error => {
            console.log(error);
        });

}
// ===============================
// REMOVE OLD ERRORS
// ===============================

function removeErrors(){

document.querySelectorAll(".error").forEach(function(error){

error.remove();

});

}

// ===============================
// SHOW ERROR
// ===============================

function showError(element,message){

const error=document.createElement("small");

error.className="error";

error.style.color="red";

error.style.display="block";

error.style.marginTop="5px";

error.innerText=message;

element.parentNode.appendChild(error);

}

// ===============================
// EMAIL VALIDATION
// ===============================

function emailValid(emailValue){

const pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

return pattern.test(emailValue);

}

// ===============================
// PHONE VALIDATION
// ===============================

function phoneValid(phoneValue){

const pattern=/^[0-9]{10}$/;

return pattern.test(phoneValue);

}
// ===============================
// IMAGE VALIDATION
// ===============================

function imageValid(fileName){

if(fileName===""){

return false;

}

const extension=fileName.split(".").pop().toLowerCase();

return ["jpg","jpeg","png","gif","webp"].includes(extension);

}

// =====================================
// PART 2
// FORM VALIDATION
// =====================================

form.addEventListener("submit", function(event){

event.preventDefault();

removeErrors();

let valid = true;

// ======================
// BLOG TITLE
// ======================

if(title.value.trim()===""){

showError(title,"Please enter Blog Title");

valid=false;

}
else if(title.value.trim().length<5){

showError(title,"Title should be at least 5 characters");

valid=false;

}

// ======================
// AUTHOR
// ======================

if(author.value.trim()===""){

showError(author,"Please enter Author Name");

valid=false;

}

// ======================
// EMAIL
// ======================

if(email.value.trim()===""){

showError(email,"Please enter Email");

valid=false;

}
else if(!emailValid(email.value.trim())){

showError(email,"Invalid Email Address");

valid=false;

}

// ======================
// PHONE
// ======================

if(phone.value.trim()===""){

showError(phone,"Please enter Phone Number");

valid=false;

}
else if(!phoneValid(phone.value.trim())){

showError(phone,"Phone Number must contain 10 digits");

valid=false;

}

// ======================
// CATEGORY
// ======================

if(category.value===""){

showError(category,"Please select Category");

valid=false;

}

// ======================
// DATE
// ======================

if(date.value===""){

showError(date,"Please select Publish Date");

valid=false;

}

// ======================
// IMAGE
// ======================

if(!imageValid(image.value) && !blogId){

showError(image,"Please upload JPG, PNG or WEBP image");

valid=false;

}

// ======================
// TAGS
// ======================

if(tags.value.trim()===""){

showError(tags,"Please enter Blog Tags");

valid=false;

}

// ======================
// SUMMARY
// ======================

if(summary.value.trim()===""){

showError(summary,"Please enter Blog Summary");

valid=false;

}
else if(summary.value.trim().length<20){

showError(summary,"Summary should contain at least 20 characters");

valid=false;

}

// ======================
// CONTENT
// ======================

if(content.value.trim()===""){

showError(content,"Please enter Blog Content");

valid=false;

}
else if(content.value.trim().length<20){

showError(content,"Content should contain at least 20 scharacters");

valid=false;

}

// ======================
// READING TIME
// ======================

if(readingTime.value===""){

showError(readingTime,"Please enter Reading Time");

valid=false;

}
else if(Number(readingTime.value)<=0){

showError(readingTime,"Reading Time must be greater than zero");

valid=false;

}

// ======================
// DIFFICULTY LEVEL
// ======================

const level=document.querySelector('input[name="level"]:checked');

if(level===null){

showError(

document.querySelector('input[name="level"]'),

"Please select Difficulty Level"

);

valid=false;

}

// ======================
// STATUS
// ======================

const status=document.querySelectorAll('input[type="checkbox"]:checked');
if(status.length===0){
showError(
document.querySelector('input[type="checkbox"]'),
"Please select Publish or Draft"

);

valid=false;

}

// ======================
// SAVE OR UPDATE BLOG
// ======================

if(valid){
const blogData = {
    title: title.value,
    author: author.value,
    email: email.value,
    phone: phone.value,
    category: category.value,
    date: date.value,
    image: image.value,
    tags: tags.value,
    summary: summary.value,
    content: content.value,
    readingTime: readingTime.value,
    difficulty: level ? level.value : "",
    status: Array.from(status).map(item => item.value)
};


if(blogId){

// UPDATE BLOG

fetch("http://localhost:3000/blogs/" + blogId, {

method: "PUT",

headers: {

"Content-Type":"application/json"

},

body: JSON.stringify(blogData)

})

.then(response => response.json())

.then(data => {

alert(data.message);

window.location.href = "index.html";

})

.catch(error => {

console.log(error);

alert("Update Failed");

});

}
else{

// ADD NEW BLOG
fetch("http://localhost:3000/blogs", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(blogData)
})
.then(response => response.json())
.then(data => {
    alert(data.message);
    window.location.href = "index.html";
})
.catch(error => {
    console.log(error);
    alert("Blog Add Failed");
});

}   // else close

}   // if(valid) close

}); // form.addEventListener close

// ======================
// LIVE VALIDATION
// ======================

title.addEventListener("input", removeErrors);

author.addEventListener("input", removeErrors);

email.addEventListener("input", removeErrors);

phone.addEventListener("input", removeErrors);

category.addEventListener("change", removeErrors);

date.addEventListener("change", removeErrors);

image.addEventListener("change", removeErrors);

tags.addEventListener("input", removeErrors);

summary.addEventListener("input", removeErrors);

content.addEventListener("input", removeErrors);

readingTime.addEventListener("input", removeErrors);

// ======================
// RESET CONFIRMATION
// ======================

form.addEventListener("reset",function(){

setTimeout(function(){

removeErrors();

alert("Form Reset Successfully!");

},100);

});

// ======================
// PAGE LOADED
// ======================

console.log("Blog Management System Loaded Successfully!");

});