class Egg {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.collected = false;
        this.color = this.getRandomColor();
        this.pattern = Math.floor(Math.random() * 3);
    }

    getRandomColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFBE0B'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw(ctx) {
        if (!this.collected) {
            // Draw egg base
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(this.x + this.width/2, this.y + this.height/2, 
                       this.width/2, this.height/2, 0, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Draw decorative patterns
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            
            switch(this.pattern) {
                case 0: // Zigzag pattern
                    ctx.beginPath();
                    for(let i = 0; i < 3; i++) {
                        ctx.moveTo(this.x + 5, this.y + 10 + (i * 12));
                        ctx.lineTo(this.x + this.width - 5, this.y + 10 + (i * 12));
                    }
                    ctx.stroke();
                    break;
                    
                case 1: // Dots pattern
                    for(let i = 0; i < 3; i++) {
                        for(let j = 0; j < 2; j++) {
                            ctx.beginPath();
                            ctx.arc(this.x + 10 + (j * 15), this.y + 15 + (i * 12), 2, 0, 2 * Math.PI);
                            ctx.fillStyle = 'white';
                            ctx.fill();
                        }
                    }
                    break;
                    
                case 2: // Floral pattern
                    ctx.beginPath();
                    ctx.moveTo(this.x + this.width/2, this.y + 5);
                    ctx.lineTo(this.x + this.width/2, this.y + this.height - 5);
                    ctx.moveTo(this.x + 5, this.y + this.height/2);
                    ctx.lineTo(this.x + this.width - 5, this.y + this.height/2);
                    ctx.stroke();
            }
            ctx.restore();
        }
    }
}

export default Egg;