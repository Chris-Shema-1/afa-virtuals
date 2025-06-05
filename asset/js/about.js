// about.js - Interactivity & Animations for About Page

document.addEventListener('DOMContentLoaded', function () {
    // Certificate Modal Logic
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-certificate-img');
    const modalTitle = document.getElementById('modal-certificate-title');
    const modalDesc = document.getElementById('modal-certificate-desc');
    const closeModal = document.querySelector('.close-modal');

    const certificates = {
        emmanuel: {
            img: '/asset/img/va-cirtificate.jpg',
            title: 'ALX Virtual Assistant Certificate',
            desc: 'Afanyu Emmanuel is officially certified by ALX for excellence in virtual assistance, administrative support, and tech solutions.'
        },
        christian: {
            img: '/asset/img/va-chris.png',
            title: 'ALX Virtual Assistant Certificate',
            desc: 'Shema Christian is officially certified by ALX for virtual assistance, software engineering, and creative design.'
        },
        gillian: {
            img: '/asset/img/va-gill.jpg',
            title: 'ALX Virtual Assistant Certificate',
            desc: 'Binyu Gillian is officially certified by ALX for social media management, creative direction, and professional virtual assistance.'
        }
    };

    document.querySelectorAll('.view-certificate-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const certKey = this.getAttribute('data-certificate');
            const cert = certificates[certKey];
            if (cert) {
                modalImg.src = cert.img;
                modalTitle.textContent = cert.title;
                modalDesc.textContent = cert.desc;
                modal.classList.add('active');
            }
        });
    });
    closeModal.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Reveal Animations for Value Cards
    function revealOnScroll() {
        document.querySelectorAll('.value-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                card.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Animate Skills Bars
    function animateSkills() {
        document.querySelectorAll('.animated-bar').forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                bar.classList.add('visible');
                const per = bar.querySelector('.skill-per').getAttribute('per');
                bar.querySelector('.skill-per').style.width = per + '%';
            }
        });
    }
    window.addEventListener('scroll', animateSkills);
    animateSkills();

    // Interactive Card Hover (optional 3D effect)
    document.querySelectorAll('.interactive-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 18;
            const rotateY = (x - centerX) / 18;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        });
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    // Reveal Animations for Awesome Cards (reuse logic)
    function revealAwesomeCards() {
        document.querySelectorAll('.awesome-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                card.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealAwesomeCards);
    revealAwesomeCards();

    // Reveal Animations for Fun Fact Cards
    function revealFunFactCards() {
        document.querySelectorAll('.fun-fact-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                card.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealFunFactCards);
    revealFunFactCards();
});
