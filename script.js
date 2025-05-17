// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Fix Premium link to scroll to Premium section
    document.querySelectorAll('.nav-links a[href="#premium"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const premiumSection = document.querySelector('#premium');
            window.scrollTo({
                top: premiumSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Make Try Economy, Try Levelling, Try Memes buttons scroll to CTA section
    document.querySelectorAll('.feature-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const ctaSection = document.querySelector('#cta');
            window.scrollTo({
                top: ctaSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Update active navigation link based on scroll position
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Sticky navigation
        const nav = document.querySelector('nav');
        if (scrollPosition > 50) {
            nav.style.padding = '15px 0';
            nav.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.background = 'rgba(5, 5, 5, 0.8)';
        }
    });

    // Animated counter for stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.textContent = Math.ceil(count) + '+';
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        // Start animation when element comes into view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });

    // Floating UI animation
    const floatingUIs = document.querySelectorAll('.floating-ui');
    floatingUIs.forEach(ui => {
        ui.style.animationDelay = Math.random() * 2 + 's';
    });
});
