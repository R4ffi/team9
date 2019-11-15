class ParticleAnimator {
  constructor(particle_texture, car) {
    this.ps = new ParticleSystem(0, createVector(car.pos.x, car.pos.y - 60), particle_texture);
  }

  display() {
    let wind = createVector(0, 0.2);
    this.ps.applyForce(wind);
    this.ps.run();
    this.ps.origin = createVector(car.pos.x, car.pos.y+40);
    
    for (let i = 0; i < 2; i++) {
      this.ps.addParticle();
    }

  }
}