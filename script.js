// ============================================
// MENU MOBILE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Mettre à jour le lien actif
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ============================================
// SCROLLING ACTIF DU MENU
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PANIER D'ACHAT
// ============================================

let cart = [];

function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    showNotification(`${productName} ajouté au panier !`);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

// Ajouter des événements aux boutons du panier
document.querySelectorAll('.btn-cart').forEach((btn, index) => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-info h3').textContent;
        const priceText = productCard.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('€', '').trim());
        
        addToCart(productName, price);
    });
});

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// FORMULAIRE DE NEWSLETTER
// ============================================

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simuler l'envoi
        newsletterForm.querySelector('input[type="email"]').value = '';
        showNotification(`✓ Merci ! Vous êtes abonné avec ${email}`);
    });
}

// ============================================
// FORMULAIRE DE CONTACT
// ============================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simuler l'envoi
        console.log('Message envoyé:', { name, email, message });
        
        // Réinitialiser le formulaire
        contactForm.reset();
        showNotification('✓ Votre message a été envoyé avec succès !');
    });
}

// ============================================
// EFFETS AU SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les cartes produits et galerie
document.querySelectorAll('.product-card, .gallery-item, .blog-card').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// Ajouter l'animation fadeInUp
const fadeInUpStyle = document.createElement('style');
fadeInUpStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInUpStyle);

// ============================================
// FONCTIONNALITÉS ADDITIONNELLES
// ============================================

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Charger le panier depuis localStorage
window.addEventListener('load', () => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
});

// ============================================
// GALERIE INTERACTIVE
// ============================================

document.querySelectorAll('.gallery-item, .blog-card').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
    
    item.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        showNotification(`📸 ${title} - Vue agrandie`);
    });
});

// ============================================
// ANIMATIONS DE COMPTEURS
// ============================================

function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(currentValue) + '+';
            }
        }, 30);
    });
}

// Déclencher l'animation quand la section est visible
const statsSection = document.querySelector('.about');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            statsObserver.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

console.log('✓ Site chargé avec succès !');