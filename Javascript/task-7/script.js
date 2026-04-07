const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let messages = [];

/* Format time */

function getTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* Render */

function renderMessages() {
    chatBox.innerHTML = "";

    messages.forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("message", msg.type);

        div.innerHTML = `
            ${msg.text}
            <div class="time">${msg.time}</div>
        `;

        chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

/* Send message */

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    messages.push({
        text,
        type: "sent",
        time: getTime()
    });

    input.value = "";
    renderMessages();

    simulateReply();
}

/* Simulate incoming */

function simulateReply() {
    const replies = [
        "Okay 👍",
        "Got it!",
        "Sounds good",
        "Let me check",
        "Cool 😄"
    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    setTimeout(() => {
        messages.push({
            text: randomReply,
            type: "received",
            time: getTime()
        });

        renderMessages();
    }, 1000 + Math.random() * 2000);
}

/* Events */

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});