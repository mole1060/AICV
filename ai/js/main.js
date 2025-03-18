// Three.js Particle System
const initThreeJS = () => {
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create a particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    
    // Create positions for particles (x, y, z coordinates)
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Generate random positions and colors for each particle
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Positions
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 1] = (Math.random() - 0.5) * 15;
        positions[i + 2] = (Math.random() - 0.5) * 15;

        // Colors (creating a gradient from purple to blue)
        colors[i] = Math.random() * 0.5 + 0.3; // R (purple to blue)
        colors[i + 1] = Math.random() * 0.2; // G
        colors[i + 2] = Math.random() * 0.5 + 0.5; // B (blue)
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material for particles
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
    });
    
    // Create the particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Position the camera
    camera.position.z = 5;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / 100;
        mouseY = (event.clientY - windowHalfY) / 100;
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        targetX = mouseX * 0.05;
        targetY = mouseY * 0.05;
        
        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.0005;
        
        particleSystem.rotation.y += (targetX - particleSystem.rotation.y) * 0.05;
        particleSystem.rotation.x += (targetY - particleSystem.rotation.x) * 0.05;
        
        renderer.render(scene, camera);
    };
    
    animate();
};

// GSAP Animations
const initAnimations = () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animations
    gsap.from(".nav-container", {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5
    });
    
    gsap.from(".hero-content h1", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
    });
    
    gsap.from(".profession", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1
    });
    
    gsap.from(".intro", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.2
    });
    
    gsap.from(".cta-buttons", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.4
    });
    
    // Scroll animations
    const sections = document.querySelectorAll('section:not(#home)');
    
    sections.forEach(section => {
        gsap.from(section.querySelector('.section-header'), {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.from(section.querySelectorAll('.skill-category, .timeline-item, .project-card, .contact-container > div'), {
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out"
        });
    });
    
    // Stats counter animation
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const targetNumber = parseInt(stat.textContent);
        stat.textContent = '0';
        
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat.closest('.about-stats'),
                start: "top 80%",
                toggleActions: "play none none none"
            },
            innerText: targetNumber,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.inOut"
        });
    });
    
    // Glitch text effect
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            const duration = Math.random() * 0.1 + 0.05;
            gsap.to(glitchText, {
                skewX: Math.random() * 10 - 5,
                duration: duration,
                ease: "power4.inOut",
                onComplete: () => {
                    gsap.to(glitchText, {
                        skewX: 0,
                        duration: duration,
                        ease: "power4.inOut"
                    });
                }
            });
            
            gsap.to(glitchText, {
                textShadow: `0 0 ${Math.random() * 10 + 5}px rgba(110, 0, 255, ${Math.random() * 0.5 + 0.5})`,
                duration: duration,
                ease: "power4.inOut",
                onComplete: () => {
                    gsap.to(glitchText, {
                        textShadow: "0 0 10px rgba(110, 0, 255, 0.8)",
                        duration: duration,
                        ease: "power4.inOut"
                    });
                }
            });
        }, 3000);
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: "power3.inOut"
            });
        });
    });
    
    // Form submit animation
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate the button
            gsap.to(this.querySelector('button'), {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            
            // Show success message (this would be replaced with actual form submission)
            const formElements = this.querySelectorAll('input, textarea, button');
            
            gsap.to(formElements, {
                opacity: 0.5,
                duration: 0.5
            });
            
            setTimeout(() => {
                // Reset the form and show success message
                // In a real application, you would send the form data here
                this.reset();
                
                gsap.to(formElements, {
                    opacity: 1,
                    duration: 0.5
                });
                
                alert('Thanks for your message! I will get back to you soon.');
            }, 1000);
        });
    }
};

// Project image placeholders
const setProjectImages = () => {
    const projectImages = document.querySelectorAll('.project-image');
    
    // Sample image URLs - replace with your actual project images
    const imageUrls = [
        './images/image_1.jpg',
        './images/image_1.jpg',
        './images/image_1.jpg',
    ];
    
    projectImages.forEach((img, index) => {
        if (imageUrls[index]) {
            img.style.backgroundImage = `url(${imageUrls[index]})`;
        }
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin here too to ensure it's available
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    initThreeJS();
    initAnimations();
    setProjectImages();
    
    // Mobile menu toggle (for responsive design)
    const mobileMenuToggle = () => {
        const navList = document.querySelector('nav ul');
        const navHeight = navList.scrollHeight;
        
        if (window.innerWidth <= 768) {
            navList.style.maxHeight = '0';
            navList.style.overflow = 'hidden';
            navList.style.transition = 'max-height 0.5s ease';
            
            document.querySelector('.logo').addEventListener('click', (e) => {
                e.preventDefault();
                if (navList.style.maxHeight === '0px') {
                    navList.style.maxHeight = navHeight + 'px';
                } else {
                    navList.style.maxHeight = '0px';
                }
            });
        } else {
            navList.style.maxHeight = 'none';
            navList.style.overflow = 'visible';
        }
    };
    
    mobileMenuToggle();
    window.addEventListener('resize', mobileMenuToggle);
});

// Add this code to ensure the projects section is visible

document.addEventListener('DOMContentLoaded', function() {
    // Make sure the projects section is visible
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.classList.add('visible-section');
    }
    
    // Initialize GSAP ScrollTrigger for the projects section
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to('#projects', {
        scrollTrigger: {
            trigger: '#projects',
            start: 'top bottom',
            end: 'bottom top',
            toggleClass: {targets: '#projects', className: 'active'},
            once: true
        }
    });
    
    // Add click event to project section nav link
    const projectsLink = document.querySelector('a[href="#projects"]');
    if (projectsLink) {
        projectsLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#projects').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
});
