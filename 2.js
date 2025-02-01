document.addEventListener("DOMContentLoaded", loadMessages);

function addMessage() {
    const text = getMessageInput();
    if (!text) return;
    const div = createMessageDiv(text);
    const editBtn = createButton("Редагувати", "editBtn", () => editMessage(div));
    const deleteBtn = createButton("Видалити", "deleteBtn", () => deleteMessage(div));
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    document.getElementById("messages").appendChild(div);
    resetMessageInput();
    updateMessageCount();
    saveMessages();
}

function getMessageInput() {
    const input = document.getElementById("messageInput");
    return input.value.trim();
}

function createMessageDiv(text) {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<p>${text}</p>`;
    return div;
}

function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.onclick = onClick;
    return button;
}

function deleteMessage(div) {
    div.remove();
    updateMessageCount();
    saveMessages();
}

function resetMessageInput() {
    document.getElementById("messageInput").value = "";
}

function editMessage(div) {
    const p = div.querySelector("p");
    const textarea = document.createElement("textarea");
    textarea.value = p.textContent;
    div.replaceChild(textarea, p);
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Зберегти";
    saveBtn.className = "saveBtn";
    saveBtn.onclick = () => {
        p.textContent = textarea.value;
        div.replaceChild(p, textarea);
        saveBtn.remove();
        saveMessages();
    };
    div.appendChild(saveBtn);
}

function updateMessageCount() {
    document.getElementById("messageCount").textContent = document.querySelectorAll(".message").length;
}

function saveMessages() {
    const messages = Array.from(document.querySelectorAll(".message p")).map(p => p.textContent);
    localStorage.setItem("forumMessages", JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("forumMessages")) || [];
    messages.forEach(text => {
        document.getElementById("messageInput").value = text;
        addMessage();
    });
}

function clearMessages() {
    document.getElementById("messages").innerHTML = "";
    updateMessageCount();
    localStorage.removeItem("forumMessages");
}