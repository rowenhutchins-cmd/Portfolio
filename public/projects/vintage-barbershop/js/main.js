// ----- DOM Elements -----

const yearEl = document.getElementById("year");

const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");

const ctaBtn = document.getElementById("ctaBtn");

const callBtn = document.getElementById("callBtn");

const phoneLink = document.getElementById("phoneLink");

const heading = document.getElementById("heroHeading");

// ----- Helpers / Functions -----

// Update footer year automatically

const setCurrentYear = () => {
  const now = new Date();

  yearEl.textContent = now.getFullYear();
};

// Toggle mobile menu open/close

let isMenuOpen = false;

const toggleMobileMenu = () => {
  if (!mobileMenu) return;

  if (isMenuOpen === false) {
    mobileMenu.classList.add("is-open");

    isMenuOpen = true;
  } else {
    mobileMenu.classList.remove("is-open");

    isMenuOpen = false;
  }
};

// Close mobile menu (used when a link is clicked)

const closeMobileMenu = () => {
  if (!mobileMenu) return;

  mobileMenu.classList.remove("is-open");

  isMenuOpen = false;
};

// Reusable function with parameters (practice pattern)

const updateHeadingText = (newText) => {
  if (!heading) return;

  heading.textContent = newText;
};

// ----- Event Listeners -----

// 1) Set year on page load

setCurrentYear();

// 2) Hamburger menu toggle

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    toggleMobileMenu();
  });
}

// 3) Close mobile menu when a mobile link is clicked (event delegation)

if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    // If they clicked an <a> inside the menu, close it

    if (event.target.tagName === "A") {
      closeMobileMenu();
    }
  });
}

// 4) CTA Button: “Book Now” (placeholder behavior)

if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    updateHeadingText("Booking coming next — great choice!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 5) Call Button: try to use the phone number in the footer

if (callBtn) {
  callBtn.addEventListener("click", () => {
    // If you later set phoneLink href to tel:, this will work perfectly.

    // For now, this is a beginner-friendly placeholder.

    if (phoneLink) {
      updateHeadingText("Call us at " + phoneLink.textContent);
    } else {
      updateHeadingText("Call feature coming next!");
    }
  });
}
