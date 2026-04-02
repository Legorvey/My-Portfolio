// =========================================
// 1. PROJECTS ARCHIVE: LIVE FILTER
// =========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('.filter-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            filterBtns.forEach(b => b.classList.remove('active'));
            // Tambahin active ke tombol yang diklik
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Loop semua item project
            filterItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Logika Filter
                if(filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hide-project');
                } else {
                    item.classList.add('hide-project');
                }
            });
        });
    });
}

// =========================================
// 2. CONTACT FORM AJAX SUBMISSION
// =========================================
const contactForm = document.querySelector('.saas-form');
const submitBtn = document.querySelector('.btn-submit');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah halaman reload
        
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Transmitting...'; 
        submitBtn.style.opacity = '0.7';

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            if (response.status == 200) {
                // Sukses
                submitBtn.innerText = 'Transmission Successful ✅';
                submitBtn.style.background = '#10b981'; // Ijo Live
                submitBtn.style.color = '#0a0a0a';
                submitBtn.style.opacity = '1';
                contactForm.reset(); 
            } else {
                // Gagal API
                submitBtn.innerText = 'Transmission Failed ❌';
                submitBtn.style.background = '#ef4444'; // Merah Error
                submitBtn.style.color = '#fff';
            }
        })
        .catch(error => {
            // Gagal Koneksi
            console.log(error);
            submitBtn.innerText = 'System Error';
            submitBtn.style.background = '#ef4444';
            submitBtn.style.color = '#fff';
        })
        .then(function() {
            // Balikin tombol ke semula setelah 4 detik
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.style.opacity = '1';
            }, 4000);
        });
    });
}

// =========================================
// 3. READING PROGRESS BAR
// =========================================
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});