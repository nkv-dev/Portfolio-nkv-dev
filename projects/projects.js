// Projects Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample project data
    const projectsData = [
        {
            id: 1,
            title: "Portfolio Website",
            category: "web",
            description: "A modern, responsive portfolio website showcasing personal projects and skills with smooth animations and interactions.",
            problem: "Needed a professional online presence to showcase work to potential employers and clients.",
            solution: "Built a responsive website with modern design, smooth animations, and modular architecture.",
            features: [
                "Responsive design for all devices",
                "Smooth scroll animations",
                "Interactive project showcase",
                "Contact form integration"
            ],
            techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
            githubUrl: "https://github.com/username/portfolio",
            date: "2024-01"
        },
        {
            id: 2,
            title: "Home Automation System",
            category: "hardware",
            description: "IoT-based home automation system using ESP32 for controlling lights, fans, and appliances remotely.",
            problem: "Manual control of home appliances was inefficient and not accessible when away from home.",
            solution: "Created an IoT system with mobile app control, scheduling, and sensor-based automation.",
            features: [
                "Mobile app control interface",
                "Voice command integration",
                "Automated scheduling",
                "Energy consumption monitoring"
            ],
            techStack: ["ESP32", "Arduino", "C++", "MQTT", "Blynk"],
            githubUrl: "https://github.com/username/home-automation",
            date: "2023-11"
        },
        {
            id: 3,
            title: "Task Management CLI",
            category: "software",
            description: "Command-line tool for managing tasks with priority levels, deadlines, and project organization.",
            problem: "Needed a lightweight, fast task manager that works offline and integrates with development workflow.",
            solution: "Built a CLI tool with keyboard shortcuts, data persistence, and customizable workflows.",
            features: [
                "Keyboard-driven interface",
                "Data persistence",
                "Project categorization",
                "Export to multiple formats"
            ],
            techStack: ["Python", "Click", "SQLite", "Rich"],
            githubUrl: "https://github.com/username/task-cli",
            date: "2023-09"
        },
        {
            id: 4,
            title: "Weather Dashboard",
            category: "web",
            description: "Real-time weather dashboard with location-based forecasts, historical data, and interactive maps.",
            problem: "Weather apps were either too complex or lacked the specific data visualization needed.",
            solution: "Created a dashboard with customizable widgets, historical trends, and alert system.",
            features: [
                "Real-time weather data",
                "Interactive maps",
                "Historical trends",
                "Weather alerts"
            ],
            techStack: ["React", "Chart.js", "OpenWeather API", "Mapbox"],
            githubUrl: "https://github.com/username/weather-dashboard",
            date: "2023-07"
        },
        {
            id: 5,
            title: "Smart Plant Monitor",
            category: "hardware",
            description: "Automated plant monitoring system with soil moisture, temperature, and humidity sensors.",
            problem: "Forgetful watering and lack of environmental monitoring for indoor plants.",
            solution: "Developed a sensor-based system with automated watering and mobile notifications.",
            features: [
                "Soil moisture sensing",
                "Automated watering",
                "Mobile notifications",
                "Data logging"
            ],
            techStack: ["Arduino", "ESP8266", "Sensors", "Blynk"],
            githubUrl: "https://github.com/username/plant-monitor",
            date: "2023-05"
        },
        {
            id: 6,
            title: "File Organizer",
            category: "software",
            description: "Automated file organization tool that sorts files by type, date, and custom rules.",
            problem: "Downloads and documents folder became cluttered with unorganized files.",
            solution: "Built a smart organizer with customizable rules, duplicate detection, and batch processing.",
            features: [
                "Custom sorting rules",
                "Duplicate detection",
                "Batch processing",
                "File preview"
            ],
            techStack: ["Python", "Tkinter", "OS Module", "Regex"],
            githubUrl: "https://github.com/username/file-organizer",
            date: "2023-03"
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
        const techBadges = project.techStack.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');
        
        const features = project.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
        
        return `
            <div class="project-card" data-category="${categoryClass}">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-category ${categoryClass}">${project.category}</span>
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
                    <a href="${project.githubUrl}" target="_blank" class="github-link">
                        <i class="bi bi-github"></i>
                        View Code
                    </a>
                </div>
            </div>
        `;
    }
    
    // Render projects
    function renderProjects() {
        if (!projectsContainer) return;
        
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
    
    // Load more projects
    function loadMoreProjects() {
        const remainingProjects = projectsData.length - currentlyDisplayed;
        const toLoad = Math.min(3, remainingProjects);
        
        // Add new projects
        for (let i = currentlyDisplayed; i < currentlyDisplayed + toLoad; i++) {
            const projectCard = createProjectCard(projectsData[i]);
            projectsContainer.insertAdjacentHTML('beforeend', projectCard);
        }
        
        currentlyDisplayed += toLoad;
        
        // Hide button if all projects are loaded
        if (currentlyDisplayed >= projectsData.length) {
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        }
        
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
    
    // Initialize projects section
    function initProjects() {
        renderProjects();
        initializeAnimations();
        
        // Add load more event listener
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreProjects);
        }
    }
    
    // Initialize when DOM is loaded
    initProjects();
    
    // Expose functions for potential external use
    window.projectsModule = {
        loadMoreProjects,
        renderProjects,
        projectsData
    };
});