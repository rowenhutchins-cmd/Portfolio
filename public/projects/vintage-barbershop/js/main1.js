// =========================
// File: js/main.js
// Vintage Barbershop Project
// =========================

// ----- DOM Elements -----
const yearEl = document.getElementById("year");

const nav = document.getElementById("nav");

const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");

const featureGrid = document.getElementById("featureGrid");

const hoursList = document.getElementById("hoursList");

const ctaBtn = document.getElementById("ctaBtn");

const callBtn = document.getElementById("callBtn");

const phoneLink = document.getElementById("phoneLink");

const addressLink = document.getElementById("addressLink");

const emailLink = document.getElementById("emailLink");

const heading = document.getElementById("heroHeading");

const heroSubtext = document.getElementById("heroSubtext");

// ----- Modal Elements -----
const serviceModal = document.getElementById("serviceModal");

const serviceModalOverlay = document.getElementById("serviceModalOverlay");

const serviceModalClose = document.getElementById("serviceModalClose");

const serviceModalTitle = document.getElementById("serviceModalTitle");

const serviceModalPrice = document.getElementById("serviceModalPrice");

const serviceModalList = document.getElementById("serviceModalList");

// ----- Main Shop Object -----
const shopInfo = {
  name: "Vintage Barbershop",
  address: "123 Main St, Your City",
  phoneDisplay: "(555) 123-4567",
  phoneRaw: "5551234567",
  email: "hello@vintagebarbershop.com",
};

// ----- Navigation Data -----
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#features" },
  { label: "Book", href: "#cta" },
  { label: "Contact", href: "#footer" },
];

// ----- Services Data -----
const services = [
  {
    id: 1,
    title: "Classic Haircut",
    image: "assets/feature-1.jpg",
    alt: "Classic haircut",
    description: "Timeless cuts with modern precision—tailored to your style.",
    price: 25,
    popular: true,
    details: [
      "Consultation with your barber before the cut begins.",
      "Hair sectioning and shape-up based on your preferred style.",
      "Professional clippers, trimmers, and shears used for precision.",
      "Neckline cleanup and finishing touches included.",
      "Light styling product applied for a clean final look.",
    ],
  },
  {
    id: 2,
    title: "Beard Trim",
    image: "assets/feature-4.jpeg",
    alt: "Beard trim",
    description: "Shape, line-up, and refine your beard for a clean finish.",
    price: 15,
    popular: false,
    details: [
      "Beard assessment and shaping based on face structure.",
      "Line-up around cheeks, jawline, and neckline.",
      "Trimmers and detail tools used for crisp edges.",
      "Conditioning beard product may be applied for softness.",
      "Final symmetry check for a polished finish.",
    ],
  },
  {
    id: 3,
    title: "Straight Razor Shave",
    image: "assets/feature-3.jpg",
    alt: "Straight razor shave",
    description: "Hot towel, smooth shave, and classic barbershop experience.",
    price: 30,
    popular: true,
    details: [
      "Hot towel prep to soften facial hair and open pores.",
      "Premium shaving cream or lather applied to protect the skin.",
      "Straight razor shave performed with careful detailing.",
      "Second hot towel may be used for comfort and cleanup.",
      "Aftershave or soothing skin product applied after service.",
    ],
  },
  {
    id: 4,
    title: "Fade & Style",
    image: "assets/feature-2.jpg",
    alt: "Fade haircut",
    description: "A clean fade with finishing detail for a sharp, modern look.",
    price: 35,
    popular: false,
    details: [                                                      
      "Style consultation before clipper work begins.",
      "Fade blended to your preferred level and finish.",
      "Detailing around temples, neckline, and beard area if needed.",
      "Scissors and clipper-over-comb may be used for texture.",
      "Styling product added to complete the final look.",
    ],
  },
  {
    id: 5,
    title: "Kids Cut",
    image: "assets/feature-1.jpg",
    alt: "Kids haircut",
    description: "Clean, comfortable haircut service for younger clients.",
    price: 20,
    popular: false,
    details: [
      "Simple consultation with child and parent if needed.",
      "Age-appropriate haircut with comfort in mind.",
      "Careful clipper and scissor work for a clean finish.",
      "Light cleanup around the neckline and ears.",
      "Styled neatly before leaving the chair.",
    ],
  },
  {
    id: 6,
    title: "Head Shave",
    image: "assets/feature-3.jpg",
    alt: "Head shave",
    description: "Smooth head shave with classic barbershop treatment.",
    price: 28,
    popular: true,
    details: [
      "Scalp prep with warm towel treatment.",
      "Protective shave product applied before razor work.",
      "Close shave performed for a smooth finish.",
      "Scalp cleaned and checked for even consistency.",
      "Moisturizing scalp product applied after the shave.",
    ],
  },
];

