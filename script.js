// ===== ملف JavaScript الرئيسي =====

// تفعيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeGoldMenu();
    initializeMobileMenu();
    initializeFilters();
    initializeSmoothScroll();
    setActiveNavigation();
});

// ===== التنقل =====
function initializeNavigation() {
    // تحديث الروابط النشطة
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .gold-menu-item');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const pages = {
        'index.html': 0,
        'about.html': 1,
        'learning.html': 2,
        'portfolio.html': 3
    };
    
    // تحديث القائمة الذهبية
    const goldMenuLinks = document.querySelectorAll('.gold-menu-item');
    goldMenuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // تحديث شريط التنقل
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== القائمة الذهبية =====
function initializeGoldMenu() {
    const goldMenuBtn = document.getElementById('goldMenuBtn');
    const goldMenu = document.getElementById('goldMenu');
    
    if (!goldMenuBtn || !goldMenu) return;
    
    goldMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        goldMenu.classList.toggle('active');
        goldMenuBtn.classList.toggle('active');
    });
    
    // إغلاق عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!goldMenu.contains(e.target) && !goldMenuBtn.contains(e.target)) {
            goldMenu.classList.remove('active');
            goldMenuBtn.classList.remove('active');
        }
    });
    
    // إغلاق بـ ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            goldMenu.classList.remove('active');
            goldMenuBtn.classList.remove('active');
        }
    });
}

// ===== القائمة المتنقلة =====
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // إغلاق عند النقر على رابط
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
}

// ===== تصفية المشاريع =====
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشط للزر المحدد
            this.classList.add('active');
            
            // الحصول على قيمة التصفية
            const filterValue = this.getAttribute('data-filter');
            
            // تصفية العناصر
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== التمرير السلس =====
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== تأثير التمرير =====
window.addEventListener('scroll', function() {
    const toolbar = document.querySelector('.toolbar');
    if (window.scrollY > 100) {
        toolbar.style.background = 'rgba(11, 26, 54, 0.95)';
        toolbar.style.backdropFilter = 'blur(10px)';
    } else {
        toolbar.style.background = 'linear-gradient(90deg, #0b1a36, #132b54)';
        toolbar.style.backdropFilter = 'none';
    }
});
