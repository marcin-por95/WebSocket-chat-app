const socket = io();

let userName = "";

const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('userJoined', (userName) => {
    const joinMessage = {
        author: "Chat Bot",
        content: `${userName} has joined the conversation!`
    };
    addMessage(joinMessage.author, joinMessage.content, true);
});
socket.on('userLeft', (userName) => {
    const leaveMessage = {
        author: "Chat Bot",
        content: `${userName} has left the conversation... :(`
    };
    addMessage(leaveMessage.author, leaveMessage.content, true);
});

loginForm.addEventListener("submit", function (event) {
    login(event);
});

addMessageForm.addEventListener("submit", function (event) {
    sendMessage(event);
});

function login(event) {
    event.preventDefault();

    const enteredUserName = userNameInput.value;

    if (!enteredUserName) {
        alert("Please enter a username.");
        return;
    }

    userName = enteredUserName;

    loginForm.classList.remove("show");
    messagesSection.classList.add("show");

    socket.emit('login', userName);
}

function sendMessage(e) {
    e.preventDefault();

    let messageContent = messageContentInput.value;

    if (!messageContent.length) {
        alert('You have to type something!');
    } else {
        addMessage(userName, messageContent);
        socket.emit('message', { author: userName, content: messageContent });
        messageContentInput.value = '';
    }
}

function addMessage(author, content, isBotMessage = false) {
    const message = document.createElement("li");
    message.classList.add("message");
    message.classList.add("message--received");

    if (author === userName) {
        message.classList.add("message--self");
    }

    if (isBotMessage) {
        message.classList.add("message--bot");
    }

    message.innerHTML = `
    <h3 class="message__author">${userName === author ? "You" : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;

    messagesList.appendChild(message);
}
