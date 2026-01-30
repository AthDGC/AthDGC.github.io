document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.nav-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            menu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a menu item
    const menuItems = document.querySelectorAll('.nav-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                menu.classList.remove('active');
            }
        });
    });

    // Newsletter form submission with improved feedback
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const formContent = this.parentElement;

            // Display a success message
            formContent.innerHTML = '<p class="form-success-message">Thank you for subscribing! We\'ll keep you updated.</p>';
        });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Social sharing functions
    window.shareOnFacebook = function () {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    window.shareOnTwitter = function () {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Check out this CIVIS Diachronic Linguistics 2026 programme!');
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    window.shareOnLinkedIn = function () {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}`, '_blank');
    };
});