// ----- Hours Data -----
const businessHours = [
  { day: "Monday", open: 9, close: 19 },
  { day: "Tuesday", open: 9, close: 19 },
  { day: "Wednesday", open: 9, close: 19 },
  { day: "Thursday", open: 9, close: 19 },
  { day: "Friday", open: 9, close: 19 },
  { day: "Saturday", open: 10, close: 17 },
  { day: "Sunday", open: 0, close: 0 },
];

// ----- Helper Functions -----
const setCurrentYear = () => {
  if (!yearEl) return;

  yearEl.textContent = new Date().getFullYear();
};

const formatHour = (hour) => {
  if (hour === 0) return "Closed";
  if (hour === 12) return "12pm";
  if (hour > 12) return `${hour - 12}pm`;
  return `${hour}am`;
};

let isMenuOpen = false;

const toggleMobileMenu = () => {
  if (!mobileMenu) return;

  if (!isMenuOpen) {
    mobileMenu.classList.add("is-open");
    isMenuOpen = true;
  } else {
    mobileMenu.classList.remove("is-open");
    isMenuOpen = false;
  }
};

// Close mobile menu when a link is clicked or when clicking outside the menu
const closeMobileMenu = () => {
  if (!mobileMenu) return;
  mobileMenu.classList.remove("is-open");
  isMenuOpen = false;
};

// Resusable functions to update text content in the hero section
const updateHeadingText = (newText) => {
  if (!heading) return;
  heading.textContent = newText;
};

const updateSubtext = (newText) => {
  if (!heroSubtext) return;
  heroSubtext.textContent = newText;
};

