document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = mobileMenu.querySelector('.closebtn');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    // --- Hamburger Menu Logic ---
    function openNav() {
        mobileMenu.style.width = "100%";
    }

    function closeNav() {
        mobileMenu.style.width = "0%";
    }

    menuIcon.onclick = openNav;
    closeBtn.onclick = closeNav;

    // Close the mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // --- Active Link on Scroll Logic ---
    window.onscroll = () => {
        let current = '';

        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 70; // Offset by header height
            const sectionHeight = sec.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Add sticky effect to header on scroll (optional, but good practice)
        const header = document.querySelector('.header');
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
});