/* ======================================================
   প্রবাসী ইন্টারনেট কার্ড
   Package + Order System
====================================================== */

const commonPackages = [
  { gb: "100GB", minutes: "700 মিনিট", price: 890, popular: false },
  { gb: "150GB", minutes: "800 মিনিট", price: 1050, popular: true },
  { gb: "170GB", minutes: "900 মিনিট", price: 1150, popular: false },
  { gb: "200GB", minutes: "1000 মিনিট", price: 1300, popular: false }
];

const packageData = {
  saudi: commonPackages,
  qatar: commonPackages,
  oman: commonPackages
};

/* ======================================================
   Homepage Package Cards
====================================================== */

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

if (countryTabs.length > 0) {
  countryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      countryTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderPackages(tab.dataset.country);
    });
  });

  renderPackages("saudi");
}

/* ======================================================
   Order Page Package Select
====================================================== */

const packageSelect = document.getElementById("orderPackage");
const countrySelect = document.getElementById("orderCountry");
const priceText = document.getElementById("orderPrice");

function loadPackages(country) {
  if (!packageSelect || !countrySelect || !priceText) return;

  packageSelect.innerHTML = "";

  packageData[country].forEach(item => {
    const option = document.createElement("option");

    option.value = item.gb;
    option.dataset.price = item.price;
    option.textContent = item.gb + " - " + item.price + (typeof item.price === "number" ? " টাকা" : "");

    packageSelect.appendChild(option);
  });

  updatePrice();
}

function updatePrice() {
  if (!packageSelect || !priceText) return;

  const selected = packageSelect.options[packageSelect.selectedIndex];

  if (!selected) return;

  priceText.innerText = selected.dataset.price + (isNaN(selected.dataset.price) ? "" : " টাকা");
}

if (packageSelect && countrySelect) {
  countrySelect.onchange = function () {
    loadPackages(this.value);
  };

  packageSelect.onchange = updatePrice;

  loadPackages("saudi");

  const params = new URLSearchParams(window.location.search);
  const country = params.get("country");
  const pack = params.get("package");

  if (country && packageData[country]) {
    countrySelect.value = country;
    loadPackages(country);
  }

  if (pack) {
    packageSelect.value = pack;
    updatePrice();
  }
}

/* ======================================================
   Copy bKash Number
====================================================== */

const copyBtn = document.getElementById("copyBkash");
const bkashInput = document.getElementById("bkashNumber");

if (copyBtn && bkashInput) {
  copyBtn.onclick = function () {
    navigator.clipboard.writeText(bkashInput.value);

    copyBtn.innerText = "Copied";

    setTimeout(() => {
      copyBtn.innerText = "Copy";
    }, 1500);
  };
}

/* ======================================================
   WhatsApp Order Submit
====================================================== */

const submit = document.getElementById("submitOrder");

if (submit) {
  submit.onclick = function () {
    const name = document.getElementById("customerName").value.trim();

    const countryText = document.getElementById("orderCountry").options[
      document.getElementById("orderCountry").selectedIndex
    ].text;

    const packageText = document.getElementById("orderPackage").value;

    const price = document.getElementById("orderPackage").selectedOptions[0].dataset.price;

    const bkashLast = document.getElementById("trxId").value.trim();

    const note = document.getElementById("orderNote").value.trim();

    if (name === "") {
      alert("আপনার নাম লিখুন");
      return;
    }

    if (bkashLast === "") {
      alert("বিকাশের শেষ ৪ ডিজিট লিখুন");
      return;
    }

    const message =
`আসসালামু আলাইকুম।

আমি একটি ইন্টারনেট কার্ড অর্ডার করতে চাই।

নাম: ${name}
দেশ: ${countryText}
প্যাকেজ: ${packageText}
মূল্য: ${price} টাকা

বিকাশের শেষ ৪ ডিজিট: ${bkashLast}

নোট: ${note || "নেই"}

ধন্যবাদ।`;

    window.open(
      "https://wa.me/8801627330634?text=" + encodeURIComponent(message),
      "_blank"
    );
  };
}
