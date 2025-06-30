// ローディング画面の制御
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1500);
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// パララックス効果
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// 数値カウントアップアニメーション
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseFloat(entry.target.getAttribute('data-target'));
            const decimals = target % 1 !== 0 ? 1 : 0;
            animateCounter(entry.target, target, decimals);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
    countUpObserver.observe(counter);
});

function animateCounter(element, target, decimals) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current.toFixed(decimals);
    }, 20);
}

// スクロールアニメーション
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// 各要素にアニメーションを適用
const animateElements = document.querySelectorAll('.problem-card, .solution-item, .testimonial-card, .timeline-item');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    animationObserver.observe(element);
});

// マウス追従エフェクト
const heroSection = document.querySelector('.hero');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

function animateHeroBackground() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    const moveX = (currentX / heroSection.offsetWidth - 0.5) * 20;
    const moveY = (currentY / heroSection.offsetHeight - 0.5) * 20;
    
    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroOverlay) {
        heroOverlay.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    requestAnimationFrame(animateHeroBackground);
}

animateHeroBackground();

// タイムラインアニメーション
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    timelineObserver.observe(item);
});

// CTAボタンのホバーエフェクト
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// スクロールに応じてヘッダーの背景を変更（将来的な実装用）
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// フォームの送信処理（将来的な実装用）
document.querySelectorAll('.final-cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // 申し込みページへ遷移
        window.location.href = 'https://nori-cm.com/p/r/lWjuFMhX';
    });
});

// パフォーマンス最適化：スクロールイベントのスロットリング
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// リサイズイベントの最適化
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // リサイズ完了後の処理
        updateParallax();
    }, 250);
});

// ページ離脱時のアニメーション
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
});