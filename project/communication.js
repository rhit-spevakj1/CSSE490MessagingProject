const socket = io('http://localhost:8000'); 

socket.on('connect', () => {
    console.log('Communication established');
});

socket.on('message', (message) => {
    console.log('Received message:', message);
    const msg = document.getElementById('chatMessages');
    const msgType = document.createElement('div');
    msgType.textContent = message;
    msg.appendChild(msgType);
});

document.getElementById('send').addEventListener('click', () => {
    const usrMsg = document.getElementById('usrMsg');
    const message = usrMsg.value.trim();
    if (message) {
        socket.emit('message', message);
        usrMsg.value = '';
    }
}); 