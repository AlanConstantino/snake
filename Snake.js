import { ctx, snakeAndFruitSize as size, game } from './main.js';

export default class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.total = 0;
        this.tail = [];
    }

    eats(fruit) {
        const snakeAteFruit = (
            this.x === fruit.x &&
            this.y === fruit.y
        );

        if (snakeAteFruit) {
            const { x, y } = fruit;
            this.tail.push({ x, y });
            this.total++;
            return true;
        }

        return false;
    }

    changeDirection(direction) {
        switch (direction) {
            case 'w':
            case 'ArrowUp':
                this.vx = 0;
                this.vy = -size;
                break;
            case 'a':
            case 'ArrowLeft':
                this.vx = -size;
                this.vy = 0;
                break;
            case 's':
            case 'ArrowDown':
                this.vx = 0;
                this.vy = size;
                break;
            case 'd':
            case 'ArrowRight':
                this.vx = size;
                this.vy = 0;
                break;
        }
    }

    checkCollision() {
        const collidesWithWall = (
            this.x < 0 ||                   // left wall
            this.y < 0 ||                   // top wall
            this.x > canvas.width - size || // right wall
            this.y > canvas.height - size   // bottom wall
        );

        if (collidesWithWall) {
            game.restart();
        }

        this.tail.forEach(body => {
            const collidesWithSelf = (
                body.x === this.x &&
                body.y === this.y
            );

            if (collidesWithSelf) {
                game.restart();
            }
        });
    }

    update() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        if (this.tail.length > 0) {
            this.tail[this.total - 1] = { x: this.x, y: this.y };
        }

        const score = document.getElementById('score');
        score.innerText = this.total;
        this.x += this.vx;
        this.y += this.vy;
        this.checkCollision();
    }

    draw() {
        ctx.fillStyle = '#f5f5f5';
        this.tail.forEach(item => ctx.fillRect(item.x, item.y, size, size));
        ctx.fillRect(this.x, this.y, size, size);
    }
}