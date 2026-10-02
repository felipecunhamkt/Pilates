/**
 * PILATES EN CASA: COLECCIÓN 28+
 * Script principal de interacción y configuración
 */

// ==========================================================================
// CONFIGURACIÓN CENTRALIZADA
// Modifica los enlaces de checkout y parámetros de la página fácilmente aquí.
// ==========================================================================
const CONFIG = {
  // Enlaces de pago directo (Reemplazar con tus enlaces reales de Hotmart / pasarela)
  checkout5usd: "https://pay.hotmart.com/W107849464K?off=hq7seeh4",
  checkout9usd: "https://pay.hotmart.com/W107849464K?off=3835a48a",
  checkout15usd: "https://pay.hotmart.com/W107849464K?off=ddjzsqpq",

  // Mostrar u ocultar sección de testimonios (Oculta por defecto según directriz)
  // Cambiar a 'true' cuando se disponga de testimonios reales verificados.
  showTestimonials: true,

  // Enlaces del pie de página (Si se dejan vacíos "", se abrirá un modal informativo limpio)
  privacyPolicyUrl: "",
  termsOfUseUrl: "",
  contactEmail: "soporte@pilatesencasa.com"
};

document.addEventListener("DOMContentLoaded", () => {
  initCheckoutLinks();
  initUpsellModal();
  initTestimonialsVisibility();
  initCarousel();
  initLightbox();
  initFaqAccordion();
  initLegalModals();
  initSmoothScroll();
});

/**
 * 1. Inicializa los botones de compra con los enlaces de configuración
 */
function initCheckoutLinks() {
  const btnEsencial = document.querySelectorAll("[data-checkout='5']");
  const btnOferta9 = document.querySelectorAll("[data-checkout='9']");
  const btnCompleta = document.querySelectorAll("[data-checkout='15']");

  btnEsencial.forEach(btn => {
    btn.setAttribute("href", CONFIG.checkout5usd);
  });

  btnOferta9.forEach(btn => {
    btn.setAttribute("href", CONFIG.checkout9usd);
  });

  btnCompleta.forEach(btn => {
    btn.setAttribute("href", CONFIG.checkout15usd);
  });
}

/**
 * 2. Control del Modal de Oferta Especial (Upsell US$ 9) al hacer clic en 'Elegir Plan Esencial'
 */
