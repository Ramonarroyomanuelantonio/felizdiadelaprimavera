var audio = document.querySelector("#song") || document.querySelector("audio");
var musicToggle = document.querySelector("#music-toggle");
var titulo = document.querySelector(".titulo");
var dedicationDone = false;

if (audio) {
  audio.volume = 0.5;
}

function setMusicButton(isOn) {
  if (!musicToggle) return;
  musicToggle.textContent = isOn ? "♪" : "🔇";
  musicToggle.setAttribute("aria-pressed", isOn ? "true" : "false");
  musicToggle.setAttribute("aria-label", isOn ? "Desactivar música" : "Activar música");
  musicToggle.title = isOn ? "Desactivar música" : "Activar música";
  musicToggle.classList.toggle("is-off", !isOn);
}

if (audio && musicToggle) {
  setMusicButton(!audio.paused);

  musicToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    if (audio.paused) {
      audio.play().then(function () {
        setMusicButton(true);
      }).catch(function () {
        setMusicButton(false);
      });
    } else {
      audio.pause();
      setMusicButton(false);
    }
  });

  audio.addEventListener("play", function () {
    setMusicButton(true);
  });
  audio.addEventListener("pause", function () {
    setMusicButton(false);
  });
}

function revelarFlores() {
  if (dedicationDone) return;
  dedicationDone = true;

  document.body.classList.remove("dedication-on");
  document.body.classList.add("flowers-focused");

  if (!titulo) return;

  titulo.classList.add("dissolve-light");
  titulo.addEventListener(
    "animationend",
    function () {
      titulo.style.display = "none";
    },
    { once: true }
  );
}

document.addEventListener("click", function (event) {
  if (musicToggle && musicToggle.contains(event.target)) return;
  revelarFlores();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    revelarFlores();
  }
});

function createExtraFlowers() {
  var template = document.querySelector(".flower.flower--1");
  var root = document.querySelector(".flowers");
  if (!template || !root) return;

  var isMobile = window.matchMedia("(max-width: 600px)").matches;

  // Forma de ramo: alturas similares, arco suave (sin punta)
  var layouts = [
    { left: "12%", bottom: "7vmin", scale: "0.7", rot: "-36deg", delay: "0.12s", z: "7", opacity: "0.88", stem: "48vmin" },
    { left: "22%", bottom: "5vmin", scale: "0.8", rot: "-24deg", delay: "0.28s", z: "10", opacity: "0.95", stem: "52vmin" },
    { left: "32%", bottom: "4vmin", scale: "0.86", rot: "-14deg", delay: "0.18s", z: "12", opacity: "1", stem: "54vmin" },
    { left: "42%", bottom: "3vmin", scale: "0.84", rot: "-4deg", delay: "0.4s", z: "13", opacity: "1", stem: "53vmin" },
    { left: "58%", bottom: "3vmin", scale: "0.84", rot: "6deg", delay: "0.32s", z: "13", opacity: "1", stem: "53vmin" },
    { left: "68%", bottom: "4vmin", scale: "0.86", rot: "16deg", delay: "0.22s", z: "12", opacity: "1", stem: "54vmin" },
    { left: "78%", bottom: "5vmin", scale: "0.8", rot: "26deg", delay: "0.36s", z: "10", opacity: "0.95", stem: "52vmin" },
    { left: "88%", bottom: "7vmin", scale: "0.7", rot: "38deg", delay: "0.15s", z: "7", opacity: "0.88", stem: "48vmin" },
    { left: "50%", bottom: "2vmin", scale: "0.62", rot: "2deg", delay: "0.25s", z: "4", opacity: "0.72", stem: "46vmin" }
  ];

  if (isMobile) {
    layouts = [
      { left: "10%", bottom: "6vmin", scale: "0.68", rot: "-30deg", delay: "0.12s", z: "7", opacity: "0.9", stem: "46vmin" },
      { left: "26%", bottom: "4vmin", scale: "0.8", rot: "-16deg", delay: "0.25s", z: "11", opacity: "1", stem: "50vmin" },
      { left: "42%", bottom: "3vmin", scale: "0.82", rot: "-4deg", delay: "0.18s", z: "12", opacity: "1", stem: "51vmin" },
      { left: "58%", bottom: "3vmin", scale: "0.82", rot: "8deg", delay: "0.3s", z: "12", opacity: "1", stem: "51vmin" },
      { left: "74%", bottom: "4vmin", scale: "0.8", rot: "18deg", delay: "0.22s", z: "11", opacity: "1", stem: "50vmin" },
      { left: "90%", bottom: "6vmin", scale: "0.68", rot: "32deg", delay: "0.15s", z: "7", opacity: "0.9", stem: "46vmin" }
    ];
  }

  layouts.forEach(function (cfg) {
    var slot = document.createElement("div");
    slot.className = "flower-slot";
    slot.style.setProperty("--left", cfg.left);
    slot.style.setProperty("--bottom", cfg.bottom);
    slot.style.setProperty("--scale", cfg.scale);
    slot.style.setProperty("--rot", cfg.rot);
    slot.style.setProperty("--delay", cfg.delay);
    slot.style.setProperty("--z", String(cfg.z));
    slot.style.setProperty("--opacity", String(cfg.opacity));

    var clone = template.cloneNode(true);
    clone.classList.add("extra-flower");
    var line = clone.querySelector(".flower__line");
    if (line && cfg.stem) {
      line.style.height = cfg.stem;
    }
    slot.appendChild(clone);
    root.appendChild(slot);
  });
}

createExtraFlowers();
