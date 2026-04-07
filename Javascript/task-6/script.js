const list = document.getElementById("list");

let draggedItem = null;

/* Start drag */

list.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "LI") {
        draggedItem = e.target;
        e.target.classList.add("dragging");
    }
});

/* End drag */

list.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    draggedItem = null;
});

/* Drag over */

list.addEventListener("dragover", (e) => {
    e.preventDefault(); // required

    const target = e.target;

    if (target.tagName === "LI" && target !== draggedItem) {
        target.classList.add("over");
    }
});

/* Drag leave */

list.addEventListener("dragleave", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.remove("over");
    }
});

/* Drop */

list.addEventListener("drop", (e) => {
    e.preventDefault();

    const target = e.target;

    if (target.tagName === "LI" && target !== draggedItem) {
        target.classList.remove("over");

        const items = [...list.children];
        const draggedIndex = items.indexOf(draggedItem);
        const targetIndex = items.indexOf(target);

        if (draggedIndex < targetIndex) {
            target.after(draggedItem);
        } else {
            target.before(draggedItem);
        }
    }
});