document.addEventListener("DOMContentLoaded", () => {
  const subPackagesContainer = document.getElementById("subPackagesContainer");
  const modal = new bootstrap.Modal(document.getElementById("packageModal"));
  const modalTitle = document.getElementById("packageModalTitle");
  const modalBody = document.getElementById("packageModalBody");

  let data = {};

  // Load JSON
  fetch("data/packages.json")
    .then(res => res.json())
    .then(json => {
      data = json;
      renderSubPackages("wildlife"); // default tab
    });

  // Handle tab clicks
  document.querySelectorAll("#packageTabs .nav-link").forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll("#packageTabs .nav-link").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderSubPackages(tab.dataset.package);
    });
  });

  // Render sub-packages as grid
  function renderSubPackages(packageType) {
    subPackagesContainer.innerHTML = "";

    if (!data[packageType] || data[packageType].length === 0) {
      subPackagesContainer.innerHTML = "<p class='package-txt-color'>No packages available.</p>";
      return;
    }

    data[packageType].forEach((pkg, i) => {
      const subPackageHTML = `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm package-card" data-index="${i}" data-package="${packageType}">
            <div class="position-relative">
              <img src="${pkg.image || 'img/default.jpg'}" class="card-img-top" alt="${pkg.title}">
              <span class="days-badge">${pkg.days.length} Days</span>
            </div>
            <div class="card-body">
              <h5 class="card-title">${pkg.title}</h5>
              <p class="card-text"><small class="text-muted">${pkg.idealFor}</small></p>
              <button class="btn btn-primary w-100 view-details">View Details</button>
            </div>
          </div>
        </div>
      `;
      subPackagesContainer.innerHTML += subPackageHTML;
    });

    // Add click event for modal
    document.querySelectorAll(".view-details").forEach(btn => {
      btn.addEventListener("click", e => {
        const card = e.target.closest(".package-card");
        const pkgIndex = card.dataset.index;
        const pkgType = card.dataset.package;
        openModal(data[pkgType][pkgIndex]);
      });
    });
  }

  // Open modal with package details
  function openModal(pkg) {
    modalTitle.innerHTML = `${pkg.title} <small class="text-muted">(${pkg.idealFor})</small>`;
    
    modalBody.innerHTML = pkg.days.map(day => `
      <div class="timeline-item mb-3">
        <h6><strong>${day.day}</strong></h6>
        <ul>
          ${day.activities.map(act => `<li>${act}</li>`).join("")}
        </ul>
      </div>
    `).join("");

    modal.show();
  }
});
