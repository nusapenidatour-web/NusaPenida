document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // Fungsionalitas Navigasi dan Tabs
    // ------------------------------------

    // Smooth scrolling untuk navigasi
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 80, // Offset agar tidak tertutup header
                behavior: 'smooth'
            });
        });
    });

    // Fungsionalitas Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus kelas 'active' dari semua tombol dan konten
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Tambahkan kelas 'active' ke tombol yang diklik
            button.classList.add('active');

            // Tampilkan konten yang sesuai
            const targetTabId = button.dataset.tab;
            document.getElementById(targetTabId).classList.add('active');
        });
    });
    
    // Fungsionalitas Menu Hamburger yang baru ditambahkan
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // ------------------------------------
    // Fungsionalitas Pop-up Detail Paket
    // ------------------------------------

    // Objek untuk menyimpan detail setiap paket tour
    const packageDetails = {
        'broken-beach': {
            title: 'Broken Beach Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'angels-billabong': {
            title: 'Angels Billabong Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'crystal-bay': {
            title: 'Crystal Bay Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'paluwang-cliff': {
            title: 'Paluwang Cliff Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'klingking-cliff': {
            title: 'Klingking Cliff Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'atuh-beach': {
            title: 'Atuh Beach Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'diamond-beach': {
            title: 'Diamond Beach Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'raja-lima': {
            title: 'Raja Lima Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'tree-house': {
            title: 'Tree House Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'bukit-teletubbies': {
            title: 'Bukit Teletubbies Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'west-nusa-penida-tour': {
            title: 'West Nusa Penida Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'east-nusa-penida-tour': {
            title: 'East Nusa Penida Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'west-east-combination-tour': {
            title: 'West + East Tour Combination',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        },
        'west-nusa-penida-snorkeling': {
            title: 'West Nusa Penida + Snorkeling Tour',
            includes: [
                'Tiket Fast Boat PP (Sanur - Nusa Penida)',
                'Sopir sebagai Guide',
                'Bantuan dokumentasi selama trip',
                'Transportasi di Nusa Penida',
                'Tiket parkir di semua destinasi',
            ],
            excludes: [
                'Retribusi & tiket spot foto (Diamond Beach, Tree House, Paluang Cliff)',
                'Makan Siang'
            ]
        }
    };

    const modal = document.getElementById("modalDetailPaket");
    const modalContent = document.getElementById("popup-content");
    // Mengubah selektor untuk mendengarkan klik pada tombol detail kecil
    const allDetailButtons = document.querySelectorAll(".btn-detail-small"); 
    const closeBtn = document.querySelector(".close-btn");

    function showPopup(packageId) {
        const data = packageDetails[packageId];
        if (data) {
            let includesHtml = data.includes.map(item => `<li>✅ ${item}</li>`).join('');
            let excludesHtml = data.excludes.map(item => `<li>❌ ${item}</li>`).join('');

            modalContent.innerHTML = `
                <h2>${data.title}</h2>
                <div class="info-section">
                    <h3>Include:</h3>
                    <ul>${includesHtml}</ul>
                </div>
                <div class="info-section exclude">
                    <h3>Exclude:</h3>
                    <ul>${excludesHtml}</ul>
                </div>
            `;
            modal.classList.add('active');
        }
    }

    allDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageId = this.getAttribute('data-package-id');
            showPopup(packageId);
        });
    });

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.classList.remove('active');
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('active');
        }
    }

    console.log('Website Urban Bali Tour siap dengan fungsionalitas lengkap!');
});