const welcomeForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');

const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
let userName = null;

function login(event) {
    event.preventDefault();

    if (userNameInput.value.trim() === '') {
        alert('Please enter your username.');
        return;
    }

    userName = userNameInput.value;

    welcomeForm.classList.remove('show');
    messagesSection.classList.add('show');
}

welcomeForm.addEventListener('submit', login);

function sendMessage(event) {
    event.preventDefault();

    if (!userName) {
        alert('Please log in first.');
        return;
    }

    if (messageContentInput.value.trim() === '') {
        alert('Please enter a message.');
        return;
    }

    addMessage(userName, messageContentInput.value);

    messageContentInput.value = '';
}

addMessageForm.addEventListener('submit', sendMessage);

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message', 'message--received');

    if (author === userName) {
        message.classList.add('message--self');
    }

    message.innerHTML = `
        <h3 class="message__author">${userName === author ? 'You' : author }</h3>
        <div class="message__content">
            ${content}
        </div>
    `;

    messagesList.appendChild(message);
}
