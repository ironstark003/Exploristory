/* CITY TAB SECTION (Existing) */

function showCity(cityId, btn) {
  const cityContents = document.querySelectorAll(".city-content");
  cityContents.forEach((content) => content.classList.remove("active"));

  const selectedCity = document.getElementById(cityId);
  if (selectedCity) {
    selectedCity.classList.add("active");
  }

  const buttons = document.querySelectorAll(".city-btn");
  buttons.forEach((button) => button.classList.remove("active"));

  if (btn) {
    btn.classList.add("active");
  }
}

/* SERVICE MODAL SECTION */

function openService(type) {
  const modal = document.getElementById("serviceModal");
  const body = document.getElementById("modalBody");

  body.innerHTML = "";

  if (type === "oneday") {
    let content = `
      <h2>${getServiceTitle(type)}</h2>

      <div class="city-modal-layout">
        <div class="city-list">
          <button onclick="showCityDetail('chennai', this)">Chennai</button>
          <button onclick="showCityDetail('bangalore', this)">Bangalore</button>
          <button onclick="showCityDetail('indore', this)">Indore</button>
          <button onclick="showCityDetail('ujjain', this)">Ujjain</button>
          <button onclick="showCityDetail('nagpur', this)">Nagpur</button>
          <button onclick="showCityDetail('mumbai', this)">Mumbai</button>
          <button onclick="showCityDetail('khandwa', this)">Khandwa</button>
          <button onclick="showCityDetail('surat', this)">Surat</button>
        </div>
        <div id="cityContentPanel" class="service-panel">
          <p>Select a city to view the program details.</p>
        </div>
      </div>
    `;

    body.innerHTML = content;
    showCityDetail("chennai", document.querySelector(".city-list button"));
  } else {
    const content = document.getElementById("service-" + type).innerHTML;

    body.innerHTML = `
    <div class="service-panel">
      ${content}
    </div>
  `;
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function showCityDetail(city, btn) {
  const body = document.getElementById("cityContentPanel");
  const content = document.getElementById("city-" + city).innerHTML;

  body.innerHTML = content.trim();

  const buttons = document.querySelectorAll(".city-list button");
  buttons.forEach((b) => b.classList.remove("active"));

  if (btn) {
    btn.classList.add("active");
  }
}

/* HELPER FUNCTIONS */

function getServiceTitle(type) {
  const titles = {
    oneday: "One-Day Trips",
    multiday: "Multi-Day Expeditions",
    workshops: "In-House Workshops",
    facilitator: "Facilitator Support",
    expo: "Heritage Expo Planning",
    custom: "Custom Programs",
  };

  return titles[type] || "";
}

/* close Modal FUNCTION */

function closeModal() {
  const modal = document.getElementById("serviceModal");
  const body = document.getElementById("modalBody");

  modal.style.display = "none";
  body.innerHTML = "";
  document.body.style.overflow = "auto";
}

window.addEventListener("load", () => {
  // SLIDER LOGIC
  document
    .querySelectorAll(".gallery-slider, .contributors-slider")
    .forEach((slider) => {
      const track =
        slider.querySelector(".slider-track") ||
        slider.querySelector(".contributors-track");

      track.innerHTML += track.innerHTML;

      const nextBtn = slider.querySelector(".next");
      const prevBtn = slider.querySelector(".prev");

      if (!track || !nextBtn || !prevBtn) return;

      let index = 0;

      const getSlideWidth = () => {
        const img = track.querySelector("img");
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        return img.clientWidth + gap;
      };

      const getVisibleCount = () => {
        return Math.floor(slider.offsetWidth / getSlideWidth());
      };

      const getMaxIndex = () => {
        return track.children.length - getVisibleCount();
      };

      const updateSlider = () => {
        if (index < 0) index = 0;

        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(-${index * slideWidth}px)`;
      };

      nextBtn.onclick = () => {
        if (index < getMaxIndex()) {
          index++;
          updateSlider();
        }
      };

      prevBtn.onclick = () => {
        if (index > 0) {
          index--;
          updateSlider();
        }
      };

      // 🔥 AUTO SLIDE (INFINITE LOOP)
      setInterval(() => {
        index++;
        updateSlider();

        if (index >= track.children.length / 2) {
          setTimeout(() => {
            track.style.transition = "none";
            index = 0;
            updateSlider();

            setTimeout(() => {
              track.style.transition = "transform 0.4s ease";
            }, 50);
          }, 400);
        }
      }, 3000);

      window.addEventListener("resize", updateSlider);
    });

  // LIGHTBOX CLICK HANDLER (FIXED)
  document.addEventListener("click", function (e) {
    const img = e.target;

    if (!img.matches(".slider-track img, .contributors-track img")) return;

    const isGallery = img.closest(".gallery-slider");
    const isContributors = img.closest(".contributors-slider");

    if (isGallery) {
      const all = document.querySelectorAll(
        ".gallery-slider .slider-track img",
      );
      currentImages = Array.from(all).map((i) => i.src);
      currentIndex = Array.from(all).indexOf(img);
    }

    if (isContributors) {
      const all = document.querySelectorAll(
        ".contributors-slider .contributors-track img",
      );
      currentImages = Array.from(all).map((i) => i.src);
      currentIndex = Array.from(all).indexOf(img);
    }

    openLightbox();
  });
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section, main");
  const navLinks = document.querySelectorAll("nav a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // offset for navbar
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);

    window.scrollTo({
      top: target.offsetTop - 70, // navbar height
      behavior: "smooth",
    });
  });
});

const form = document.getElementById("contactForm");
const btn = document.getElementById("submitBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const captcha = grecaptcha.getResponse();
  if (!captcha) {
    alert("Please verify captcha");
    return;
  }

  // 🔥 start loading
  btn.classList.add("loading");
  btn.disabled = true;

  emailjs
    .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
      grecaptcha.reset();
    })
    .catch(() => {
      alert("Failed to send. Try again.");
    })
    .finally(() => {
      // 🔥 stop loading
      btn.classList.remove("loading");
      btn.disabled = false;
    });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

const closeBtn = document.querySelector(".lightbox-close");
const nextBtn = document.querySelector(".lightbox-next");
const prevBtn = document.querySelector(".lightbox-prev");

// 🔥 collect all images (gallery + contributors)
let currentImages = [];
let currentIndex = 0;

function openLightbox() {
  lightbox.classList.add("active");
  lightboxImg.src = currentImages[currentIndex];
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

function showPrev() {
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

closeBtn.onclick = closeLightbox;
nextBtn.onclick = showNext;
prevBtn.onclick = showPrev;

// close on background click
lightbox.onclick = (e) => {
  if (e.target === lightbox) closeLightbox();
};

document.querySelectorAll(".read-more").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent weird bubbling

    const card = btn.closest(".team-card");
    card.classList.toggle("flip");
  });
});

document.querySelectorAll(".back-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.closest(".team-card").classList.remove("flip");
  });
});
