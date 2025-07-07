document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Optional: Add active class to clicked link
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Close the mobile menu if open after clicking a link
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // Add active class to hamburger for animation
    });

    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('.section');
    const skillItems = document.querySelectorAll('.skill-item');
    const projectItems = document.querySelectorAll('.project-item'); // Select all project items for animation

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    skillItems.forEach(item => {
                        item.style.opacity = 1;
                        item.style.transform = 'translateY(0)';
                    });
                } else if (entry.target.id === 'projects') {
                    // Projects are now visible by default due to CSS change.
                    // This code here would only re-apply the "appear" styles
                    // if you were to initially hide them (e.g., via a class that JS removes).
                    // As of this update, projects are always visible unless specifically hidden
                    // by other means. If you want a *scroll-in* animation for projects,
                    // you would re-introduce opacity/transform 0 in CSS and handle it here.
                    // For now, this part of the JS is effectively less critical for initial visibility.
                    projectItems.forEach(item => {
                        item.style.opacity = 1; // Ensures visibility
                        item.style.transform = 'translateY(0)'; // Ensures correct position
                    });
                }
            } else {
                // Optional: reset animations if section goes out of view
                if (entry.target.id === 'skills') {
                    skillItems.forEach(item => {
                        item.style.opacity = 0;
                        item.style.transform = 'translateY(20px)';
                    });
                }
                // The reset for 'projects' has been intentionally removed here.
                // This ensures Project 1 and Project 2 (and any other projects) remain visible
                // once they have animated into view, even if you scroll away from the section.
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Set 'Home' link as active initially
    document.querySelector('nav a[href="#home"]').classList.add('active');

    // Optional: Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust this value if links highlight too early/late based on fixed headers etc.
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- NEW CODE FOR PROJECT MEDIA ZOOM ---
    const projectMediaContainers = document.querySelectorAll('.project-media');

    projectMediaContainers.forEach(container => {
        const mediaElement = container.querySelector('img, video');

        if (mediaElement) {
            mediaElement.style.cursor = 'pointer'; // Ensure cursor is pointer if not set in CSS

            mediaElement.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevents click on media from triggering parent .project-item's click animation

                container.classList.toggle('zoomed');

                if (mediaElement.tagName === 'VIDEO') {
                    // Only control playback if it's not the Project 1 background video
                    // Project 1 video has 'autoplay loop' in HTML, so we might not want to manually pause/play it here
                    if (mediaElement.paused) {
                        mediaElement.play();
                    } else {
                        mediaElement.pause();
                    }
                }
            });
        }
    });
    // --- END NEW CODE ---


    // NEW: Add click animation to project items
    projectItems.forEach(item => {
        item.addEventListener('click', (event) => { // Added event parameter
            // Check if the click originated from the view website button or media, and if so, don't trigger this specific animation
            if (event.target.closest('.view-project-btn') || event.target.closest('.project-media')) {
                return; // Do nothing if button or media was clicked directly
            }

            // Prevent multiple animations if clicked rapidly
            if (!item.classList.contains('clicked')) {
                item.classList.add('clicked');

                setTimeout(() => {
                    item.classList.remove('clicked');
                }, 200); // 200 milliseconds = 0.2 seconds
            }
        });
    });
});