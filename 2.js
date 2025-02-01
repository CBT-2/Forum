document.addEventListener("DOMContentLoaded", loadMessages);

function addMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();
    if (!text) return;
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<p>${text}</p>`;
    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";
    editBtn.className = "editBtn";
    editBtn.onclick = () => editMessage(div);
    div.appendChild(editBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.className = "deleteBtn";
    deleteBtn.onclick = () => {
        div.remove();
        updateMessageCount();
        saveMessages();
    };
    div.appendChild(deleteBtn);
    document.getElementById("messages").appendChild(div);
    input.value = "";
    updateMessageCount();
    saveMessages();
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