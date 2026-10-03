document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del menú móvil y cambio de header al hacer scroll
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const header = document.getElementById('header');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Cerrar menú móvil al seleccionar enlace
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // Encoger el header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Si el elemento contiene contadores numéricos, activarlos
                if (entry.target.classList.contains('stats-grid') || entry.target.querySelector('.number')) {
                    startCounters(entry.target);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Animación de contadores de números
    function startCounters(container) {
        const counters = container.querySelectorAll('.counter, .number');
        const speed = 200; // Menor valor = más rápido

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + (target > 500 ? '+' : '');
                }
            };
            updateCount();
        });
    }
});