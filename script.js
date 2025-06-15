document.addEventListener('DOMContentLoaded', function() {
    // Set the number of seconds before redirect
    let seconds = 10;
    const countdownElement = document.getElementById('countdown');
    const countdownElement2 = document.getElementById('countdown2');
    const exploreBtn = document.getElementById('exploreBtn');
    const factsContainer = document.getElementById('factsContainer');
    
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
    
    // Toggle facts container
    exploreBtn.addEventListener('click', function() {
        factsContainer.classList.toggle('hidden');
    });
    
    // Allow immediate redirect if user clicks anywhere on the page
    document.addEventListener('click', function() {
        clearInterval(countdownInterval);
    }, { once: true });
});
