import Snake from './Snake.js';
import Fruit from './Fruit.js';
export let ctx, width, height, snakeAndFruitSize, game;

const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
width = canvas.width = 640;
height = canvas.height = 640;
snakeAndFruitSize = 32; // # has to divide evenly into 640

const snake = new Snake(320, 320);
const fruit = new Fruit();

document.addEventListener('keydown', (e) => snake.changeDirection(e.key));

function setDifficulty(difficulty) {
    switch (difficulty) {
        case 'Easy':
            game.difficulty = 150;
            break;
        case 'Normal':
            game.difficulty = 100;
            break;
        case 'Hard':
            game.difficulty = 50;
            break;
        case 'Insane':
            game.difficulty = 25;
            break;
        default:
            game.difficulty = 100;
    }
}

game = {
    id: 0,
    difficulty: 100,
    play() {
        this.id = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fruit.draw();
            snake.update();
            snake.draw();

            if (snake.eats(fruit)) {
                fruit.randomize();
            }
        }, this.difficulty);
    },
    pause() {
        clearInterval(this.id);
    },
    restart() {
        this.pause();
        location.reload();
    }
};

const form = document.forms[0];
const gameContainer = document.getElementsByClassName('game-container')[0];
const difficultyElement = document.getElementById('difficulty');
const options = [...form];

options.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const difficulty = option.value;
        difficultyElement.innerText = difficulty;
        setDifficulty(difficulty);
        form.style.display = 'none';
        gameContainer.style.display = 'block';
        game.play();
    });
});