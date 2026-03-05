import { $, $$, prefersReducedMotion } from "../core/utils.js";

export function initHeroCarousel() {
  const mainImage = $("#heroMainImage");
  const thumbnails = $$(".hero__thumb", $("#heroThumbnails"));
  if (!mainImage || !thumbnails.length) return;

  const mainImg = mainImage.querySelector("img");
  if (!mainImg) return;

  const lens = $("#heroZoomLens");
  const preview = $("#heroZoomPreview");

  function setActive(index) {
    const thumb = thumbnails[index];
    if (!thumb) return;

    const src = thumb.dataset.src;
    if (src) {
      mainImg.src = src;
      mainImg.alt = thumb.getAttribute("aria-label") || "";
      if (preview) preview.style.backgroundImage = `url('${src}')`;
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

  if (!lens || !preview || prefersReducedMotion()) return;

  const ZOOM_LEVEL = 2.5;
  const LENS_SIZE = 120;

  mainImage.addEventListener("mouseenter", () => {
    preview.style.backgroundImage = `url('${mainImg.src}')`;
    lens.style.opacity = "1";
    preview.style.opacity = "1";
  });

  mainImage.addEventListener("mouseleave", () => {
    lens.style.opacity = "0";
    preview.style.opacity = "0";
  });

  mainImage.addEventListener("mousemove", (e) => {
    requestAnimationFrame(() => {
      const rect = mainImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const halfLens = LENS_SIZE / 2;
      const lensX = Math.max(0, Math.min(x - halfLens, rect.width - LENS_SIZE));
      const lensY = Math.max(0, Math.min(y - halfLens, rect.height - LENS_SIZE));

      lens.style.left = `${lensX}px`;
      lens.style.top = `${lensY}px`;

      const bgW = rect.width * ZOOM_LEVEL;
      const bgH = rect.height * ZOOM_LEVEL;
      const previewW = preview.offsetWidth;
      const previewH = preview.offsetHeight;

      const ratioX = lensX / (rect.width - LENS_SIZE);
      const ratioY = lensY / (rect.height - LENS_SIZE);

      const bgX = ratioX * (bgW - previewW);
      const bgY = ratioY * (bgH - previewH);

      preview.style.backgroundSize = `${bgW}px ${bgH}px`;
      preview.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    });
  });
}
