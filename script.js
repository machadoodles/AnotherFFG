const openingDate = new Date("2026-08-28T08:00:00-07:00");
const countdown = document.querySelector("#countdown");

function updateCountdown() {
  const now = new Date();
  const days = Math.max(0, Math.ceil((openingDate - now) / (1000 * 60 * 60 * 24)));
  countdown.textContent = days === 1 ? "1 día" : `${days} días`;
}

const programs = {
  strength: {
    title: "Área de fuerza",
    copy:
      "Soportes, pesas libres, pista para trineo, estaciones de cable y una bienvenida simple para que principiantes y avanzados sepan por dónde empezar.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=82",
    alt: "Entrenador apoyando una sesión de fuerza",
  },
  classes: {
    title: "Clases con entrenador",
    copy:
      "Sesiones en grupos pequeños de fuerza, acondicionamiento, movilidad y circuitos para principiantes con progresiones claras.",
    image:
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=82",
    alt: "Clase grupal entrenando junta",
  },
  youth: {
    title: "Movimiento juvenil",
    copy:
      "Entrenamiento adecuado por edad para coordinación, confianza, fuerza con peso corporal y hábitos saludables después de la escuela.",
    image:
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=900&q=82",
    alt: "Atleta joven entrenando con supervisión",
  },
};

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.program;
    const program = programs[key];

    document.querySelectorAll(".segment").forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    document.querySelector("#program-title").textContent = program.title;
    document.querySelector("#program-copy").textContent = program.copy;
    const image = document.querySelector("#program-image");
    image.src = program.image;
    image.alt = program.alt;
  });
});

const joinForm = document.querySelector("#join-form");

if (joinForm) {
  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = new FormData(form).get("name").toString().trim().split(" ")[0] || "hola";
    document.querySelector("#form-status").textContent = `Gracias, ${name}. Tu solicitud de invitación de fundador quedó guardada.`;
    form.reset();
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 30);
