// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

// Mutation function to be passed into bird.brain

class Bird {
  constructor() {
    // position and size of bird
    this.x = 64;
    this.y = height / 2;
    this.r = 12;

    // Gravity, lift and velocity
    this.gravity = 0.4;
    this.lift = -6;
    this.velocity = 0;
    this.color = 'rgba(90%,90%,90%,0.25)';

    // Score is how many frames it's been alive
    this.score = 0;
    this.brain = new NeuralNetwork(8,8,2);
    this.fitness = 0;
  }

  // Display the bird
  show() {
    fill(this.color);
    stroke(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  think(pipes) {
        let inputs = [];
        inputs[0] = map(pipes[0].x,0,width,0,1);
        inputs[1] = map(pipes[0].top,0,height,0,1);
        inputs[2] = map(pipes[0].bottom,0,height,0,1);
        
        if (pipes[1] instanceof Pipe){
          inputs[3] = map(pipes[1].x,0,width,0,1);
          inputs[4] = map(pipes[1].top,0,height,0,1);
          inputs[5] = map(pipes[1].bottom,0,height,0,1);
        }
        else{
          inputs[3] = 0.5;
          inputs[4] = 0.5;
          inputs[5] = 0.5;
        }
        inputs[6] = map(this.y,0,height,0,1);
        inputs[7] = map(this.velocity,-20,20,0,1);
        let action = this.brain.predict(inputs);
        if(action[0] > action[1]) {
            this.up();
        }
    }

  // Jump up
  up() {
    this.velocity += this.lift;
  }

  bottomTop() {
    // Bird dies when hits bottom?
    return (this.y > height || this.y < 0);
  }

  // Update bird's position based on velocity, gravity, etc.
  update() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    // Every frame it is alive increases the score
    this.score++;
  }
}
