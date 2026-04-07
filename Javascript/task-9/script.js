const feed = document.getElementById("feed");
const loading = document.getElementById("loading");

let page = 1;
let isLoading = false;

/* Fetch data */

async function loadData() {
    if (isLoading) return;

    isLoading = true;
    loading.style.display = "block";

    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
        );

        const data = await res.json();

        appendData(data);
        page++;

    } catch (err) {
        console.error("Error loading data");
    }

    loading.style.display = "none";
    isLoading = false;
}

/* Append */

function appendData(posts) {
    posts.forEach(post => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;

        feed.appendChild(div);
    });
}

/* Scroll detection */

window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
        loadData();
    }
});

/* Initial load */

loadData();