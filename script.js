

        // Navigation
        const navbar = document.querySelector('.navbar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-link');

        // Mobile Menu Toggle
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Matrix Code Effect
        const canvas = document.querySelector('.matrix-code');
        const ctx = canvas.getContext('2d');
        
        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        const characters = 'aqwertyuioplkhjgfdsxzcbcnvmb,./!@#$%^&&*())QWERTYUIOPLKJHGFDSAZXVBNM0123456789';
        const fontSize = 16;
        const columns = canvasWidth / fontSize;
        
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvasHeight/fontSize);
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(7, 2, 15, 0.05)';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            
            ctx.fillStyle = '#0CF9F5';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvasHeight && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 60);

        // Handle window resize
        window.addEventListener('resize', () => {
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            
            const columns = canvasWidth / fontSize;
            for (let i = 0; i < columns; i++) {
                if (!drops[i]) {
                    drops[i] = Math.floor(Math.random() * canvasHeight/fontSize);
                }
            }
        });

        // Scroll Animation
        function checkScroll() {
            const elements = document.querySelectorAll('.fade-up, .fade-in, .fade-right, .fade-left');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animate');
                }
            });
        }
        
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', () => {
            // Animate hero elements
            setTimeout(() => {
                document.querySelector('.hero-subtitle').style.opacity = '1';
                document.querySelector('.hero-subtitle').style.transform = 'translateY(0)';
            }, 300);
            
            setTimeout(() => {
                document.querySelector('.hero-title').style.opacity = '1';
                document.querySelector('.hero-title').style.transform = 'translateY(0)';
            }, 500);
            
            setTimeout(() => {
                document.querySelector('.hero-text').style.opacity = '1';
                document.querySelector('.hero-text').style.transform = 'translateY(0)';
            }, 700);
            
            setTimeout(() => {
                document.querySelector('.cta-btn').style.opacity = '1';
                document.querySelector('.cta-btn').style.transform = 'translateY(0)';
            }, 900);
            
            checkScroll();
        });

        // Skill bars animation
        const skillBars = document.querySelectorAll('.skill-progress');
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const value = bar.getAttribute('data-value');
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = value + '%';
                }, 500);
            });
        }
        
        // Animate skill bars when they come into view
        const skillsSection = document.querySelector('#skills');
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);

        // Semi-circle Carousel
        const carouselContainer = document.getElementById('carousel-container');
        const projects = [
            { id: 1, title: 'E-Commerce Website', category: 'Web Development', img: '/api/placeholder/300/200' },
            { id: 2, title: 'Short Film', category: 'Video Editing', img: '/api/placeholder/300/200' },
            { id: 3, title: 'Photo Manipulation', category: 'Photo Editing', img: '/api/placeholder/300/200' },
            { id: 4, title: 'Portfolio Dashboard', category: 'Web Development', img: '/api/placeholder/300/200' },
            { id: 5, title: 'Product Commercial', category: 'Video Editing', img: '/api/placeholder/300/200' },
            { id: 6, title: 'Brand Identity', category: 'Photo Editing', img: '/api/placeholder/300/200' },
            { id: 7, title: 'Mobile App', category: 'Web Development', img: '/api/placeholder/300/200' }
        ];
        
        function createCarouselItems() {
            projects.forEach((project, index) => {
                const item = document.createElement('div');
                item.className = 'carousel-item';
                item.style.backgroundImage = `url(${project.img})`;
                
                // Calculate the position on the semi-circle
                const angle = -90 + (180 / (projects.length - 1)) * index;
                const radius = carouselContainer.clientHeight * 0.7;
                
                // Convert angle to radians
                const radians = angle * (Math.PI / 180);
                
                // Calculate the position
                const x = Math.cos(radians) * radius;
                const y = Math.sin(radians) * radius;
                
                // Set the position
                item.style.transform = `translate(${x}px, ${y}px)`;
                
                // Add project info
                const itemInfo = document.createElement('div');
                itemInfo.className = 'item-info';
                
                itemInfo.innerHTML = `
                    <h3 class="item-title">${project.title}</h3>
                    <p class="item-category">${project.category}</p>
                `;
                
                item.appendChild(itemInfo);
                carouselContainer.appendChild(item);
            });
        }
        
        createCarouselItems();
        
        // Footer background
        const footerBg = document.getElementById('footer-bg');
        
        function createCyberGrid() {
            const gridSize = 20;
            const rows = Math.ceil(footerBg.clientHeight / gridSize);
            const cols = Math.ceil(footerBg.clientWidth / gridSize);
            
            let html = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">';
            
            // Create grid lines
            for (let i = 0; i <= rows; i++) {
                const y = i * gridSize;
                html += `<line x1="0" y1="${y}" x2="100%" y2="${y}" stroke="#0CF9F5" stroke-width="0.5" opacity="0.3" />`;
            }
            
            for (let i = 0; i <= cols; i++) {
                const x = i * gridSize;
                html += `<line x1="${x}" y1="0" x2="${x}" y2="100%" stroke="#0CF9F5" stroke-width="0.5" opacity="0.3" />`;
            }
            
            // Create random glowing points
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const radius = Math.random() * 2 + 1;
                
                html += `<circle cx="${x}%" cy="${y}%" r="${radius}" fill="#0CF9F5" opacity="0.7">
                            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="${Math.random() * 3 + 2}s" repeatCount="indefinite" />
                         </circle>`;
            }
            
            // Create random connecting lines
            for (let i = 0; i < 10; i++) {
                const x1 = Math.random() * 100;
                const y1 = Math.random() * 100;
                const x2 = Math.random() * 100;
                const y2 = Math.random() * 100;
                
                html += `<line x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" stroke="#DC00D3" stroke-width="0.5" opacity="0.3">
                            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="${Math.random() * 5 + 3}s" repeatCount="indefinite" />
                         </line>`;
            }
            
            
            footerBg.innerHTML = html;
        }
        
        createCyberGrid();
        
        window.addEventListener('resize', () => {
            createCyberGrid();
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            });
        });
    