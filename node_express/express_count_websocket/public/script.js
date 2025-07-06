const countValue = document.getElementById('count-value');
const incrementBtn = document.getElementById('increment-btn');

// used to connect to the Socket.IO server
const socket = io(); //

socket.on('count-updated', (newCount) => {
  console.log("Received a count update, new count: ", newCount);
  countValue.textContent = newCount;
});

// POST request to increment count
async function incrementCount() {
    try {
        const response = await fetch('/api/increment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        countValue.textContent = data.count;

    } catch (error) {
        console.error('Error:', error);
    }
}

// GET request to fetch current count
async function fetchCount() {
    try {
        const response = await fetch('/api/count');
        const data = await response.json();
        countValue.textContent = data.count;
    } catch (error) {
        console.error('Error:', error);
    }
}

incrementBtn.addEventListener('click', incrementCount);
document.addEventListener('DOMContentLoaded', fetchCount);
