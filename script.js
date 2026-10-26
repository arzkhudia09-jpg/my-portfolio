const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const navLinks = primaryNavigation.querySelectorAll('a[href^="#"]');

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
  primaryNavigation.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reduceMotion.matches && "IntersectionObserver" in window) {
  document.body.classList.add("motion-ready");

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          const activeLink = primaryNavigation.querySelector(
            `a[href="#${entry.target.id}"]`,
          );

          navLinks.forEach((link) => link.removeAttribute("aria-current"));
          activeLink?.setAttribute("aria-current", "location");
        }
      });
    },
    { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
  );

  document.querySelectorAll("main > section[id]").forEach((section) => {
    sectionObserver.observe(section);
  });
}

const certificateDialog = document.querySelector(".certificate-dialog");
const dialogImage = certificateDialog.querySelector(".dialog-image");
const dialogCaption = certificateDialog.querySelector(".dialog-caption");
const dialogClose = certificateDialog.querySelector(".dialog-close");
let lastCertificateTrigger;

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && certificateDialog.open) {
    event.preventDefault();
    certificateDialog.close();
  }
});

document.querySelectorAll("[data-lightbox-src]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    lastCertificateTrigger = trigger;
    dialogImage.src = trigger.dataset.lightboxSrc;
    dialogImage.alt = trigger.dataset.lightboxAlt;
    dialogCaption.textContent = trigger.dataset.lightboxAlt;
    certificateDialog.showModal();
  });
});

dialogClose.addEventListener("click", () => certificateDialog.close());

certificateDialog.addEventListener("click", (event) => {
  if (event.target === certificateDialog) {
    certificateDialog.close();
  }
});

certificateDialog.addEventListener("close", () => {
  dialogImage.removeAttribute("src");
  lastCertificateTrigger?.focus();
});
