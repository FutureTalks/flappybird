// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S18

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&


let bird;
// Pipes
let pipes = [];
// A frame counter to determine when to add a pipe
let counter = 0;
let generation = 1;

// Interface elements
let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;
let generationSpan;
let numberOfBirds = 50;
let runners = [];
let loosers = [];

// All time high score
let highScore = 0;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('canvascontainer');

    // Access the interface elements
    speedSlider = select('#speedSlider');
    speedSpan = select('#speed');
    highScoreSpan = select('#hs');
    allTimeHighScoreSpan = select('#ahs');
    generationSpan = select('#gen');

    for(let i = 0; i < numberOfBirds; i++) {
        runners[i] = new Bird();
    }
}

function draw() {
    background(0);

    // Should we speed up cycles per frame
    let cycles = speedSlider.value();
    speedSpan.html(cycles);


    // How many times to advance the game
    for (let n = 0; n < cycles; n++) {
        // Show all the pipes
        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }
        }

        // Draw everything!
        for (let i = 0; i < pipes.length; i++) {
            pipes[i].show();
        }

        // Add a new pipe every so often
        if (counter % 75 == 0) {
            pipes.push(new Pipe());
        }

        for(let i = 0; i < runners.length; i++) {
            let bird = runners[i];
            bird.think(pipes);
            bird.update();
            bird.show();
            // Check all the pipes
            for (let j = 0; j < pipes.length; j++) {
                // It's hit a pipe
                if (pipes[j].hits(bird)) {
                    loosers.push(runners.splice(i,1)[0]);
                    break;
                }
            }
            if (bird.bottomTop()) {
                loosers.push(runners.splice(i,1)[0]);
            }
        }

        counter++;

        if(runners.length === 0) {
            resetGame();
            generationSpan.html(++generation);
        }


    }

    // What is highest score of the current population
    let tempHighScore = 0;

    if(runners.length > 0 ) {
        tempHighScore = runners[0].score;
        if (tempHighScore > highScore) {
            highScore = tempHighScore;
        }


        // Update DOM Elements
        highScoreSpan.html(tempHighScore);
        allTimeHighScoreSpan.html(highScore);
    }



}
function keyPressed() {
    if (key == ' ') {
        bird.up();
        console.log('space');
    }
}