function initUpsellModal() {
  const modal = document.getElementById("upsellModal");
  const openButtons = document.querySelectorAll(".btn-open-upsell, #btnPlanEsencial");
  const closeBtn = document.getElementById("upsellClose");
  const declineLink = document.getElementById("btnUpsellDecline");

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  openButtons.forEach(btn => {
    btn.addEventListener("click", openModal);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (declineLink) {
    declineLink.addEventListener("click", () => {
      closeModal();
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/**
 * 2. Control de visibilidad de testimonios y soporte de avatares
 */
function initTestimonialsVisibility() {
  const testimonialsSection = document.getElementById("seccion-testimonios");
  if (testimonialsSection) {
    if (!CONFIG.showTestimonials) {
      testimonialsSection.style.display = "none";
    } else {
      testimonialsSection.style.display = "block";
    }
  }

  // Soporte dinámico para fotos de testimonios con fallback automático al icono de cámara
  document.querySelectorAll(".testimonial-avatar-wrap").forEach(wrap => {
    const img = wrap.querySelector(".testimonial-avatar-img");
    const placeholder = wrap.querySelector(".testimonial-camera-placeholder");
    if (img && placeholder) {
      const src = img.getAttribute("src");
      if (src && src.trim() !== "") {
        img.style.display = "block";
        placeholder.style.display = "none";
      } else {
        img.style.display = "none";
        placeholder.style.display = "flex";
      }

      img.addEventListener("error", () => {
        img.style.display = "none";
        placeholder.style.display = "flex";
      });

      img.addEventListener("load", () => {
        img.style.display = "block";
        placeholder.style.display = "none";
      });
    }
  });
}

/**
 * 3. Carrossel interactivo con soporte táctil (touch/swipe), flechas y puntos
 */
let currentSlideIndex = 0;
let totalSlides = 5;

function initCarousel() {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const dotsContainer = document.getElementById("carouselDots");
  const slides = document.querySelectorAll(".carousel-slide");

  if (!track || slides.length === 0) return;
  totalSlides = slides.length;

  // Crear dots
  dotsContainer.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
    dot.setAttribute("aria-label", `Ver diapositiva ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function getVisibleSlidesCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 680) return 2;
    return 1;
  }

  function getMaxIndex() {
    const visible = getVisibleSlidesCount();
    return Math.max(0, totalSlides - visible);
  }

  function updateCarousel() {
    const visible = getVisibleSlidesCount();
    const maxIdx = getMaxIndex();
    if (currentSlideIndex > maxIdx) currentSlideIndex = maxIdx;
    if (currentSlideIndex < 0) currentSlideIndex = 0;

    const slideWidthPercent = 100 / visible;
    track.style.transform = `translateX(-${currentSlideIndex * slideWidthPercent}%)`;

    // Actualizar dots
    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((d, idx) => {
      d.classList.toggle("active", idx === currentSlideIndex);
    });
  }

  function goToSlide(index) {
    currentSlideIndex = index;
    updateCarousel();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const maxIdx = getMaxIndex();
      currentSlideIndex = currentSlideIndex > 0 ? currentSlideIndex - 1 : maxIdx;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const maxIdx = getMaxIndex();
      currentSlideIndex = currentSlideIndex < maxIdx ? currentSlideIndex + 1 : 0;
      updateCarousel();
    });
  }

  window.addEventListener("resize", updateCarousel);

  // Soporte táctil / touch swipe
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  track.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", () => {
    if (!isSwiping) return;
    isSwiping = false;
    const diff = startX - currentX;
    const threshold = 40;

    if (Math.abs(diff) > threshold) {
      const maxIdx = getMaxIndex();
      if (diff > 0) {
        // Swipe izquierda -> siguiente
        currentSlideIndex = currentSlideIndex < maxIdx ? currentSlideIndex + 1 : 0;
      } else {
        // Swipe derecha -> anterior
        currentSlideIndex = currentSlideIndex > 0 ? currentSlideIndex - 1 : maxIdx;
      }
      updateCarousel();
    }
  });

  updateCarousel();
}

/**
 * 4. Lightbox Modal para ampliación de imágenes
 */
function initLightbox() {
  const modal = document.getElementById("lightboxModal");
  const modalImg = document.getElementById("lightboxImg");
  const modalCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const cards = document.querySelectorAll(".slide-card");

  if (!modal || !modalImg) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.querySelector(".slide-title")?.innerText || "";
      const desc = card.querySelector(".slide-desc")?.innerText || "";

      if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.innerText = `${title} — ${desc}`;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/**
 * 5. Acordeón accesible para Preguntas Frecuentes
 */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const btn = item.querySelector(".faq-question-btn");
    const answer = item.querySelector(".faq-answer");

    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Cerrar otros acordeones si se desea comportamiento único
      items.forEach(other => {
        if (other !== item && other.classList.contains("active")) {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question-btn");
          const otherAns = other.querySelector(".faq-answer");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle actual
      if (isOpen) {
        item.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + 30 + "px";
      }
    });
  });
}

/**
 * 6. Modales informativos para Enlaces de Pie de Página
 */
function initLegalModals() {
  const modal = document.getElementById("infoModal");
  const titleElem = document.getElementById("infoModalTitle");
  const bodyElem = document.getElementById("infoModalBody");
  const closeBtn = document.getElementById("infoModalClose");

  if (!modal) return;

  const legalContent = {
    privacidad: {
      title: "Política de Privacidad",
      body: "<p>Valoramos y respetamos tu privacidad. Tus datos personales son tratados con estricta confidencialidad y utilizados únicamente para gestionar tu acceso a los materiales educativos adquiridos.</p><p style='margin-top:12px;'>No compartimos, vendemos ni distribuimos tu información a terceros no autorizados. Para cualquier consulta o ejercicio de tus derechos, contáctanos en nuestro correo oficial.</p>"
    },
    terminos: {
      title: "Términos de Uso",
      body: "<p>Los materiales de 'Pilates en Casa: Colección 28+' están destinados a uso estrictamente personal y no comercial. Queda prohibida la reproducción, distribución o reventa no autorizada.</p><p style='margin-top:12px;'>El contenido tiene fines educativos y de bienestar general. Cada usuario es responsable de practicar dentro de sus propios límites físicos y consultar a su médico ante cualquier duda de salud previa.</p>"
    },
    contacto: {
      title: "Contacto y Soporte",
      body: `<p>¿Tienes dudas sobre los planes o necesitas asistencia con tu compra?</p><p style='margin-top:12px;'>Escríbenos a nuestro equipo de soporte en:<br><strong>${CONFIG.contactEmail}</strong></p><p style='margin-top:12px;'>Horario de atención: Lunes a Viernes de 9:00 a 18:00 (GMT-4). Responderemos tu consulta a la brevedad posible.</p>`
    }
  };

  function openLegalModal(type) {
    const data = legalContent[type];
    if (data) {
      titleElem.innerText = data.title;
      bodyElem.innerHTML = data.body;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeLegalModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  const linkPriv = document.getElementById("linkPrivacidad");
  const linkTerm = document.getElementById("linkTerminos");
  const linkCont = document.getElementById("linkContacto");

  if (linkPriv) {
    linkPriv.addEventListener("click", (e) => {
      if (!CONFIG.privacyPolicyUrl) {
        e.preventDefault();
        openLegalModal("privacidad");
      } else {
        linkPriv.href = CONFIG.privacyPolicyUrl;
      }
    });
  }

  if (linkTerm) {
    linkTerm.addEventListener("click", (e) => {
      if (!CONFIG.termsOfUseUrl) {
        e.preventDefault();
        openLegalModal("terminos");
      } else {
        linkTerm.href = CONFIG.termsOfUseUrl;
      }
    });
  }

  if (linkCont) {
    linkCont.addEventListener("click", (e) => {
      e.preventDefault();
      openLegalModal("contacto");
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLegalModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLegalModal();
  });
}

/**
 * 7. Desplazamiento suave para enlaces ancla
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    });
  });
}
