class MatrixEffect {
  constructor() {
    this.container = document.getElementById('matrix-bg');
    this.activeColumns = 0;
    this.maxColumns = 120;
    this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    this.init();
  }

  createColumn() {
    if (!this.container || this.activeColumns >= this.maxColumns) return;
    
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = (Math.random() * window.innerWidth) + 'px';
    column.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    let content = '';
    const length = 25 + Math.floor(Math.random() * 35);
    for (let j = 0; j < length; j++) {
      content += this.characters[Math.floor(Math.random() * this.characters.length)];
    }
    
    column.textContent = content;
    this.container.appendChild(column);
    this.activeColumns++;

    column.addEventListener('animationend', () => {
      column.remove();
      this.activeColumns--;
    });
  }

  init() {
    if (!this.container) return;

    // Criar colunas iniciais
    let delay = 0;
    for (let i = 0; i < 40; i++) {
      setTimeout(() => this.createColumn(), delay);
      delay += 50;
    }

    // Adicionar novas colunas periodicamente
    setInterval(() => {
      if (Math.random() < 0.5) {
        this.createColumn();
      }
    }, 300);
  }

  reset() {
    if (!this.container) return;
    this.container.innerHTML = '';
    this.activeColumns = 0;
    this.init();
  }
}

// Inicialização global
let matrixEffect;
let resizeTimeout;

document.addEventListener('DOMContentLoaded', () => {
  matrixEffect = new MatrixEffect();
  
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => matrixEffect.reset(), 250);
  });
});
