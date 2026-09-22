const dialog = document.getElementById("story-dialog");
const body = dialog.querySelector(".dialog-body");
const closeButton = dialog.querySelector(".dialog-close");
const heroLoop = document.querySelector(".hero-media video");

function openStory(id) {
  const source = document.getElementById(`story-${id}`);
  if (!source) return;
  body.replaceChildren(...[...source.cloneNode(true).childNodes]);
  const heading = body.querySelector("h3");
  if (heading) heading.id = "dialog-title";
  const video = body.querySelector("video");
  const videoOnly = Boolean(video) && !body.querySelector("p:not(.story-tag)");
  dialog.classList.toggle("video-only", videoOnly);
  dialog.classList.toggle("video-portrait", source.dataset.orientation === "portrait");
  if (heroLoop) heroLoop.pause();
  dialog.showModal();
  if (video) {
    video.muted = false;
    video.play().catch(() => {});
  }
}

function closeStory() {
  body.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
  dialog.close();
}

document.querySelectorAll("[data-open]").forEach((card) => {
  card.addEventListener("click", () => openStory(card.dataset.open));
});

closeButton.addEventListener("click", closeStory);

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeStory();
});

dialog.addEventListener("close", () => {
  body.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
  if (heroLoop) heroLoop.play().catch(() => {});
});

const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.getElementById("site-menu");

function setMenu(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuPanel.hidden = !open;
}

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

menuPanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(() => setMenu(false), 0);
  });
});

document.addEventListener("click", (event) => {
  if (!menuToggle.contains(event.target) && !menuPanel.contains(event.target)) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuToggle.focus();
  }
});
