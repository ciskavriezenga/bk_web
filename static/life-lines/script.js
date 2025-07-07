class LifeLines {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.lines = [];
        this.scrollY = 0;
        this.animationId = null;
        this.time = 0;
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.generateLines();
        this.setupEventListeners();
        this.startAnimation();
    }

    setupCanvas() {
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateSineLine(index) {
        const grayValues = ['#000000', '#1a1a1a', '#333333', '#4d4d4d', '#666666', '#808080', '#999999', '#b3b3b3'];
        
        return {
            id: index,
            x: (index * 80) % window.innerWidth,
            amplitude: Math.random() * 60 + 30,
            frequency: Math.random() * 0.015 + 0.008,
            phase: Math.random() * Math.PI * 2,
            thickness: Math.random() * 3 + 1.5,
            opacity: Math.random() * 0.4 + 0.6,
            color: grayValues[Math.floor(Math.random() * grayValues.length)],
            brushVariation: Math.random() * 0.8 + 0.2
        };
    }

    generateLines() {
        const linesCount = Math.ceil(window.innerWidth / 60) + 10;
        this.lines = [];
        for (let i = 0; i < linesCount; i++) {
            this.lines.push(this.generateSineLine(i));
        }
    }

    drawSineLine(line, time, scrollOffset) {
        this.ctx.save();
        this.ctx.globalAlpha = line.opacity;
        this.ctx.strokeStyle = line.color;
        this.ctx.lineWidth = line.thickness;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // Create multiple slightly offset strokes for brush texture
        const brushStrokes = 3;
        
        for (let stroke = 0; stroke < brushStrokes; stroke++) {
            this.ctx.beginPath();
            
            const step = 4;
            let firstPoint = true;
            const strokeOffset = (stroke - 1) * 0.5 * line.brushVariation;
            const strokeOpacity = line.opacity * (1 - stroke * 0.15);
            
            this.ctx.globalAlpha = strokeOpacity;
            this.ctx.lineWidth = line.thickness * (1 - stroke * 0.2);
            
            // Draw from bottom to top of canvas
            for (let canvasY = window.innerHeight; canvasY >= 0; canvasY -= step) {
                // Convert canvas Y to world Y coordinate (accounting for scroll)
                const worldY = canvasY + scrollOffset;
                
                // Very slow movement - reduced time multipliers significantly
                const baseWave = Math.sin(worldY * line.frequency + line.phase + time * 0.00008);
                const secondaryWave = Math.sin(worldY * line.frequency * 1.7 + line.phase + time * 0.00005) * 0.4;
                const tertiaryWave = Math.sin(worldY * line.frequency * 0.6 + line.phase + time * 0.00003) * 0.6;
                
                const combinedWave = baseWave + secondaryWave + tertiaryWave;
                const x = line.x + combinedWave * line.amplitude;
                
                // Very subtle horizontal drift - almost imperceptible
                const drift = Math.sin(worldY * 0.0008 + time * 0.00002) * 8;
                
                // Add brush texture variation
                const brushTexture = Math.sin(worldY * 0.05 + stroke * 2) * line.brushVariation * 0.8;
                
                const finalX = x + drift + strokeOffset + brushTexture;
                
                if (firstPoint) {
                    this.ctx.moveTo(finalX, canvasY);
                    firstPoint = false;
                } else {
                    this.ctx.lineTo(finalX, canvasY);
                }
            }
            
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }

    drawBackground() {
        // Clear canvas with subtle paper-like gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#fafafa');
        gradient.addColorStop(0.3, '#f5f5f5');
        gradient.addColorStop(0.7, '#f0f0f0');
        gradient.addColorStop(1, '#ebebeb');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Add subtle paper texture
        this.ctx.globalAlpha = 0.02;
        this.ctx.fillStyle = '#000000';
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.ctx.fillRect(x, y, 1, 1);
        }
        this.ctx.globalAlpha = 1;
    }

    animate(currentTime) {
        this.time = currentTime;

        this.drawBackground();

        // Draw all sine lines
        this.lines.forEach(line => {
            this.drawSineLine(line, currentTime, this.scrollY);
        });

        this.animationId = requestAnimationFrame((time) => this.animate(time));
    }

    startAnimation() {
        this.animationId = requestAnimationFrame((time) => this.animate(time));
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    handleScroll() {
        this.scrollY = window.scrollY;
    }

    handleResize() {
        this.resizeCanvas();
        this.generateLines(); // Regenerate lines for new screen size
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        
        // Handle visibility change to pause/resume animation
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAnimation();
            } else {
                this.startAnimation();
            }
        });
    }

    destroy() {
        this.stopAnimation();
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }
}

// Initialize the Life Lines artwork when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new LifeLines();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.lifeLines) {
        window.lifeLines.destroy();
    }
});