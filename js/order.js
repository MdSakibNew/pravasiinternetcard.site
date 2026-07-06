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

/* ======================================================
   ORDER PAGE
====================================================== */

const packageSelect = document.getElementById("orderPackage");
const countrySelect = document.getElementById("orderCountry");
const priceText = document.getElementById("orderPrice");

if (packageSelect) {

    function loadPackages(country){

        packageSelect.innerHTML="";

        packageData[country].forEach(item=>{

            const option=document.createElement("option");

            option.value=item.gb;

            option.dataset.price=item.price;

            option.textContent=item.gb+" - "+item.price+" টাকা";

            packageSelect.appendChild(option);

        });

        updatePrice();

    }

    function updatePrice(){

        const selected=packageSelect.options[packageSelect.selectedIndex];

        priceText.innerText=selected.dataset.price+" টাকা";

    }

    countrySelect.onchange=function(){

        loadPackages(this.value);

    }

    packageSelect.onchange=updatePrice;

    loadPackages("saudi");



    /* URL থেকে package select */

    const params=new URLSearchParams(window.location.search);

    const country=params.get("country");

    const pack=params.get("package");



    if(country){

        countrySelect.value=country;

        loadPackages(country);

    }



    if(pack){

        packageSelect.value=pack;

        updatePrice();

    }

}

/* ======================================================
   COPY BKASH
====================================================== */

const copyBtn=document.getElementById("copyBkash");

if(copyBtn){

copyBtn.onclick=function(){

navigator.clipboard.writeText("01862097823");

copyBtn.innerText="Copied";

setTimeout(()=>{

copyBtn.innerText="Copy";

},1500);

}

}

/* ======================================================
   WHATSAPP ORDER
====================================================== */

const submit=document.getElementById("submitOrder");

if(submit){

submit.onclick=function(){

const name=document.getElementById("customerName").value;

const country=document.getElementById("orderCountry").options[
document.getElementById("orderCountry").selectedIndex].text;

const pack=document.getElementById("orderPackage").value;

const price=document.getElementById("orderPackage").selectedOptions[0].dataset.price;

const trx=document.getElementById("trxId").value;

const note=document.getElementById("orderNote").value;

if(name==""){

alert("আপনার নাম লিখুন");

return;

}

if(trx==""){

alert("Transaction ID লিখুন");

return;

}

const message=`
আসসালামু আলাইকুম।

আমি একটি ইন্টারনেট কার্ড অর্ডার করতে চাই।

নামঃ ${name}

দেশঃ ${country}

প্যাকেজঃ ${pack}

মূল্যঃ ${price} টাকা

Transaction IDঃ ${trx}

নোটঃ ${note}
`;

window.open(

"https://wa.me/8801627330634?text="+encodeURIComponent(message),

"_blank"

);

}

}
