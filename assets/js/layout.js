async function loadPartial(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);

    const el = document.getElementById(id);
    if (!el) return;

    el.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

loadPartial("navbar", "partials/navbar.html");
loadPartial("footer", "partials/footer.html");
