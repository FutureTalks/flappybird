// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&


// This file includes functions for creating a new generation
// of birds.

// Start the game over
function resetGame() {
  counter = 0;
  // Resetting best bird score to 0
    runners = [];
    normalizeFitness(loosers);
    for(let i = 0; i < numberOfBirds; i++) {
      runners[i] = new Bird();
        let chosenBird = chooseBird();
      runners[i].brain = chosenBird.brain.copy();
        if(i>0) {
            runners[i].brain.mutate(random_function);
        } else {
            runners[i].color = 'rgb(100%,0%,100%)';
        }
    }
  loosers = [];
  pipes = [];
}

function normalizeFitness(birds) {
    let sum = 0;
    for(let i = 0; i < numberOfBirds; i++) {
        loosers[i].score = pow(loosers[i].score,3);
        sum += loosers[i].score;
    }
    for (let i = 0; i < numberOfBirds; i++) {
        loosers[i].fitness = loosers[i].score/sum;
    }
}

function random_function(x) {
    if(random(1) < 0.1) {
        let offset = randomGaussian()*0.3;
        let newx = x + offset;
        if(abs(newx) < 1) {
            return abs(newx);
        } else {
            return x;
        }
    } else {
        return x;
    }
}

function chooseBird() {
    let r = random(1);
    for(let i = 1; i < numberOfBirds; i++) {
        if(r < 0) {
            return loosers[i-1];
        } else {
            r -= loosers[i].fitness;
        }
    }
    return loosers[numberOfBirds-1];
}
