document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    body.className = savedTheme + '-theme';
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        body.className = newTheme + '-theme';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- reveal on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Active Link Highlighting ---
    const sections = document.querySelectorAll('section');
    const navA = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navA.forEach(a => {
            a.classList.remove('active-link');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active-link');
            }
        });
    });

    // --- Image Modal ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close-modal");
    const openNewTabBtn = document.getElementById("openNewTab");

    // Add modal click to all images with class 'reveal' or specifically project images
    const images = document.querySelectorAll('.about-image, .project-card img');

    // Since images are currently mostly icons or a profile, let's just make the profile one zoomable for now.
    // In a real project, we'd add this to gallery images.
    const zoomableImages = document.querySelectorAll('img');

    zoomableImages.forEach(img => {
        img.addEventListener('click', (e) => {
            // Only zoom if it's a large image, not an icon
            if (img.width < 100) return;

            modal.style.display = "block";
            modalImg.src = img.src;
            captionText.innerText = img.alt;
            if (openNewTabBtn) openNewTabBtn.href = img.src;
        });
    });

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            modalImg.style.transform = "scale(1)";
            isZoomed = false;
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            modalImg.style.transform = "scale(1)";
            isZoomed = false;
        }
    };

    // Zoom and Pan for modal image
    let isZoomed = false;
    modalImg.addEventListener('click', (e) => {
        e.stopPropagation();
        isZoomed = !isZoomed;
        if (isZoomed) {
            modalImg.style.transform = "scale(2)";
            modalImg.classList.add('zoomed');
        } else {
            modalImg.style.transform = "scale(1)";
            modalImg.classList.remove('zoomed');
        }
    });

    modal.addEventListener('mousemove', (e) => {
        if (!isZoomed) return;
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const moveX = (0.5 - x) * 100;
        const moveY = (0.5 - y) * 100;
        modalImg.style.transform = `scale(2) translate(${moveX}px, ${moveY}px)`;
    });
});
