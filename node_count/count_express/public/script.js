const countValue = document.getElementById('count-value');
const incrementBtn = document.getElementById('increment-btn');

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

// Event listener
incrementBtn.addEventListener('click', incrementCount);

// Load initial count
document.addEventListener('DOMContentLoaded', fetchCount);