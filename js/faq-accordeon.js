/* ===================================
   ACORDEÓN FAQ - A&A Ingeniería
   =================================== */

const FAQAccordion = {
    init() {
        const details = document.querySelectorAll('details.group');

        details.forEach(detail => {
            const summary = detail.querySelector('summary');
            const icon = summary.querySelector('.rotate-icon, [class*="expand"]');

            // Agregar clase de transición al ícono si existe
            if (icon) {
                icon.style.transition = 'transform 300ms ease-in-out';
            }

            // Manejar el evento de toggle
            detail.addEventListener('toggle', () => {
                if (detail.open) {
                    // Cerrar otros acordeones si se desea comportamiento de "solo uno abierto"
                    // this.closeOthers(detail, details);

                    // Animar la apertura
                    this.animateOpen(detail);
                }
            });
        });
    },

    closeOthers(currentDetail, allDetails) {
        allDetails.forEach(detail => {
            if (detail !== currentDetail && detail.open) {
                detail.open = false;
            }
        });
    },

    animateOpen(detail) {
        const content = detail.querySelector('summary + *');
        if (content) {
            content.style.animation = 'fadeInUp 300ms ease-out';
        }
    }
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FAQAccordion.init());
} else {
    FAQAccordion.init();
}

// Exportar para uso global
window.FAQAccordion = FAQAccordion;