// ----- Modal Logic -----
const openServiceModal = (serviceId) => {
  if (
    !serviceModal ||
    !serviceModalTitle ||
    !serviceModalPrice ||
    !serviceModalList
  )
    return;

  const selectedService = services.find(
    (service) => service.id === Number(serviceId),
  );
  if (!selectedService) return;

  serviceModalTitle.textContent = selectedService.title;
  serviceModalPrice.textContent = `$${selectedService.price}`;
  serviceModalList.innerHTML = selectedService.details
    .map((detail) => `<li>${detail}</li>`)
    .join("");

  serviceModal.classList.add("is-open");
  serviceModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeServiceModal = () => {
  if (!serviceModal) return;

  serviceModal.classList.remove("is-open");
  serviceModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

// ----- Render Functions -----
const renderNavigation = () => {
  if (nav) {
    nav.innerHTML = navLinks
      .map(
        (link) => `<a href="${link.href}" class="nav-link">${link.label}</a>`,
      )
      .join("");
  }

  if (mobileMenu) {
    mobileMenu.innerHTML = navLinks
      .map(
        (link) =>
          `<a href="${link.href}" class="mobile-link">${link.label}</a>`,
      )
      .join("");
  }
};

const renderServices = () => {
  if (!featureGrid) return;

  const servicesHTML = services
    .map((service) => {
      const badgeHTML = service.popular
        ? `<p class="service-badge">Popular Choice</p>`
        : `<p class="service-badge alt-badge">Barber Favorite</p>`;

      return `
                <article class="feature-card">
                    <img
                        src="${service.image}"
                        alt="${service.alt}"
                        class="feature-img"
                    />
                    <h3 class="feature-title">${service.title}</h3>
                    <p class="feature-text">${service.description}</p>
                    ${badgeHTML}
                    <p class="service-price">$${service.price}</p>

                    <div class="service-actions">
                        <button
                            class="service-details-btn"
                            type="button"
                            data-service-id="${service.id}"
                        >
                            View Details
                        </button>
                    </div>
                </article>
            `;
    })
    .join("");

  featureGrid.innerHTML = servicesHTML;
};

const renderHours = () => {
  if (!hoursList) return;

  hoursList.innerHTML = businessHours
    .map((item) => {
      if (item.open === 0 && item.close === 0) {
        return `<li>${item.day}: Closed</li>`;
      }
      return `<li>${item.day}: ${formatHour(item.open)} -
            ${formatHour(item.close)}</li>`;
    })
    .join("");
};

const renderContactInfo = () => {
  if (phoneLink) {
    phoneLink.textContent = shopInfo.phoneDisplay;
    phoneLink.href = `tel:${shopInfo.phoneRaw}`;
  }

  if (addressLink) {
    addressLink.textContent = shopInfo.address;
    addressLink.href = "#";
  }

  if (emailLink) {
    emailLink.textContent = shopInfo.email;
    emailLink.href = `mailto:${shopInfo.email}`;
  }
};

// ----- Open / Closed Logic -----
const checkIfOpen = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();

  let schedule;

  if (currentDay === 0) {
    schedule = businessHours[6];
  } else {
    schedule = businessHours[currentDay - 1];
  }

  if (schedule.open === 0 && schedule.close === 0) {
    updateSubtext("We are closed today. Book now for your next sharp look.");
    return;
  }

  if (currentHour >= schedule.open && currentHour < schedule.close) {
    updateSubtext(
      "We're open right now — walk-ins welcome, appointments recommended.",
    );
  } else {
    updateSubtext(
      "We're currently closed, but you can still book your next appointment.",
    );
  }
};

// ----- Scroll Shift Cards -----
const setupScrollShiftCards = () => {
  if (!featureGrid) return;

  let lastScrollY = window.scrollY;
  let currentX = 0;
  let ticking = false;

  const getVisibleWidth = () => {
    const parent = featureGrid.parentElement;
    return parent ? parent.clientWidth : window.innerWidth;
  };

  const getMaxShift = () => {
    return Math.max(0, featureGrid.scrollWidth - getVisibleWidth());
  };

  const updateCardTrack = () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    if (scrollDelta === 0) {
      ticking = false;
      return;
    }

    currentX -= scrollDelta * 0.3;

    const maxShift = getMaxShift();

    if (currentX < -maxShift) currentX = -maxShift;
    if (currentX > 0) currentX = 0;

    featureGrid.style.transform = `translateX(${currentX}px)`;

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateCardTrack);
      ticking = true;
    }
  });

  window.addEventListener("resize", () => {
    const maxShift = getMaxShift();

    if (currentX < -maxShift) currentX = -maxShift;
    if (currentX > 0) currentX = 0;

    featureGrid.style.transform = `translateX(${currentX}px)`;
  });
};

// ----- Event Listeners -----
if (menuBtn) {
  menuBtn.addEventListener("click", toggleMobileMenu);
}

if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      closeMobileMenu();
    }
  });
}

if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    const bookingSection = document.getElementById("cta");

    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }

    updateHeadingText("Choose your date and time below.");
  });
}

if (callBtn) {
  callBtn.addEventListener("click", () => {
    window.location.href = `tel:${shopInfo.phoneRaw}`;
  });
}

if (featureGrid) {
  featureGrid.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".service-details-btn");
    if (!clickedButton) return;

    const serviceId = clickedButton.dataset.serviceId;
    openServiceModal(serviceId);
  });
}

if (serviceModalClose) {
  serviceModalClose.addEventListener("click", closeServiceModal);
}

if (serviceModalOverlay) {
  serviceModalOverlay.addEventListener("click", closeServiceModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeServiceModal();
  }
});

// ----- App Start -----
setCurrentYear();
renderNavigation();
renderServices();
setupScrollShiftCards();
renderHours();
renderContactInfo();
checkIfOpen();
 