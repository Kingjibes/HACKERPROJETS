document.addEventListener('DOMContentLoaded', function() {
    // Set the number of seconds before redirect
    let seconds = 20;
    const countdownElement = document.getElementById('countdown');
    const countdownElement2 = document.getElementById('countdown2');
    const detailsBtn = document.getElementById('detailsBtn');
    const detailsContainer = document.getElementById('detailsContainer');
    
    // Update countdown every second
    const countdownInterval = setInterval(function() {
        seconds--;
        countdownElement.textContent = seconds;
        if (countdownElement2) countdownElement2.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            window.location.href = "https://hackerprojects-9ox5.onrender.com";
        }
    }, 1000);
    
    // Toggle details container
    detailsBtn.addEventListener('click', function() {
        detailsContainer.classList.toggle('hidden');
        const icon = this.querySelector('i');
        if (detailsContainer.classList.contains('hidden')) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    });
    
    // Allow immediate redirect if user clicks anywhere on the page
    document.addEventListener('click', function() {
        clearInterval(countdownInterval);
    }, { once: true });
    
    // Add glitch effect to header on hover
    const header = document.querySelector('h1');
    header.addEventListener('mouseenter', function() {
        this.classList.add('glitch');
        setTimeout(() => {
            this.classList.remove('glitch');
        }, 500);
    });
});
