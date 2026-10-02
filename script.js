const editableElements = [...document.querySelectorAll('.editable')];
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
window.history.scrollRestoration = 'manual';

window.addEventListener('pageshow', () => {
  const navigation = performance.getEntriesByType('navigation')[0];
  if (navigation?.type === 'reload') {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

editableElements.forEach((element) => {
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      element.blur();
    }
  });
});

const slides = [...document.querySelectorAll('.mySlides')];
const dots = [...document.querySelectorAll('.dot')];
let activeSlide = 0;
let slideTimer;

function showSlide(index) {
  if (!slides.length) return;

  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle('active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
  });
  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle('active', isActive);
    if (isActive) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
}

function restartSlideTimer() {
  clearInterval(slideTimer);
  if (slides.length > 1) {
    slideTimer = setInterval(() => showSlide(activeSlide + 1), 2000);
  }
}

showSlide(0);
restartSlideTimer();

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    restartSlideTimer();
  });
});

const popup = document.getElementById('cyclePopup');
const popupClose = document.getElementById('popupClose');
const popupTitle = document.getElementById('popupTitle');
const popupText = document.getElementById('popupText');
const popupProgress = document.getElementById('popupProgress');
const popupUpdates = [
  ['Security automation with Python', 'Using Python and SQL to automate security tasks and analyze incident data.'],
  ['Cybersecurity certificates', 'View my Google Cybersecurity, IT Support, IBM, and other certificates.'],
  ['Vulnerability assessment', 'Identified 15 vulnerabilities with Nessus and prepared prioritized risk reports.']
];
let popupIndex = 0;
let popupTimer;

function cyclePopup() {
  if (!popupTitle || !popupText || !popupProgress) return;

  popupIndex = (popupIndex + 1) % popupUpdates.length;
  popupTitle.textContent = popupUpdates[popupIndex][0];
  popupText.textContent = popupUpdates[popupIndex][1];
  popupProgress.classList.remove('running');
  requestAnimationFrame(() => popupProgress.classList.add('running'));
}

if (popupProgress) {
  popupProgress.classList.add('running');
}

if (popupClose) {
  popupClose.addEventListener('click', () => {
    if (popup) {
      popup.classList.add('hidden');
    }
    clearInterval(popupTimer);
  });
}

popupTimer = setInterval(cyclePopup, 5000);

const modal = document.getElementById('certificateModal');
const modalTitle = document.getElementById('modalTitle');
const modalIssuer = document.getElementById('modalIssuer');
const certificateFrame = document.getElementById('certificateFrame');
const modalClose = document.getElementById('modalClose');
const certificateCards = document.querySelectorAll('.certificate-card');
let activePreviewButton = null;

function closeCertificateModal() {
  modal?.classList.remove('show');
  modal?.setAttribute('aria-hidden', 'true');
  certificateFrame?.removeAttribute('src');
  activePreviewButton?.focus();
}

certificateCards.forEach((card) => {
  const button = card.querySelector('.preview-button');

  button?.addEventListener('click', () => {
    const title = card.dataset.title || 'Certificate';
    const issuer = card.dataset.issuer || 'Certification Provider';
    const file = card.dataset.file;

    if (!file || !modal || !modalTitle || !modalIssuer || !certificateFrame) return;

    activePreviewButton = button;
    if (modalTitle) modalTitle.textContent = title;
    if (modalIssuer) modalIssuer.textContent = issuer;
    certificateFrame.title = `${title} certificate preview`;
    certificateFrame.src = `${file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    modalClose?.focus();
  });
});

modalClose?.addEventListener('click', closeCertificateModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeCertificateModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('show')) {
    closeCertificateModal();
  }
});
