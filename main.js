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
    const albums = document.querySelectorAll(".album");
    const albumDetails = document.querySelector(".album-details");
    const closeBtn = document.querySelector(".close-btn");
    const songList = document.querySelector(".song-list");
    const audioPlayer = document.querySelector(".audio-player");
    const audioSource = document.getElementById("audio-source");
    const galleryContainer = document.querySelector(".gallery-container");

    const albumsData = {
        album1: [
            { title: "A la Vida de mi Vida", src: "temasmusicales/D’ Robys Band - A la Vida de mi Vida.mp3" },
            { title: "Adiós, Adiós", src: "temasmusicales/D’ Robys Band - Adiós, Adiós.mp3" },
        ],
        album2: [
            { title: "Dime la Verdad", src: "temasmusicales/D’ Robys Band - Dime la Verdad.mp3" },
            { title: "El Panteonero", src: "temasmusicales/D’ Robys Band - El Panteonero.mp3" },
        ],
        album3: [
            { title: "Escrito está por el destino", src: "temasmusicales/D’ Robys Band - Escrito esta por el Destino.mp3" },
            { title: "Favor Me Haces", src: "temasmusicales/D’ Robys Band - Favor Me Haces.mp3" },
        ],
    };

    albums.forEach((album) => {
        album.addEventListener("click", () => {
            const albumId = album.getAttribute("data-album");
            const songs = albumsData[albumId] || [];

            albumDetails.querySelector(".album-title").textContent =
                album.querySelector(".album-name").textContent;
            songList.innerHTML = "";

            songs.forEach((song) => {
                const li = document.createElement("li");
                li.textContent = song.title;
                li.addEventListener("click", () => {
                    audioSource.src = song.src;
                    audioPlayer.load();
                    audioPlayer.play();
                });
                songList.appendChild(li);
            });

            galleryContainer.classList.add("hidden");
            albumDetails.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", () => {
        galleryContainer.classList.remove("hidden");
        albumDetails.classList.remove("active");
        audioPlayer.pause();
    });
});

/* ----- YOUTUBE SLIDER ----- */
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const sliderItems = document.querySelectorAll(".video-item iframe");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;

    function pauseAllVideos() {
        sliderItems.forEach((iframe) => {
            const currentSrc = iframe.src;
            iframe.src = "";
            iframe.src = currentSrc;
        });
    }

    function updateSlider() {
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
        pauseAllVideos();
    }

    prevBtn.addEventListener("click", () => {
        currentIndex =
            currentIndex > 0 ? currentIndex - 1 : sliderItems.length - 1;
        updateSlider();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex =
            currentIndex < sliderItems.length - 1 ? currentIndex + 1 : 0;
        updateSlider();
    });
});


(function () {
    emailjs.init("VdoOllUa1qXpVytJb"); // Reemplaza "YOUR_USER_ID" con tu ID de usuario de EmailJS
  })();
  
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío predeterminado
  
    // Validar los campos
    const nombre = document.querySelector('input[name="nombre"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const mensaje = document.querySelector('textarea[name="mensaje"]').value.trim();
    const recaptchaResponse = grecaptcha.getResponse();
  
    if (!nombre || !email || !mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }
  
    if (mensaje.length < 10) {
      alert("El mensaje debe contener al menos 10 caracteres.");
      return;
    }
  
    if (!recaptchaResponse) {
      alert("Por favor, completa el reCAPTCHA para continuar.");
      return;
    }
  
    // Datos para enviar a través de EmailJS
    const templateParams = {
      nombre: nombre,
      email: email,
      mensaje: mensaje,
    };
  
    // Enviar correo con EmailJS
    emailjs
      .send("service_4de2xgd", "template_uhcs7wq", templateParams)
      .then(
        function (response) {
          console.log("Éxito:", response);
          alert("¡Mensaje enviado con éxito!");
          document.getElementById("contactForm").reset(); // Limpiar formulario
          grecaptcha.reset(); // Resetear reCAPTCHA
        },
        function (error) {
          console.error("Error:", error);
          alert("Hubo un error al enviar el mensaje. Intenta de nuevo.");
        }
      );
  });
  