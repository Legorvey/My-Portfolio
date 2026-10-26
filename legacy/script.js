const filterBtns = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('.filter-item');
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            filterItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if(filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hide-project');
                } else {
                    item.classList.add('hide-project');
                }
            });
        });
    });
}
const contactForm = document.querySelector('.saas-form');
const submitBtn = document.querySelector('.btn-submit');
if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Transmitting...'; 
        submitBtn.style.opacity = '0.7';
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            if (response.status == 200) {
                submitBtn.innerText = 'Transmission Successful ✅';
                submitBtn.style.background = '#10b981';
                submitBtn.style.color = '#0a0a0a';
                submitBtn.style.opacity = '1';
                contactForm.reset(); 
            } else {
                submitBtn.innerText = 'Transmission Failed ❌';
                submitBtn.style.background = '#ef4444';
                submitBtn.style.color = '#fff';
            }
        })
        .catch(error => {
            console.log(error);
            submitBtn.innerText = 'System Error';
            submitBtn.style.background = '#ef4444';
            submitBtn.style.color = '#fff';
        })
        .then(function() {
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.style.opacity = '1';
            }, 4000);
        });
    });
}
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error("Failed to load footer:", error);
            });
    }
});
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksDropdown = document.querySelector('.nav-links');
if (mobileMenuBtn && navLinksDropdown) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        navLinksDropdown.classList.toggle('open');
    });
    const dropdownNavItems = document.querySelectorAll('.nav-item');
    dropdownNavItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('open');
            navLinksDropdown.classList.remove('open');
        });
    });
}
const scrollSections = document.querySelectorAll('.saas-section, .command-center');
const spyNavItems = document.querySelectorAll('.nav-item');
if (scrollSections.length > 0 && spyNavItems.length > 0) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 // Trigger when 40% of the section is visible
    };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                spyNavItems.forEach(item => {
                    item.classList.remove('active-nav');
                });
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active-nav');
                }
            }
        });
    }, observerOptions);
    scrollSections.forEach(section => {
        sectionObserver.observe(section);
    });
}
