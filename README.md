# Pilates en Casa: Colección 28+ — Página de Ventas Completa

Página de ventas de alta conversión desarrollada para la oferta **Pilates en Casa: Colección 28+**, estructurada rigurosamente en las 10 secciones requeridas, en español neutro para América Latina y cumpliendo con todas las directrices de tono, cumplimiento publicitario y diseño visual.

---

## 📁 Estructura del Proyecto

```text
pilates-en-casa-28/
│
├── index.html                      # Estructura semántica completa con las 10 secciones
├── README.md                       # Documentación de configuración y despliegue
│
└── assets/
    ├── css/
    │   └── styles.css              # Paleta (sálvia, bosque, crema, melocotón), tipografía y diseño responsivo
    ├── js/
    │   └── main.js                 # Configuración centralizada, carrusel táctil, visor lightbox y acordeón FAQ
    └── images/
        ├── hero-collection.jpg     # Presentación visual destacada de la colección
        ├── woman-wall-pilates.jpg  # Fotografía natural de mujer adulta practicando en pared
        ├── carousel-cover.jpg      # Capa del reto de 28 días
        ├── carousel-calendar.jpg   # Calendario diario de planificación
        ├── carousel-exercise.jpg   # Página de ejercicios ilustrados con instrucciones
        ├── carousel-encyclopedia.png # Página de la enciclopedia (errores, variantes y adaptaciones)
        └── carousel-recipes.jpg    # Página de recetas de bienestar y consejos
```

---

## ⚙️ Cómo Configurar tus Enlaces y Parámetros

Toda la configuración se encuentra centralizada en las primeras líneas de `assets/js/main.js`:

```javascript
const CONFIG = {
  // 1. Reemplaza con tus enlaces directos de Hotmart u otra plataforma:
  checkout5usd: "https://pay.hotmart.com/[LINK_CHECKOUT_5_USD]",
  checkout9usd: "https://pay.hotmart.com/[LINK_CHECKOUT_9_USD]",   // Oferta especial modal al elegir Plan Esencial
  checkout15usd: "https://pay.hotmart.com/[LINK_CHECKOUT_15_USD]",

  // 2. Sección de testimonios (oculta por defecto para evitar pruebas sociales inventadas):
  // Cambia a 'true' cuando tengas testimonios reales y verificados de alumnas:
  showTestimonials: false,

  // 3. Enlaces legales del pie de página (si se dejan vacíos, se abren modales informativos integrados):
  privacyPolicyUrl: "",
  termsOfUseUrl: "",
  contactEmail: "soporte@pilatesencasa.com"
};
```

---

## 🎯 Cumplimiento de Directrices

1. **Lenguaje y Cumplimiento:**
   - Cero menciones de "PDF", "ebook", "libro digital" o "producto digital" en el contenido visible.
   - Enfoque en organización, reto, guías, ejercicios ilustrados y calendario diario.
   - Cero promesas falsas de adelgazamiento express, curas milagrosas o pérdida de grasa localizada.
   - Sin temporizadores ficticios ni presión artificial.

2. **Oferta Principal vs. Oferta de Entrada:**
   - **Colección Completa (US$ 15)**: Oferta principal resaltada visualmente (borde bosque, sombra elegante, insignia superior). Incluye el reto de 28 días + las 3 guías adicionales. Pago único.
   - **Plan Esencial (US$ 5)**: Alternativa de entrada con el reto de 28 días, instrucciones ilustradas y calendario diario. Pago único.

3. **Interactividad:**
   - **Carrusel**: Navegación por swipe táctil en móvil, flechas prev/next, puntos indicadores y ampliación en pantalla completa (lightbox modal).
   - **Acordeón FAQ**: Respuestas desplegables suaves y accesibles.
   - **Navegación fluida**: Botones de llamada a la acción con desplazamiento suave automático hacia `#ofertas`.

---

## 🚀 Cómo Visualizar o Publicar

- **En local**: Abre el archivo `index.html` directamente en tu navegador (Chrome, Edge, Safari, Firefox).
- **En hosting (Hotmart Pages, Hostinger, Vercel, Netlify, cPanel)**: Sube la carpeta completa manteniendo la estructura relativa de carpetas.
