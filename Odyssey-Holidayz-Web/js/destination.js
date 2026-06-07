document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("destinations-container");

  fetch("data/destinationdata.json")
    .then(res => res.json())
    .then(destinations => {
      destinations.forEach(d => {
        const card = `
          <div class="col-md-4 filter-item ${d.category}">
            <div class="destination-card">
              <img src="${d.img}" class="img-fluid" alt="${d.title}">
              <div class="overlay">
                <h5>${d.title}</h5>
                <p>${d.desc}</p>
              </div>
            </div>
          </div>
        `;
        container.innerHTML += card;
      });
    })
    .catch(err => console.error("Error loading destinations:", err));
});
