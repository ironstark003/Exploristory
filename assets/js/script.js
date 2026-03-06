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

  let content = `
    <h2>${getServiceTitle(type)}</h2>
    <p>Select a city:</p>
    <ul>
      <li onclick="showCityDetail('${type}','chennai')">Chennai</li>
      <li onclick="showCityDetail('${type}','bangalore')">Bangalore</li>
      <li onclick="showCityDetail('${type}','indore')">Indore</li>
      <li onclick="showCityDetail('${type}','ujjain')">Ujjain</li>
      <li onclick="showCityDetail('${type}','nagpur')">Nagpur</li>
      <li onclick="showCityDetail('${type}','khandwa')">Khandwa</li>
      <li onclick="showCityDetail('${type}','surat')">Surat</li>
    </ul>
  `;

  body.innerHTML = content;
  modal.style.display = "flex";
}

function showCityDetail(service, city) {
  const body = document.getElementById("modalBody");

  const description = getCityDescription(service, city);

  body.innerHTML = `
    <h2>${capitalize(city)} – ${getServiceTitle(service)}</h2>
    <p>${description}</p>
    <button onclick="openService('${service}')">Back</button>
  `;
}

function closeModal() {
  document.getElementById("serviceModal").style.display = "none";
}

/* HELPER FUNCTIONS */

function getServiceTitle(type) {
  const titles = {
    oneday: "One-Day Trips",
    multiday: "Multi-Day Expeditions",
    workshop: "In-House Workshops",
    facilitator: "Facilitator Support",
    expo: "Heritage Expo Planning",
    custom: "Custom Programs",
  };

  return titles[type] || "";
}

function getCityDescription(service, city) {
  /* ===== ONE DAY ===== */
  if (service === "oneday") {
    return `One-day experiential heritage program in ${capitalize(city)} 
    including guided interpretation, interactive activities, and curriculum-aligned exploration.`;
  }

  /* ===== MULTI DAY ===== */
  if (service === "multiday") {
    return `Multi-day immersive heritage expedition in ${capitalize(city)} 
    featuring deeper site visits, workshops, and comprehensive cultural engagement.`;
  }

  /* ===== WORKSHOP ===== */
  if (service === "workshop") {
    return `In-house archaeology and heritage workshop conducted in ${capitalize(city)} 
    with hands-on simulations and classroom engagement modules.`;
  }

  /* ===== FACILITATOR ===== */
  if (service === "facilitator") {
    return `Expert facilitation support for school-curated trips in ${capitalize(city)}, 
    including academic guidance and structured learning materials.`;
  }

  /* ===== EXPO ===== */
  if (service === "expo") {
    return `Comprehensive heritage expo planning in ${capitalize(city)} 
    including exhibition design, content curation, and student engagement activities.`;
  }

  /* ===== CUSTOM ===== */
  if (service === "custom") {
    return `Customized experiential heritage program designed specifically 
    for institutions in ${capitalize(city)}, tailored to curriculum needs.`;
  }

  return "";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/* GALLERY LIGHTBOX SECTION */

const galleryImages = document.querySelectorAll(".gallery-grid img");
const galleryLightbox = document.getElementById("galleryLightbox");
const galleryLightboxImg = document.getElementById("galleryLightboxImg");
const galleryClose = document.querySelector(".gallery-close");
const galleryNext = document.querySelector(".gallery-next");
const galleryPrev = document.querySelector(".gallery-prev");

let galleryIndex = 0;

function openGalleryImage(i) {
  galleryIndex = i;
  galleryLightboxImg.src = galleryImages[galleryIndex].src;
  galleryLightbox.classList.add("active");
}

galleryImages.forEach((img, i) => {
  img.addEventListener("click", () => openGalleryImage(i));
});

galleryNext.onclick = () => {
  galleryIndex = (galleryIndex + 1) % galleryImages.length;
  galleryLightboxImg.src = galleryImages[galleryIndex].src;
};

galleryPrev.onclick = () => {
  galleryIndex =
    (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
  galleryLightboxImg.src = galleryImages[galleryIndex].src;
};

galleryClose.onclick = () => {
  galleryLightbox.classList.remove("active");
};

galleryLightbox.addEventListener("click", (e) => {
  if (e.target === galleryLightbox) {
    galleryLightbox.classList.remove("active");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    galleryLightbox.classList.remove("active");
  }
});
/* GALLERY SHOW MORE / SHOW LESS */

const galleryToggleBtn = document.getElementById("galleryToggleBtn");

if (galleryToggleBtn) {
  let expanded = false;

  galleryToggleBtn.addEventListener("click", () => {
    const extraImages = document.querySelectorAll(".gallery-extra");

    if (!expanded) {
      extraImages.forEach((img) => {
        img.style.display = "block";
      });

      galleryToggleBtn.textContent = "Show Less Photos";
      expanded = true;
    } else {
      extraImages.forEach((img) => {
        img.style.display = "none";
      });

      galleryToggleBtn.textContent = "Show More Photos";
      expanded = false;

      document.querySelector(".gallery-box").scrollIntoView({
        behavior: "smooth",
      });
    }
  });
}
