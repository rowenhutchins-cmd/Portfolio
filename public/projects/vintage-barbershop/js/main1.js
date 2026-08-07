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

const featurePrevBtn = document.getElementById("featurePrevBtn");

const featureNextBtn = document.getElementById("featureNextBtn");

const featureProgressFill = document.getElementById("featureProgressFill");

const featureProgressTrack = document.getElementById("featureProgressTrack");

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

let carouselDragMoved = false;

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

// ----- Services Carousel -----
const setupFeatureCarousel = () => {
  if (!featureGrid) return;

  const updateCarouselState = () => {
    const maxScroll = featureGrid.scrollWidth - featureGrid.clientWidth;
    const ratio = maxScroll > 0 ? featureGrid.scrollLeft / maxScroll : 0;

    if (featureProgressFill) {
      featureProgressFill.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    }

    if (featurePrevBtn) featurePrevBtn.disabled = featureGrid.scrollLeft <= 4;
    if (featureNextBtn) featureNextBtn.disabled = featureGrid.scrollLeft >= maxScroll - 4;
  };

  const scrollByCard = (direction) => {
    const card = featureGrid.querySelector(".feature-card");
    const step = card
      ? card.getBoundingClientRect().width + 24
      : featureGrid.clientWidth * 0.8;

    featureGrid.scrollBy({ left: step * direction });
    updateCarouselState();
  };

  if (featurePrevBtn) {
    featurePrevBtn.addEventListener("click", () => scrollByCard(-1));
  }

  if (featureNextBtn) {
    featureNextBtn.addEventListener("click", () => scrollByCard(1));
  }

  featureGrid.addEventListener("scroll", updateCarouselState);

  window.addEventListener("resize", updateCarouselState);

  // Progress track doubles as a scrubber: click or drag it to seek directly
  if (featureProgressTrack) {
    const seekToClientX = (clientX) => {
      const rect = featureProgressTrack.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const maxScroll = featureGrid.scrollWidth - featureGrid.clientWidth;

      featureGrid.scrollLeft = ratio * maxScroll;
      updateCarouselState();
    };

    let isScrubbing = false;

    featureProgressTrack.addEventListener("pointerdown", (event) => {
      isScrubbing = true;
      seekToClientX(event.clientX);

      try {
        featureProgressTrack.setPointerCapture(event.pointerId);
      } catch (err) {
        // Capture is a nice-to-have for smooth dragging; seeking above
        // already happened, so a capture failure isn't fatal.
      }
    });

    featureProgressTrack.addEventListener("pointermove", (event) => {
      if (!isScrubbing) return;
      seekToClientX(event.clientX);
    });

    const stopScrub = () => {
      isScrubbing = false;
    };

    featureProgressTrack.addEventListener("pointerup", stopScrub);
    featureProgressTrack.addEventListener("pointercancel", stopScrub);
  }

  // Pointer drag-to-scroll for mouse users (touch/pen keep native scrolling)
  let isDragging = false;
  let dragStartX = 0;
  let scrollStartX = 0;

  featureGrid.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") return;

    isDragging = true;
    carouselDragMoved = false;
    featureGrid.classList.add("is-dragging");
    dragStartX = event.clientX;
    scrollStartX = featureGrid.scrollLeft;

    try {
      featureGrid.setPointerCapture(event.pointerId);
    } catch (err) {
      // Capture is a nice-to-have; dragging still works via pointermove.
    }
  });

  featureGrid.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const delta = event.clientX - dragStartX;
    if (Math.abs(delta) > 6) carouselDragMoved = true;

    featureGrid.scrollLeft = scrollStartX - delta;
  });

  const endDrag = () => {
    isDragging = false;
    featureGrid.classList.remove("is-dragging");
  };

  featureGrid.addEventListener("pointerup", endDrag);
  featureGrid.addEventListener("pointercancel", endDrag);
  featureGrid.addEventListener("pointerleave", endDrag);

  updateCarouselState();
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
    if (carouselDragMoved) return;

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
setupFeatureCarousel();
renderHours();
renderContactInfo();
checkIfOpen();
 