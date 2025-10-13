/* ===================================
   JAVASCRIPT PRINCIPAL - A&A Ingeniería
   =================================== */

// Configuración de Tailwind
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    primary: "#14b84b",
                    "background-light": "#f6f8f6",
                    "background-dark": "#112116",
                },
                fontFamily: {
                    display: ["Work Sans"],
                },
                borderRadius: {
                    DEFAULT: "0.25rem",
                    lg: "0.5rem",
                    xl: "0.75rem",
                    full: "9999px"
                },
            },
        },
    };
}

// Detección y aplicación del tema (claro/oscuro)
const ThemeManager = {
    init() {
        // Verificar preferencia guardada o del sistema
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
        }

        // Escuchar cambios en la preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        });
    },

    toggle() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
};

// Manejo de formularios
const FormHandler = {
    // Validación de formulario de contacto
    validateContactForm(formData) {
        const errors = [];

        if (!formData.get('nombre') || formData.get('nombre').trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }

        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.push('Por favor ingresa un correo electrónico válido');
        }

        const telefono = formData.get('telefono');
        if (!telefono || telefono.trim().length < 9) {
            errors.push('Por favor ingresa un teléfono válido');
        }

        const mensaje = formData.get('mensaje');
        if (!mensaje || mensaje.trim().length < 10) {
            errors.push('El mensaje debe tener al menos 10 caracteres');
        }

        return errors;
    },

    // Enviar formulario (simulado)
    submitForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const errors = this.validateContactForm(formData);

        if (errors.length > 0) {
            alert('Por favor corrige los siguientes errores:\n\n' + errors.join('\n'));
            return false;
        }

        // Simulación de envío exitoso
        alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
        form.reset();
        return true;
    }
};

// Utilidades generales
const Utils = {
    // Scroll suave a un elemento
    smoothScrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    // Formatear precio
    formatPrice(price) {
        return `S/ ${price.toFixed(2)}`;
    },

    // Lazy loading de imágenes
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

// WhatsApp Integration
const WhatsApp = {
    phoneNumber: '+51932588157',

    openChat(message = '') {
        const encodedMessage = encodeURIComponent(message || 'Hola, me interesa obtener más información sobre sus servicios.');
        const url = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
    }
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar tema
    ThemeManager.init();

    // Lazy loading de imágenes
    Utils.lazyLoadImages();

    // Configurar formulario de contacto si existe
    const contactForm = document.querySelector('form');
    if (contactForm && window.location.pathname.includes('contacto')) {
        contactForm.addEventListener('submit', (e) => FormHandler.submitForm(e));
    }

    // Configurar botón de WhatsApp flotante
    const whatsappButton = document.querySelector('.floating-button, footer button[class*="whatsapp"]');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', (e) => {
            e.preventDefault();
            WhatsApp.openChat();
        });
    }

    // Manejar enlaces de navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            Utils.smoothScrollTo(targetId);
        });
    });
});

// Exportar para uso global
window.AAIngenieria = {
    ThemeManager,
    FormHandler,
    Utils,
    WhatsApp
};

// Carrusel

const images = document.querySelectorAll('.carousel-images img');
let current = 0;

function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}

document.querySelector('.next').addEventListener('click', () => {
    current = (current + 1) % images.length;
    showImage(current);
});

document.querySelector('.prev').addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
});

// Inicializa el carrusel
showImage(current);