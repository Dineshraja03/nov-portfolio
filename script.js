document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const navLinks = document.querySelectorAll('nav a');
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    /**
     * Mobile menu toggle
     */
    const toggleMobileMenu = () => {
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                mobileMenuButton.setAttribute(
                    'aria-expanded',
                    mobileMenu.classList.contains('active')
                );
            });
        }
    };

    /**
     * Handle smooth scrolling for anchor links
     */
    const handleSmoothScroll = () => {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Close mobile menu if open
                        mobileMenu?.classList.remove('active');
                    }
                }
            });
        });
    };

    /**
     * Handle scroll events
     */
    const handleScroll = () => {
        let lastScroll = 0;
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add/remove header background on scroll
            if (header) {
                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }

            // Hide/show header on scroll direction
            if (currentScroll > lastScroll && currentScroll > 100) {
                header?.classList.add('header-hidden');
            } else {
                header?.classList.remove('header-hidden');
            }

            lastScroll = currentScroll;
        });
    };

    /**
     * Form validation
     */
    const validateForms = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form fields
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Basic validation
                let isValid = true;
                for (const [key, value] of Object.entries(data)) {
                    const field = form.querySelector(`[name="${key}"]`);
                    const errorElement = form.querySelector(`[data-error="${key}"]`);
                    
                    if (!value.trim()) {
                        isValid = false;
                        field?.classList.add('error');
                        if (errorElement) {
                            errorElement.textContent = 'This field is required';
                        }
                    } else {
                        field?.classList.remove('error');
                        if (errorElement) {
                            errorElement.textContent = '';
                        }
                    }
                }

                if (isValid) {
                    console.log('Form submitted:', data);
                    // Add your form submission logic here
                }
            });
        });
    };

    /**
     * Handle lazy loading of images
     */
    const handleLazyLoading = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    lazyLoadObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => lazyLoadObserver.observe(img));
    };

    /**
     * Initialize all functions
     */
    const init = () => {
        toggleMobileMenu();
        handleSmoothScroll();
        handleScroll();
        validateForms();
        handleLazyLoading();
    };

    // Start the application
    init();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Add resize-specific logic here
            console.log('Window resized');
        }, 250);
    });

    // Clean up function
    const cleanup = () => {
        // Remove event listeners or clean up resources if needed
        window.removeEventListener('resize', () => {});
    };

    // Clean up on page unload
    window.addEventListener('unload', cleanup);

    // Projects Animation - Choose one of these options:

    // Option 1: Project Management/Tasks
        // lottie.loadAnimation({
        //     container: document.getElementById('projects-animation'),
        //     renderer: 'svg',
        //     loop: true,
        //     autoplay: true,
        //     path: 'https://assets8.lottiefiles.com/packages/lf20_M9p23l.json'
        // });

    // Option 2: Code Window Animation
    lottie.loadAnimation({
        container: document.getElementById('projects-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets2.lottiefiles.com/private_files/lf30_wqypnpu5.json'
    });

    // // Option 3: Project Development
    // lottie.loadAnimation({
    //     container: document.getElementById('projects-animation'),
    //     renderer: 'svg',
    //     loop: true,
    //     autoplay: true,
    //     path: 'https://assets5.lottiefiles.com/packages/lf20_pwohahvd.json'
    // });

    // Option 4: Web Development
    // lottie.loadAnimation({
    //     container: document.getElementById('projects-animation'),
    //     renderer: 'svg',
    //     loop: true,
    //     autoplay: true,
    //     path: 'https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json'
    // });

    function sendWhatsAppMessage(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Format the message
        const formattedMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
        
        // Replace YOUR_PHONE_NUMBER with your actual phone number including country code
        // Example: 919876543210 for +91 9876543210
        const phoneNumber = '919150256608';
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
    }
});