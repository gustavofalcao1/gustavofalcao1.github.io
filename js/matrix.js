class MatrixEffect {
  constructor() {
    this.container = document.getElementById('matrix-bg');
    this.activeColumns = 0;
    this.maxColumns = Math.floor(window.innerWidth / 20); // Dynamic column count based on screen width
    this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    this.fps = 30;
    this.lastFrame = 0;
    this.init();
  }

  createColumn() {
    if (!this.container || this.activeColumns >= this.maxColumns) return;
    
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = (Math.random() * window.innerWidth) + 'px';
    column.style.animationDuration = (Math.random() * 2 + 3) + 's'; // Faster animation
    column.style.opacity = Math.random() * 0.5 + 0.5; // Random opacity
    
    const length = 15 + Math.floor(Math.random() * 25); // Shorter columns
    const content = Array(length)
      .fill()
      .map(() => this.characters[Math.floor(Math.random() * this.characters.length)])
      .join('');
    
    column.textContent = content;
    this.container.appendChild(column);
    this.activeColumns++;

    column.addEventListener('animationend', () => {
      column.remove();
      this.activeColumns--;
      if (Math.random() < 0.8) this.createColumn(); // 80% chance to create new column
    });
  }

  init() {
    if (!this.container) return;
    
    // Initial columns with staggered delay
    const initialColumns = Math.min(30, this.maxColumns);
    for (let i = 0; i < initialColumns; i++) {
      setTimeout(() => this.createColumn(), i * 100);
    }

    // Continuous column creation with frame limiting
    const animate = (timestamp) => {
      if (timestamp - this.lastFrame > 1000 / this.fps) {
        if (Math.random() < 0.2) this.createColumn(); // 20% chance per frame
        this.lastFrame = timestamp;
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  reset() {
    if (!this.container) return;
    this.container.innerHTML = '';
    this.activeColumns = 0;
    this.maxColumns = Math.floor(window.innerWidth / 20);
    this.init();
  }
}

// Initialize with debounced resize handler
let matrixEffect;
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

document.addEventListener('DOMContentLoaded', () => {
  matrixEffect = new MatrixEffect();
  
  window.addEventListener('resize', debounce(() => matrixEffect.reset(), 250));
});
