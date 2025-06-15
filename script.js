// Create stars
const starsContainer = document.getElementById('stars');
const starCount = 100;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random properties
    const size = Math.random() * 2 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 5 + 2;
    const opacity = Math.random() * 0.5 + 0.5;
    const delay = Math.random() * 5;
    
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--opacity', opacity);
    star.style.animationDelay = `${delay}s`;
    
    starsContainer.appendChild(star);
}

// Countdown and redirect
let count = 5;
const countdownElement = document.getElementById('countdown');
const countdownInterval = setInterval(() => {
    count--;
    countdownElement.textContent = count;
    
    if (count <= 0) {
        clearInterval(countdownInterval);
        window.location.href = 'https://hackerpro.onrender.com';
    }
}, 1000);

// Focus the button for keyboard users
window.onload = function() {
    document.querySelector('.btn').focus();
};
