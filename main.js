/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
    const menuBtn = document.getElementById("myNavMenu");
    const closeBtn = document.querySelector(".close-btn");

    // Alterna la clase 'responsive' en el menú
    menuBtn.classList.toggle("responsive");

    // Cambiar la visibilidad del botón de cerrar
    if (menuBtn.classList.contains("responsive")) {
        closeBtn.style.display = "block"; // Muestra la "X" cuando el menú está abierto
    } else {
        closeBtn.style.display = "none"; // Oculta la "X" cuando el menú está cerrado
    }
}


/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () {
    headerShadow();
};

function headerShadow() {
    const navHeader = document.getElementById("header");

    if (!navHeader) return; // Verifica si el elemento existe

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
        navHeader.style.height = "70px";
        navHeader.style.lineHeight = "70px";
    } else {
        navHeader.style.boxShadow = "none";
        navHeader.style.height = "90px";
        navHeader.style.lineHeight = "90px";
    }
}

/* ----- TYPING EFFECT ----- */
if (typeof Typed !== "undefined") {
    new Typed(".typedText", {
        strings: ["Agrupación", "Artistas", "Hermandad"],
        loop: true,
        typeSpeed: 100,
        backSpeed: 80,
        backDelay: 2000,
        cursorChar: "✨🎼"  // Cambia el caret por un punto
    });
}

/* ----- SCROLL REVEAL ANIMATION ----- */
if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
        origin: "top",
        distance: "80px",
        duration: 2000,
        reset: true,
    });

    // Home
    sr.reveal(".featured-text-card", {});
    sr.reveal(".featured-name", { delay: 100 });
    sr.reveal(".featured-text-info", { delay: 200 });
    sr.reveal(".featured-text-btn", { delay: 200 });
    sr.reveal(".social_icons", { delay: 300 });
    sr.reveal(".featured-image", { delay: 300 });

    // Project Box
    sr.reveal(".project-box", { interval: 200 });

    // Headings
    sr.reveal(".top-header", {});

    // Left and Right Animations
    const srLeft = ScrollReveal({
        origin: "left",
        distance: "80px",
        duration: 2000,
        reset: true,
    });


    srLeft.reveal(".about-info", { delay: 100 });
    srLeft.reveal(".contact-info", { delay: 100 });
    srLeft.reveal(".music-section", { delay: 100 });

    const srRight = ScrollReveal({
        origin: "right",
        distance: "80px",
        duration: 2000,
        reset: true,
    });

    srRight.reveal(".skills-box", { delay: 100 });
    srRight.reveal(".video-slider", { delay: 100 });
    srRight.reveal(".music-gallery", { delay: 100 });
    srRight.reveal(".form-control", { delay: 100 });
    srRight.reveal(".video-section", { delay: 100 });

}

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {
            document
                .querySelector(`.nav-menu a[href*=${sectionId}]`)
                ?.classList.add("active-link");
        } else {
            document
                .querySelector(`.nav-menu a[href*=${sectionId}]`)
                ?.classList.remove("active-link");
        }
    });
}

window.addEventListener("scroll", scrollActive);

document.addEventListener("DOMContentLoaded", function () {
    const maxWords = 100; // Límite de palabras para el resumen

    // Seleccionar todos los elementos con la clase "about-text"
    const aboutTextElements = document.querySelectorAll(".about-text");

    aboutTextElements.forEach(aboutText => {
        const readMoreBtn = aboutText.nextElementSibling; // Botón asociado al texto
        const fullText = aboutText.getAttribute("data-full-text") || aboutText.getAttribute("data-full-txt");

        // Validar si existe texto completo
        if (!fullText) {
            console.error("No se encontró texto en los atributos 'data-full-text' o 'data-full-txt'.");
            return;
        }

        // Dividir el texto completo en palabras
        const words = fullText.split(" ");

        // Si el texto excede el límite de palabras
        if (words.length > maxWords) {
            aboutText.textContent = words.slice(0, maxWords).join(" ") + "...";
            readMoreBtn.style.display = "inline-block"; // Mostrar botón "Leer más"

            // Agregar evento al botón
            readMoreBtn.addEventListener("click", function () {
                const isExpanded = aboutText.classList.toggle("expanded");
                aboutText.textContent = isExpanded ? fullText : words.slice(0, maxWords).join(" ") + "...";
                readMoreBtn.textContent = isExpanded ? "Leer menos" : "Leer más";
            });
        } else {
            // Si el texto no excede el límite de palabras
            aboutText.textContent = fullText;
            readMoreBtn.style.display = "none"; // Ocultar botón
        }
    });
});



