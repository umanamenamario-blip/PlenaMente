/* =======================================================
   CLUB INFANTIL PLENAMENTE — SCRIPT GENERAL DEL SITIO
   Este archivo se incluye en TODAS las páginas.
   Contiene dos comportamientos:
     1. Menú hamburguesa para móvil (abrir/cerrar navegación)
     2. Submenú desplegable de "Servicios"
   ======================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------
     1. MENÚ HAMBURGUESA (móvil)
     ----------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = primaryNav.getAttribute('data-open') === 'true';

      primaryNav.setAttribute('data-open', String(!isOpen));
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  /* -----------------------------------------------------
     2. SUBMENÚ DESPLEGABLE DE "SERVICIOS"
     Al hacer clic en "Servicios" se abre una lista con las
     4 subpáginas, en vez de navegar directamente.
     ----------------------------------------------------- */
  const serviciosToggle = document.getElementById('serviciosToggle');
  const serviciosItem = serviciosToggle ? serviciosToggle.closest('.primary-nav__item--dropdown') : null;

  if (serviciosToggle && serviciosItem) {
    serviciosToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      const isOpen = serviciosItem.getAttribute('data-open') === 'true';

      serviciosItem.setAttribute('data-open', String(!isOpen));
      serviciosToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Cerrar el submenú si el usuario hace clic en cualquier otra parte de la página
    document.addEventListener('click', function (event) {
      if (!serviciosItem.contains(event.target)) {
        serviciosItem.setAttribute('data-open', 'false');
        serviciosToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Cerrar el submenú con la tecla "Escape"
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        serviciosItem.setAttribute('data-open', 'false');
        serviciosToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* -----------------------------------------------------
     3. CARRUSEL DE IMÁGENES (banner de la página Nosotros)
     Cambia de diapositiva automáticamente cada 5 segundos
     y genera los puntos de navegación según la cantidad de
     diapositivas (.carousel__slide) que encuentre.
     ----------------------------------------------------- */
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
    const dotsContainer = carousel.querySelector('.carousel__dots');
    if (slides.length === 0) return;

    let currentIndex = slides.findIndex(function (slide) {
      return slide.classList.contains('is-active');
    });
    if (currentIndex === -1) currentIndex = 0;

    // Generar un punto por cada diapositiva
    let dots = [];
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      dots = slides.map(function (_, index) {
        const dot = document.createElement('button');
        dot.className = 'carousel__dot' + (index === currentIndex ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Ir a la imagen ' + (index + 1));
        dot.addEventListener('click', function () {
          goToSlide(index);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
        return dot;
      });
    }

    function goToSlide(index) {
      slides[currentIndex].classList.remove('is-active');
      dots[currentIndex] && dots[currentIndex].classList.remove('is-active');
      currentIndex = index;
      slides[currentIndex].classList.add('is-active');
      dots[currentIndex] && dots[currentIndex].classList.add('is-active');
    }

    function nextSlide() {
      goToSlide((currentIndex + 1) % slides.length);
    }

    let autoplayId = setInterval(nextSlide, 5000);

    function resetAutoplay() {
      clearInterval(autoplayId);
      autoplayId = setInterval(nextSlide, 5000);
    }
  });

  /* -----------------------------------------------------
     4. FORMULARIO DE CONTACTO (solo visual por ahora)
     Cuando definamos el servicio de envío de correos
     (EmailJS, Formspree, backend propio, etc.) el envío
     real se agrega aquí, dentro de este mismo listener.
     ----------------------------------------------------- */
  const contactoForm = document.getElementById('contactoForm');

  if (contactoForm) {
    contactoForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // TODO: reemplazar esta línea por el envío real cuando esté definido el servicio
      alert('¡Gracias por tu mensaje! (Formulario aún no conectado a un servicio de envío de correo)');

      contactoForm.reset();
    });
  }

});
