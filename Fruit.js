import { ctx, width, height, snakeAndFruitSize as size } from './main.js';

export default class Fruit {
    constructor() {
        this.x = Math.floor(Math.random() * (width / size)) * size;
        this.y = Math.floor(Math.random() * (height / size)) * size;
    }

    randomize() {
        this.x = Math.floor(Math.random() * (width / size)) * size;
        this.y = Math.floor(Math.random() * (height / size)) * size;
    }

    draw() {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x, this.y, size, size);
    }
}