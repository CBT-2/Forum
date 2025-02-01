document.addEventListener("DOMContentLoaded", loadMessages);

function addMessage() {
    try {
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
    } catch (error) {
        console.error("Error adding message:", error);
    }
}

function getMessageInput() {
    const input = document.getElementById("messageInput");
    return input ? input.value.trim() : "";
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
    try {
        div.remove();
        updateMessageCount();
        saveMessages();
    } catch (error) {
        console.error("Error deleting message:", error);
    }
}

function resetMessageInput() {
    const input = document.getElementById("messageInput");
    if (input) input.value = "";
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
    const count = document.querySelectorAll(".message").length;
    document.getElementById("messageCount").textContent = count;
}

function saveMessages() {
    try {
        const messages = Array.from(document.querySelectorAll(".message p")).map(p => p.textContent);
        localStorage.setItem("forumMessages", JSON.stringify(messages));
    } catch (error) {
        console.error("Error saving messages to localStorage:", error);
    }
}

function loadMessages() {
    try {
        const messages = JSON.parse(localStorage.getItem("forumMessages")) || [];
        messages.forEach(text => {
            document.getElementById("messageInput").value = text;
            addMessage();
        });
    } catch (error) {
        console.error("Error loading messages from localStorage:", error);
    }
}

function clearMessages() {
    try {
        document.getElementById("messages").innerHTML = "";
        updateMessageCount();
        localStorage.removeItem("forumMessages");
    } catch (error) {
        console.error("Error clearing messages:", error);
    }
}