/* ----- ALBUMS SECTION ----- */
document.addEventListener("DOMContentLoaded", () => {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const songImage = document.getElementById("song-image");
    const playOverlay = document.getElementById("play-overlay");
    const songTitle = document.getElementById("song-title");
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");

    const songs = [
        {
            title: "A la Vida de mi Vida",
            src: "temasmusicales/D’ Robys Band - A la Vida de mi Vida.mp3",
            img: "img/portada.jpeg"
        },
        {
            title: "Adiós, Adiós",
            src: "temasmusicales/D’ Robys Band - Adiós, Adiós.mp3",
            img: "img/robysbandportada.jpg"
        },
        {
            title: "Dime la Verdad",
            src: "temasmusicales/D’ Robys Band - Dime la Verdad.mp3",
            img: "img/robysbandportada2.jpg"
        },
        {
            title: "El Panteonero",
            src: "temasmusicales/D’ Robys Band - El Panteonero.mp3",
            img: "img/robysbandportada2.jpg"
        }
    ];

    let currentIndex = 0;

    function loadSong(index) {
        const song = songs[index];
        songImage.src = song.img;
        songTitle.textContent = song.title;
        audioSource.src = song.src;
        audioPlayer.load();
    }

    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playOverlay.textContent = "⏸ Pausar";
        } else {
            audioPlayer.pause();
            playOverlay.textContent = "▶ Reproducir";
        }
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        loadSong(currentIndex);
        audioPlayer.pause(); // Pausar al cambiar canción
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % songs.length;
        loadSong(currentIndex);
        audioPlayer.pause(); // Pausar al cambiar canción
    });

    playOverlay.addEventListener("click", togglePlayPause);

    // Inicializar con la primera canción
    loadSong(currentIndex);
});
  // Inicialización de EmailJS con tu User ID
  (function() {
    emailjs.init("VdoOllUa1qXpVytJb"); // Reemplaza "YOUR_USER_ID" con tu ID de usuario de EmailJS
  })();

  // Validar el formulario y enviar
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío por defecto del formulario

    // Recoge los valores de los campos del formulario
    const nombre = document.querySelector('input[name="nombre"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const mensaje = document.querySelector('textarea[name="mensaje"]').value.trim();

    // Validar campos
    if (!nombre) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }

    if (!validarEmail(email)) {
      alert('Por favor, ingresa un email válido.');
      return;
    }

    if (!mensaje) {
      alert('Por favor, escribe un mensaje.');
      return;
    }

    // Crea un objeto con los datos del formulario
    const templateParams = {
      nombre: nombre,       // Vinculado a {{nombre}} en la plantilla
      email: email,         // Vinculado a {{email}} en la plantilla
      mensaje: mensaje      // Vinculado a {{mensaje}} en la plantilla
    };

    // Envía los datos a través de EmailJS
    emailjs.send('service_4de2xgd', 'template_uhcs7wq', templateParams)
      .then(function(response) {
        console.log('Éxito:', response);
        alert('¡Mensaje enviado con éxito!');
        // Limpiar el formulario después de enviarlo
        document.getElementById('contactForm').reset();
      }, function(error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
      });
  });

  // Función para validar el formato del email
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para formato de email
    return regex.test(email);
  }
