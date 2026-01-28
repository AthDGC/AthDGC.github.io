// Set the date we're counting down to (December 1, 2025)
const countDownDate = new Date("December 1, 2025 00:00:00").getTime();

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu functionality
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '&#9776;';
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');

    const nav = document.querySelector('nav .container');
    const navList = document.querySelector('nav ul');
    nav.insertBefore(navToggle, navList);

    navToggle.addEventListener('click', function () {
        navList.classList.toggle('show');
        navToggle.innerHTML = navList.classList.contains('show') ? '&times;' : '&#9776;';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && navList.classList.contains('show')) {
            navList.classList.remove('show');
            navToggle.innerHTML = '&#9776;';
        }
    });

    // Active state for current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelector(`nav a[href="${currentPage}"]`)?.classList.add('active');

    // Countdown functionality
    const countdownEl = document.getElementById("countdown");

    if (countdownEl) {
        const updateCountdown = function () {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                countdownEl.innerHTML = "<h2 style='color: white;'>Applications are NOW OPEN!</h2><p style='color: rgba(255,255,255,0.9); font-size: 1.2rem;'>Apply today for the 11th Naxos Summer School!</p>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
            document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}, 1000);
