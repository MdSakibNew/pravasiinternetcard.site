const packageData = {
  saudi: [
    { gb: "100GB", minutes: "700 মিনিট", price: 890, popular: false },
    { gb: "150GB", minutes: "800 মিনিট", price: 1050, popular: true },
    { gb: "170GB", minutes: "900 মিনিট", price: 1150, popular: false },
    { gb: "200GB", minutes: "1000 মিনিট", price: 1300, popular: false }
  ],
  qatar: [
    { gb: "অর্ডার চালু", minutes: "প্যাকেজ জানতে WhatsApp করুন", price: "যোগাযোগ", popular: false }
  ],
  oman: [
    { gb: "অর্ডার চালু", minutes: "প্যাকেজ জানতে WhatsApp করুন", price: "যোগাযোগ", popular: false }
  ]
};

const packageGrid = document.getElementById("packageGrid");
const countryTabs = document.querySelectorAll(".country-tab");

function renderPackages(country = "saudi") {
  if (!packageGrid) return;

  packageGrid.innerHTML = "";

  packageData[country].forEach(pkg => {
    const card = document.createElement("div");
    card.className = "package-card" + (pkg.popular ? " popular" : "");

    card.innerHTML = `
      <h3>${pkg.gb}</h3>
      <div class="minutes">${pkg.minutes}</div>
      <div class="validity">মেয়াদ: ৩০ দিন</div>
      <div class="price">${pkg.price}<span>${typeof pkg.price === "number" ? " টাকা" : ""}</span></div>
      <a class="btn" href="pages/order.html?country=${country}&package=${encodeURIComponent(pkg.gb)}&price=${pkg.price}">এই প্যাকেজ নিন</a>
    `;

    packageGrid.appendChild(card);
  });
}

countryTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    countryTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderPackages(tab.dataset.country);
  });
});

renderPackages("saudi");
