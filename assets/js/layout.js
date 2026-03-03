async function loadPartial(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("Failed to load " + file);

    const html = await response.text();
    const element = document.getElementById(id);

    if (!element) return; // safety check

    element.innerHTML = html;

    // Run active link logic ONLY after navbar loads
    if (id === "navbar") {
      setActiveNavLink();
    }

  } catch (err) {
    console.error("Error loading partial:", file, err);
  }
}

function setActiveNavLink() {
  let currentPage = window.location.pathname.split("/").pop();

  // If URL is just "/", treat it as index.html
  if (!currentPage) {
    currentPage = "index.html";
  }

  const navLinks = document.querySelectorAll("#navbar nav a");

  navLinks.forEach(link => {
    let linkPage = link.getAttribute("href");

    // Remove leading slash if present
    if (linkPage.startsWith("/")) {
      linkPage = linkPage.substring(1);
    }

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

loadPartial("navbar", "partials/navbar.html");
loadPartial("footer", "partials/footer.html");