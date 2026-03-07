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
          <button onclick="showCityDetail('khandwa', this)">Khandwa</button>
          <button onclick="showCityDetail('surat', this)">Surat</button>
        </div>
        <div id="cityContentPanel" class="city-content-panel">
          <p>Select a city to view the program details.</p>
        </div>
      </div>
    `;

    body.innerHTML = content;
    showCityDetail("chennai", document.querySelector(".city-list button"));
  } else {
    const content = document.getElementById("service-" + type).innerHTML;

    body.innerHTML = content + `<button onclick="closeModal()">Close</button>`;
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function showCityDetail(city, btn) {
  const body = document.getElementById("cityContentPanel");
  const content = document.getElementById("city-" + city).innerHTML;

  body.innerHTML = content;

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
    workshop: "In-House Workshops",
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
