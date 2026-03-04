import { $, $$ } from "../core/utils.js";

export function initHeroCarousel() {
  const mainImage = $("#heroMainImage");
  const thumbnails = $$(".hero__thumb", $("#heroThumbnails"));
  if (!mainImage || !thumbnails.length) return;

  const mainImg = mainImage.querySelector("img");
  if (!mainImg) return;

  function setActive(index) {
    const thumb = thumbnails[index];
    if (!thumb) return;

    const src = thumb.dataset.src;
    if (src) {
      mainImg.src = src;
      mainImg.alt = thumb.getAttribute("aria-label") || "";
    }

    thumbnails.forEach((t, i) => {
      t.classList.toggle("is-active", i === index);
      t.setAttribute("aria-pressed", i === index ? "true" : "false");
    });
  }

  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener("mouseenter", () => setActive(i));
    thumb.addEventListener("click", () => setActive(i));
  });

  setActive(0);
}
