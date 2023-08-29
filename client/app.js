// Deklaracja zmiennej globalnej userName
let userName = null;

// Pobierz referencje do formularza logowania, sekcji z wiadomościami, listy wiadomości, formularza dodawania wiadomości
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');

// Pobierz referencje do pól tekstowych
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

// Funkcja do obsługi logowania
function login(event) {
    event.preventDefault();

    // Walidacja nazwy użytkownika
    if (userNameInput.value.trim() === '') {
        alert('Please enter your username.');
        return;
    }

    // Przypisz nazwę użytkownika
    userName = userNameInput.value;

    // Ukryj formularz logowania, pokaż sekcję wiadomości
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
}

// Nasłuchuj zdarzenia submit na formularzu logowania
loginForm.addEventListener('submit', login);

// Obsługa formularza dodawania wiadomości
addMessageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const messageContent = messageContentInput.value;
    // Dodaj nową wiadomość do listy wiadomości
    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'message--self');
    messageItem.innerHTML = `
        <h3 class="message__author">${userName}</h3>
        <div class="message__content">${messageContent}</div>
    `;
    messagesList.appendChild(messageItem);
    messageContentInput.value = ''; // Wyczyść pole tekstowe po wysłaniu wiadomości
});
