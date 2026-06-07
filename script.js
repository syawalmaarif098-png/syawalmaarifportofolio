// ========================================
// PORTFOLIO SCRIPT - MAHASISWA IT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------------------
    // 1. TYPEWRITER EFFECT (EFEK KETIKAN)
    // ---------------------------------------------------------
    const textElement = document.getElementById('typing-text');
    const texts = ["Mahasiswa IT", "Web Developer", "Coding Enthusiast", "Tech Learner"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();


    // ---------------------------------------------------------
    // 2. NAVBAR SCROLL EFFECT
    // ---------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.85)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.2rem 5%';
        }
    });


    // ---------------------------------------------------------
    // 3. MOBILE MENU TOGGLE
    // ---------------------------------------------------------
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Tutup menu saat link diklik
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });


    // ---------------------------------------------------------
    // 4. SMOOTH SCROLL
    // ---------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ---------------------------------------------------------
    // 5. REVEAL ON SCROLL (ANIMASI MUNCUL)
    // ---------------------------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.about-card, .contact-card, .about-image, .location-wrapper');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Inject style for visible class
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);


    // ---------------------------------------------------------
    // 6. TANGGAL OTOMATIS DI FOOTER
    // ---------------------------------------------------------
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    
    // ---------------------------------------------------------
    // 7. ACTIVE LINK ON SCROLL
    // ---------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });


    // ---------------------------------------------------------
    // 8. CUSTOM CURSOR (OPSIONAL - JIKA INGIN)
    // ---------------------------------------------------------
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        }
        .custom-cursor.hovered {
            transform: scale(2);
            opacity: 0;
        }
    `;
    document.head.appendChild(cursorStyle);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        document.addEventListener('mouseover', (e) => {
            if(e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                cursor.classList.add('hovered');
            }
        });
    });


    // ---------------------------------------------------------
    // 9. KONFIRMASI LINK EXTERNAL
    // ---------------------------------------------------------
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Membuka link eksternal: ' + this.href);
        });
    });

    console.log("✅ Portofolio Loaded Successfully!");
    console.log("🚀 Dibuat dengan ❤️ untuk Portofolio Mahasiswa IT");
});
