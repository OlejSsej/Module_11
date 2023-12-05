const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const geoButton = document.getElementById('geoButton');
const chatWindow = document.getElementById('chatWindow');






//  Вебсокет
const ws = new WebSocket('wss://echo-ws-service.herokuapp.com');

ws.addEventListener('open', (event) => {
  console.log('WebSocket connection established!');
});

ws.addEventListener('message', (event) => {
  const message = event.data;  
  console.log('Сообщение от сервера отправленно');
  displayMessage(message, 'received-message');
});

function sendMessage(message) {
  
  if (message.trim() !== '') {
    console.log('Сообщение от пользователя отправленно');

    ws.send(message);
    displayMessage(message, 'sent-message');
  } else {
    alert('Введите текст сообщения!');
  }
}

function displayMessage(message, messageClass) {
  console.log('Сообщение отображено');

  const messageElement = document.createElement('div');
  const textElement = document.createElement('p');
  textElement.innerText = message;
  messageElement.appendChild(textElement);
  messageElement.classList.add(messageClass);
  chatWindow.appendChild(messageElement);
}

sendButton.addEventListener('click', () => {
  console.log('Кнопка отправки сообщения нажата');

  const messageToSend = chatInput.value;
  chatInput.value = '';
  sendMessage(messageToSend);
});





// Геолокация
const state = document.getElementById('state');

const error = () => {
  alert('Невозможно определить ваше местоположение');
}

const success = (position) => {
  console.log('Местоположение успешно найдено');

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;


  const linkElement = document.createElement('a');
  linkElement.href = mapLink;
  linkElement.target = '_blank';
  linkElement.innerText = 'Ваша геолокация';

  const messageElement = document.createElement('div');
  messageElement.appendChild(linkElement);
  messageElement.classList.add('sent-message');

  chatWindow.appendChild(messageElement);
  console.log('Сообщение отображено');
}

geoButton.addEventListener('click', () => {
  console.log('Нажата кнопка геолокации');


  if(!navigator.geolocation) {
    alert('Геолокация не поддерживается вашим браузером');
  } else {
    alert('Определяется местоположение');
    navigator.geolocation.getCurrentPosition(success, error);
  }

})



