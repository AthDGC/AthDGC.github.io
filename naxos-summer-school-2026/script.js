// Set the date we're counting down to (December 1, 2025)
const countDownDate = new Date("December 1, 2025 00:00:00").getTime();

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu functionality
    const navToggle = document.querySelector('.nav-toggle');
    const mainMenu = document.getElementById('main-menu');
    const menuItems = mainMenu.querySelectorAll('a');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mainMenu.classList.toggle('show');
        navToggle.setAttribute('aria-expanded', isMenuOpen);
        navToggle.querySelector('.icon').innerHTML = isMenuOpen ? '×' : '☰';

        if (isMenuOpen) {
            menuItems[0].focus();
        }
    }

    // Toggle menu on button click
    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (isMenuOpen && !event.target.closest('nav')) {
            toggleMenu();
        }
    });

    // Keyboard navigation
    mainMenu.addEventListener('keydown', function (event) {
        const currentItem = document.activeElement;
        const isMenuItem = currentItem.tagName === 'A' && currentItem.closest('#main-menu');

        if (!isMenuItem) return;

        const items = Array.from(menuItems);
        const currentIndex = items.indexOf(currentItem);

        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                event.preventDefault();
                items[(currentIndex + 1) % items.length].focus();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                items[(currentIndex - 1 + items.length) % items.length].focus();
                break;
            case 'Home':
                event.preventDefault();
                items[0].focus();
                break;
            case 'End':
                event.preventDefault();
                items[items.length - 1].focus();
                break;
            case 'Escape':
                if (isMenuOpen) {
                    toggleMenu();
                    navToggle.focus();
                }
                break;
        }
    });

    // Set active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = document.querySelector(`nav a[href="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
    }

    // Countdown functionality with ARIA live updates
    const countdownEl = document.getElementById("countdown");

    if (countdownEl) {
        // Add ARIA live region for screen readers
        const ariaLive = document.createElement('div');
        ariaLive.setAttribute('aria-live', 'polite');
        ariaLive.setAttribute('class', 'sr-only');
        countdownEl.parentNode.insertBefore(ariaLive, countdownEl.nextSibling);

        const updateCountdown = function () {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                countdownEl.innerHTML = "<div class='countdown-open' role='alert'>Applications are now open!</div>";
                ariaLive.textContent = "Applications are now open!";
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

            // Update ARIA live region every minute
            if (seconds === 0) {
                ariaLive.textContent = `${days} days, ${hours} hours, and ${minutes} minutes until applications open`;
            }
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);

        // Cleanup on page hide/unload
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                clearInterval(timer);
            } else {
                updateCountdown();
                setInterval(updateCountdown, 1000);
            }
        });
    }
}, 1000);
