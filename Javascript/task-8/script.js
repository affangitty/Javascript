const app = document.getElementById("app");

/* Routes */

const routes = {
    home: () => `
        <h1>Home</h1>
        <p>Welcome to the SPA</p>
    `,
    about: () => `
        <h1>About</h1>
        <p>This is a hash-based router</p>
    `,
    contact: () => `
        <h1>Contact</h1>
        <p>Email: example@test.com</p>
    `
};

/* Router */

function renderRoute() {
    const hash = window.location.hash.slice(1) || "home";

    const view = routes[hash];

    if (view) {
        app.innerHTML = view();
    } else {
        app.innerHTML = "<h1>404 - Page Not Found</h1>";
    }
}

/* Listen to route change */

window.addEventListener("hashchange", renderRoute);

/* Initial load */

renderRoute();