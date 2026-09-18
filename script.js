const dialog = document.getElementById("story-dialog");
const body = dialog.querySelector(".dialog-body");
const closeButton = dialog.querySelector(".dialog-close");

function openStory(id) {
  const source = document.getElementById(`story-${id}`);
  if (!source) return;
  body.replaceChildren(...[...source.cloneNode(true).childNodes]);
  const heading = body.querySelector("h3");
  if (heading) heading.id = "dialog-title";
  dialog.showModal();
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
});
