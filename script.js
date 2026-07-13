// Responsive Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate burger menu icon
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Dynamic Active Navigation Highlight on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Offset logic ensures changes activate slightly early when scrolling down
        if (pageYOffset >= (sectionTop - varHeight())) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(currentSection)) {
            item.classList.add('active');
        }
    });
});

function varHeight() {
    return window.innerWidth <= 768 ? 80 : 150;
}
// --- Contact Form Handling via AJAX ---
const form = document.getElementById('portfolio-form');
const result = document.getElementById('form-result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    result.style.display = "block";
    result.style.color = "var(--text-muted)";
    result.innerHTML = "Sending your message...";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
                result.style.color = "#4ade80"; // Success Green
                result.innerHTML = "Message sent successfully!";
                form.reset();
            } else {
                console.log(response);
                result.style.color = "#f87171"; // Error Red
                result.innerHTML = res.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.style.color = "#f87171";
            result.innerHTML = "Something went wrong. Please try again later.";
        })
        .then(function() {
            // Hide the status message after 5 seconds
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
});