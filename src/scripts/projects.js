// Projects Section Functionality
(function() {
    // Sample project data
    const projectsData = [
        {
            id: 1,
            title: "Portfolio Website",
            category: "web",
            description: "Modern portfolio with bubble physics engine, mobile-first design, and performance optimizations.",
            problem: "Needed professional portfolio showcasing advanced frontend capabilities across multiple domains.",
            solution: "Built responsive website with smooth animations, touch interactions, and Cloudflare Pages deployment.",
            features: [
                "Bubble physics engine with interactive tech bubbles",
                "Mobile-first responsive design with touch gestures",
                "Performance optimizations (lazy loading, GPU acceleration)",
                "Cloudflare Pages hosting with global CDN deployment",
                "Semantic HTML5 with WCAG 2.1 AA accessibility"
            ],
            techStack: ["HTML5", "CSS3", "JavaScript (ES6+)", "Bootstrap 5", "DevIcon CDN"],
            githubUrl: "https://github.com/nkv-dev/Portfolio-nkv-dev",
            date: "2026-01",
            status: {
                type: "active",
                icon: "🟢",
                text: "Active",
                fullText: "Active Development",
                color: "#4CAF50"
            }
        },
        {
            id: 2,
            title: "USB Keyboard to Macro Keyboard Converter",
            category: "hardware",
            description: "Arduino-based converter that transforms USB keyboard into programmable macro keyboard.",
            problem: "Needed hardware-level shortcuts for Linux desktop and development workflows.",
            solution: "Built Arduino converter with custom firmware for Linux-optimized productivity macros.",
            features: [
                "USB keyboard input via Arduino USB Host Shield",
                "Linux desktop integration with GNOME shortcuts (F1-F6)",
                "Developer tools with VSCode productivity macros (F7-F12)",
                "Non-blocking execution using millis() timing system",
                "Ubuntu window management and terminal optimizations"
            ],
            techStack: ["Arduino Leonardo", "USB Host Shield", "USBHost Library", "Keyboard.h Library", "C++"],
            githubUrl: "https://github.com/nkv-dev/USB-to-USB-key-converter-",
            date: "2026-01",
            status: {
                type: "completed",
                icon: "🔵",
                text: "Complete",
                fullText: "Completed",
                color: "#2196F3"
            }
        },
        {
            id: 3,
            title: "Password Entropy Tool",
            category: "software",
            description: "Web-based password security analyzer with entropy calculation and generator.",
            problem: "Needed production-ready password security tool with live deployment.",
            solution: "Built analyzer with Render hosting and performance optimizations.",
            features: [
                "Real-time entropy calculation using scoring algorithms",
                "Password strength scoring with visual indicators",
                "Brute force time estimation under different attacks", 
                "Secure password generator with target entropy levels",
                "Render hosting with production optimizations"
            ],
            techStack: ["Node.js", "Express.js", "Docker", "ZXCVBN.js", "Render Platform", "HTML5", "CSS3", "JavaScript"],
            githubUrl: "https://github.com/nkv-dev/password-entropy",
            liveUrl: "https://nkvdevtool.onrender.com/",
            date: "2026-01",
            status: {
                type: "completed",
                icon: "🔵",
                text: "Complete",
                fullText: "In Production",
                color: "#2196F3"
            }
        },
        {
            id: 4,
            title: "Lazerlight Security System",
            category: "hardware",
            description: "12th CBSE science exhibition project featuring laser security system with Bluetooth alerts.",
            problem: "Needed interactive science demonstration project for 12th grade CBSE exhibition.",
            solution: "Built interactive laser security system with working demonstrations and audience engagement.",
features: [
                "Arduino-based LED laser control system with working demonstrations",
                "Bluetooth HC-05 module for wireless control and monitoring",
                "12th CBSE science exhibition project with interactive laser security",
                "Mobile device integration for remote system operation"
            ],
            techStack: ["Arduino", "Bluetooth HC-05", "Laser Module", "LED", "C++"],
            githubUrl: "https://github.com/nkv-dev/Lazerlight_security_system_arduio",
            date: "2022-11",
            status: {
                type: "archived",
                icon: "📦",
                text: "Archived",
                fullText: "Archived Project",
                color: "#607D8B"
            }
        },
        {
            id: 5,
            title: "Smart Plant Monitor",
            category: "hardware",
            description: "Automated plant monitoring system with soil moisture, temperature, and humidity sensors.",
            problem: "Forgetful watering and lack of environmental monitoring for indoor plants.",
            solution: "Built sensor-based system with automated watering and mobile notifications.",
            features: [
                "Soil moisture sensing",
                "Automated watering system",
                "Mobile notifications",
                "Environmental data logging"
            ],
            techStack: ["Arduino", "ESP8266", "Sensors", "Blynk"],
            githubUrl: "https://github.com/username/plant-monitor",
            date: "2023-05",
            status: {
                type: "planned",
                icon: "🟣",
                text: "Planned",
                fullText: "Planned Project",
                color: "#9C27B0"
            }
        },
        {
            id: 6,
            title: "File Organizer",
            category: "software",
            description: "Automated file organization tool that sorts files by type, date, and custom rules.",
            problem: "Downloads and documents folders became cluttered with unorganized files.",
            solution: "Built smart organizer with customizable rules, duplicate detection, and batch processing.",
            features: [
                "Custom sorting rules",
                "Duplicate file detection",
                "Batch processing operations",
                "File preview functionality"
            ],
            techStack: ["Python", "Tkinter", "OS Module", "Regex"],
            githubUrl: "https://github.com/username/file-organizer",
            date: "2023-03",
            status: {
                type: "maintenance",
                icon: "🔧",
                text: "Maintenance",
                fullText: "Maintenance Mode",
                color: "#FF9800"
            }
        }
    ];

    // Initial display count
    const initialProjects = 3;
    let currentlyDisplayed = initialProjects;
    
    // Get projects container
    const projectsContainer = document.getElementById('projectsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Create project card HTML
    function createProjectCard(project) {
        const categoryClass = project.category.toLowerCase();
        const statusClass = `status-${project.status.type}`;
        const techBadges = project.techStack.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');
        
        const features = project.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
        
        // Create status badge HTML
        const statusBadge = `
            <span class="project-status ${statusClass}" title="${project.status.fullText}">
                <span class="status-icon">${project.status.icon}</span>
                <span class="status-text">${project.status.fullText}</span>
            </span>
        `;
        
        return `
            <div class="project-card" data-category="${categoryClass}">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-badges">
                        <span class="project-category ${categoryClass}">${project.category}</span>
                        ${statusBadge}
                    </div>
                    <p class="project-description">${project.description}</p>
                </div>
                
                <div class="project-content">
                    <div class="project-problem">
                        <div class="problem-label">Problem:</div>
                        <div class="problem-text">${project.problem}</div>
                    </div>
                    
                    <div class="project-features">
                        <div class="features-label">Key Features:</div>
                        <ul class="features-list">
                            ${features}
                        </ul>
                    </div>
                    
                    <div class="project-tech">
                        <div class="tech-label">Tech Stack:</div>
                        <div class="tech-badges">
                            ${techBadges}
                        </div>
                    </div>
                </div>
                
                <div class="project-footer">
                    <span class="project-date">${project.date}</span>
                    <div class="project-links">
                        ${project.liveUrl ? `
                            <a href="${project.liveUrl}" target="_blank" class="live-link">
                                <i class="bi bi-globe"></i>
                                View Live
                            </a>` : ''}
                        <a href="${project.githubUrl}" target="_blank" class="github-link">
                            <i class="bi bi-github"></i>
                            View Code
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render projects
    function renderProjects() {
        if (!projectsContainer) return;
        
        console.log('Projects Data:', projectsData);
        console.log('Currently Displayed:', currentlyDisplayed);
        
        let html = '';
        
        for (let i = 0; i < Math.min(currentlyDisplayed, projectsData.length); i++) {
            html += createProjectCard(projectsData[i]);
        }
        
        projectsContainer.innerHTML = html;
        
        // Update load more button
        if (loadMoreBtn) {
            if (currentlyDisplayed >= projectsData.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }
    }
    
    // Load more projects (optimized with document fragment)
    function loadMoreProjects() {
        const remainingProjects = projectsData.length - currentlyDisplayed;
        const toLoad = Math.min(3, remainingProjects);
        
        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();
        const tempContainer = document.createElement('div');
        
        for (let i = currentlyDisplayed; i < currentlyDisplayed + toLoad; i++) {
            const projectCard = createProjectCard(projectsData[i]);
            tempContainer.innerHTML += projectCard;
        }
        
        // Add all new cards to fragment
        while (tempContainer.firstChild) {
            fragment.appendChild(tempContainer.firstChild);
        }
        
        // Add fragment to container in one operation
        projectsContainer.appendChild(fragment);
        
        currentlyDisplayed += toLoad;
        
        // Hide button if all projects are loaded
        if (currentlyDisplayed >= projectsData.length) {
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        // Observe new projects for lazy loading
        observeProjects();
        
        // Re-initialize animations for new cards
        initializeAnimations();
    }
    
    // Initialize animations
    function initializeAnimations() {
        // Add iOS-style interactive effects to project cards
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add click effect to GitHub links
        const githubLinks = document.querySelectorAll('.github-link');
        githubLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.05)';
                }, 100);
            });
        });
    }
    
    // Intersection Observer for lazy loading
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    });

    // Add visible class to projects for animation
    function observeProjects() {
        const projectCards = document.querySelectorAll('.project-card:not(.visible)');
        projectCards.forEach(card => {
            projectObserver.observe(card);
        });
    }

    // Swipe gesture handling
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }
    
    function handleSwipe() {
        const swipeThreshold = 80;
        const verticalThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Ensure swipe is primarily horizontal
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    // Swipe left - could trigger next project or category
                    showSwipeFeedback('left');
                } else {
                    // Swipe right - could trigger previous project or category
                    showSwipeFeedback('right');
                }
            }
        }
    }
    
    function showSwipeFeedback(direction) {
        // Create temporary swipe indicator
        const indicator = document.createElement('div');
        indicator.className = 'swipe-indicator';
        indicator.textContent = direction === 'left' ? '←' : '→';
        indicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            color: var(--tech-primary);
            z-index: 9999;
            pointer-events: none;
            opacity: 0.8;
            animation: swipeFade 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(indicator);
        
        // Remove indicator after animation
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 500);
    }
    
    // Pull-to-refresh functionality
    let pullStartY = 0;
    let currentPullY = 0;
    let isPulling = false;
    let pullThreshold = 100;
    
    function handlePullStart(e) {
        if (window.scrollY === 0) {
            pullStartY = e.touches[0].screenY;
            isPulling = true;
        }
    }
    
    function handlePullMove(e) {
        if (!isPulling) return;
        
        currentPullY = e.touches[0].screenY;
        const pullDistance = currentPullY - pullStartY;
        
        if (pullDistance > 0 && pullDistance < 200) {
            e.preventDefault();
            document.body.style.transform = `translateY(${pullDistance * 0.5}px)`;
        }
    }
    
    function handlePullEnd(e) {
        if (!isPulling) return;
        
        isPulling = false;
        const pullDistance = currentPullY - pullStartY;
        
        document.body.style.transform = '';
        document.body.style.transition = 'transform 0.3s ease';
        
        if (pullDistance > pullThreshold) {
            triggerRefresh();
        }
        
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    function triggerRefresh() {
        // Simulate refresh
        if (loadMoreBtn) {
            loadMoreBtn.style.opacity = '0.6';
            loadMoreBtn.textContent = 'Refreshing...';
            
            setTimeout(() => {
                // Reload projects
                currentlyDisplayed = initialProjects;
                renderProjects();
                observeProjects();
                initializeAnimations();
                
                if (loadMoreBtn) {
                    loadMoreBtn.style.opacity = '1';
                    loadMoreBtn.textContent = 'Load More Projects';
                }
            }, 1000);
        }
    }
    
    // Add swipe functionality
    function initSwipeGestures() {
        if (projectsContainer) {
            projectsContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
            projectsContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        }
        
        // Add pull-to-refresh
        document.addEventListener('touchstart', handlePullStart, { passive: true });
        document.addEventListener('touchmove', handlePullMove, { passive: false });
        document.addEventListener('touchend', handlePullEnd, { passive: true });
    }
    
    // Add swipe animation CSS
    function addSwipeAnimationCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes swipeFade {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                50% {
                    opacity: 0.8;
                    transform: translate(-50%, -50%) scale(1.1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.9);
                }
            }
            
            /* Touch feedback for better UX */
            .project-card, .tech-badge, .github-link, .load-more-btn {
                -webkit-user-select: none;
                user-select: none;
                -webkit-touch-callout: none;
            }
            
            /* Prevent text selection on mobile */
            body {
                -webkit-user-select: none;
                user-select: none;
            }
            
            /* Allow text selection for readable content */
            .project-description, .problem-text, .features-list li {
                -webkit-user-select: text;
                user-select: text;
            }
            
            /* Enhanced mobile scrolling */
            .projects-grid {
                scroll-behavior: smooth;
                -webkit-overflow-scrolling: touch;
            }
            
            /* Loading states */
            .loading {
                position: relative;
                overflow: hidden;
            }
            
            .loading::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(0, 255, 213, 0.2), transparent);
                animation: shimmer 1.5s infinite;
            }
            
            @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Mobile error handling
    function handleMobileErrors() {
        // Handle network errors gracefully
        window.addEventListener('online', () => {
            showNotification('Connection restored', 'success');
        });
        
        window.addEventListener('offline', () => {
            showNotification('No internet connection', 'error');
        });
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `mobile-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? '#ff4444' : type === 'success' ? 'var(--tech-success)' : 'var(--tech-primary)'};
            color: ${type === 'error' || type === 'success' ? '#000' : '#fff'};
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 10000;
            animation: slideUp 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideDown 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add notification animations
    function addNotificationCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from {
                    transform: translateX(-50%) translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideDown {
                from {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-50%) translateY(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize projects section
    function initProjects() {
        renderProjects();
        observeProjects();
        initializeAnimations();
        initSwipeGestures();
        addSwipeAnimationCSS();
        addNotificationCSS();
        handleMobileErrors();
        
        // Add load more event listener
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreProjects);
        }
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjects);
    } else {
        initProjects();
    }
    
    // Expose functions for potential external use
    window.projectsModule = {
        loadMoreProjects,
        renderProjects,
        projectsData
    };
})();