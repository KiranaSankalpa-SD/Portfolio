// ---------- Responsive Mobile Menu Toggle ----------
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

function setMenuIcon(isOpen) {
    // Replace the icon each time so it also works with Font Awesome's JS version
    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
}

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    setMenuIcon(navLinks.classList.contains('active'));
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        setMenuIcon(false);
    });
});

// ---------- Active nav link + scroll progress bar ----------
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
const progressBar = document.getElementById('scroll-progress');

function varHeight() {
    return window.innerWidth <= 768 ? 80 : 150;
}

window.addEventListener('scroll', () => {
    // Highlight the link of the section currently on screen
    let currentSection = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - varHeight()) {
            currentSection = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === '#' + currentSection);
    });

    // Fill the progress bar at the top
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + '%';
});

// ---------- Typing effect in the hero ----------
const typingEl = document.getElementById('typing');
const roles = ['Full-Stack Developer', 'Java Developer', 'Android Developer', 'Web Developer'];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const word = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typingEl.textContent = word.substring(0, charIndex);

    let delay = deleting ? 40 : 90;

    if (!deleting && charIndex === word.length) {
        delay = 1800;            // pause when the word is complete
        deleting = true;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }
    setTimeout(type, delay);
}
// Start after the hero text has faded in
setTimeout(() => { typingEl.textContent = ''; type(); }, 2200);

// ---------- Reveal elements when they scroll into view ----------
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            revealObserver.unobserve(entry.target);   // animate only once
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------- Contact Form Handling via AJAX ----------
const form = document.getElementById('portfolio-form');
const result = document.getElementById('form-result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));

    result.style.display = "block";
    result.style.color = "var(--text-muted)";
    result.innerHTML = "Sending your message...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
    })
        .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
                result.style.color = "#4ade80";
                result.innerHTML = "Message sent successfully!";
                form.reset();
            } else {
                console.log(response);
                result.style.color = "#f87171";
                result.innerHTML = res.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.style.color = "#f87171";
            result.innerHTML = "Something went wrong. Please try again later.";
        })
        .then(function () {
            setTimeout(() => { result.style.display = "none"; }, 5000);
        });
});