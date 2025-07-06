const API_BASE_URL = '/api';

class CounterApp {
    constructor() {
        this.countElement = document.getElementById('count-value');
        this.incrementBtn = document.getElementById('increment-btn');
        this.init();
    }

    init() {
        this.loadCount();
        this.incrementBtn.addEventListener('click', () => this.incrementCount());
    }

    async loadCount() {
        try {
            const response = await fetch(`${API_BASE_URL}/count`);
            const data = await response.json();
            this.updateDisplay(data.count);
        } catch (error) {
            console.error('Error loading count:', error);
            this.updateDisplay(0);
        }
    }

    async incrementCount() {
        try {
            const response = await fetch(`${API_BASE_URL}/increment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            this.updateDisplay(data.count);
        } catch (error) {
            console.error('Error incrementing count:', error);
        }
    }

    updateDisplay(count) {
        this.countElement.textContent = count;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CounterApp();
});
