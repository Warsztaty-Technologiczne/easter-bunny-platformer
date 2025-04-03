class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.speed = 5;
        this.velY = 0;
        this.gravity = 0.5;
        this.jumping = false;
        
        // Create SVG image
        const svgString = `<svg width="40" height="60" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
            <!-- Outline group -->
            <g stroke="#666666" stroke-width="1">
                <!-- Ears -->
                <path d="M15 25 L10 5 L15 15 Z" fill="#FFFFFF"/>
                <path d="M25 25 L30 5 L25 15 Z" fill="#FFFFFF"/>
                <path d="M12 20 L10 8 L14 15 Z" fill="#FFE4E1"/>
                <path d="M28 20 L30 8 L26 15 Z" fill="#FFE4E1"/>
                
                <!-- Head and Body -->
                <circle cx="20" cy="30" r="10" fill="#FFFFFF"/>
                <ellipse cx="20" cy="45" rx="8" ry="12" fill="#FFFFFF"/>
                
                <!-- Paws -->
                <ellipse cx="15" cy="55" rx="3" ry="2" fill="#FFFFFF"/>
                <ellipse cx="25" cy="55" rx="3" ry="2" fill="#FFFFFF"/>
            </g>
            
            <!-- Face details (no outline) -->
            <circle cx="17" cy="28" r="1.5" fill="black"/>
            <circle cx="23" cy="28" r="1.5" fill="black"/>
            <path d="M19 31 L21 31 L20 33 Z" fill="#FFB6C1"/>
        </svg>`;
        
        const blob = new Blob([svgString], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        this.sprite = new Image();
        this.sprite.src = url;
    }

    update() {
        // Apply gravity
        this.velY += this.gravity;
        this.y += this.velY;

        // Basic ground collision
        if (this.y + this.height > 600) {
            this.y = 600 - this.height;
            this.velY = 0;
            this.jumping = false;
        }
    }

    draw(ctx) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            // Fallback rectangle until image loads
            ctx.fillStyle = 'pink';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    jump() {
        if (!this.jumping) {
            this.velY = -12;
            this.jumping = true;
        }
    }
}

export default Player;