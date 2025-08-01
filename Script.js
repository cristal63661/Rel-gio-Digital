function pad(n){ return n.toString().padStart(2,'0'); }

function updateClock() {
  const now = new Date();

  const h = pad(now.getHours());
  const m = pad(now.getMinutes());
  const s = pad(now.getSeconds());

  const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const dayName = days[now.getDay()];
  const day = pad(now.getDate());
  const month = pad(now.getMonth()+1);
  const year = now.getFullYear();

  document.querySelector('.clock').textContent = `${h}:${m}:${s}`;
  document.querySelector('.date').textContent = `${dayName}, ${day}/${month}/${year}`;
}

setInterval(updateClock, 1000);
updateClock();

// Tema claro/escuro
const btnTheme = document.getElementById('toggleTheme');
btnTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')) {
    btnTheme.textContent = 'Modo Claro';
  } else {
    btnTheme.textContent = 'Modo Escuro';
  }
});

// Função extra: modo celebrar com corações e brilhinhos caindo
const btnCelebrate = document.getElementById('btnCelebrate');
let celebrating = false;
let intervalCelebrate;

btnCelebrate.addEventListener('click', () => {
  if (celebrating) {
    clearInterval(intervalCelebrate);
    btnCelebrate.textContent = '🎉 Celebrar';
    celebrating = false;
    return;
  }

  btnCelebrate.textContent = 'Parar 🎉';
  celebrating = true;

  intervalCelebrate = setInterval(() => {
    createParticle();
  }, 300);
});

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add(Math.random() > 0.5 ? 'heart' : 'sparkle');

  // posição aleatória horizontal
  particle.style.left = (Math.random() * 100) + 'vw';
  particle.style.top = '100vh';
  particle.style.opacity = '1';
  particle.style.position = 'fixed';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '9999';

  document.body.appendChild(particle);

  // animação de subida e fade out
  let pos = 100;
  const speed = 1 + Math.random() * 2;
  const anim = setInterval(() => {
    if(pos < -10) {
      clearInterval(anim);
      particle.remove();
    } else {
      pos -= speed;
      particle.style.top = pos + 'vh';
      particle.style.opacity = parseFloat(particle.style.opacity) - 0.02;
    }
  }, 30);
}
