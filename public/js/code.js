const countryList = {
  AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", 
  AQD: "AQ", ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", 
  XOF: "BE", BGN: "BG", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO", 
  BRL: "BR", BSD: "BS", NOK: "BV", BWP: "BW", BYR: "BY", BZD: "BZ", CAD: "CA", 
  CDF: "CD", XAF: "CF", CHF: "CH", CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", 
  CUP: "CU", CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ", DKK: "DK", DOP: "DO", 
  DZD: "DZ", ECS: "EC", EEK: "EE", EGP: "EG", ETB: "ET", EUR: "FR", FJD: "FJ", 
  FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH", GIP: "GI", GMD: "GM", 
  GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT", 
  HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", 
  JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", 
  KPW: "KP", KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", 
  LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT", LVL: "LV", LYD: "LY", MAD: "MA", 
  MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MRO: "MR", 
  MTL: "MT", MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", 
  NAD: "NA", XPF: "NC", NGN: "NG", NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM", 
  PAB: "PA", PEN: "PE", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA", RON: "RO", 
  PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA", RON: "RO", 
  RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD", 
  SEK: "SE", SGD: "SG", SKK: "SK", SLL: "SL", SOS: "SO", SRD: "SR", STD: "ST", 
  SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", 
  TOP: "TO", TRY: "TR", TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", 
  USD: "US", UYU: "UY", UZS: "UZ", VEF: "VE", VND: "VN", VUV: "VU", WST: "WS", 
  XAF: "XK", YER: "YE", ZAR: "ZA", ZMW: "ZM", ZWL: "ZW"
};

// Wait for the document to load before performing any operations
document.addEventListener("DOMContentLoaded", function () {

  // Populate dropdowns
  const dropdowns = document.querySelectorAll(".dropdown select");
  populateDropdowns();

  // Handle search functionality
  const searchIcon = document.getElementById("search-icon");
  const searchInput = document.getElementById("search-input");
  const noResultMessage = document.getElementById("no-result");

  searchIcon.addEventListener("click", function () {
      if (searchInput.style.display === "none" || searchInput.style.display === "") {
          searchInput.style.display = "block";
          searchInput.focus();
          noResultMessage.style.display = "none";
      } else {
          searchInput.style.display = "none";
          noResultMessage.style.display = "none";
      }
  });

  document.addEventListener("click", function (e) {
      if (!searchIcon.contains(e.target) && !searchInput.contains(e.target)) {
          searchInput.style.display = "none";
          noResultMessage.style.display = "none";
      }
  });

  searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase();
      let foundMatch = false;
      const navItems = document.querySelectorAll(".navbar-nav .nav-item");

      navItems.forEach(function (item) {
          const text = item.textContent.toLowerCase();
          if (text.includes(query)) {
              item.style.display = "block";
              foundMatch = true;
          } else {
              item.style.display = "none";
          }
      });

      noResultMessage.style.display = !foundMatch && query !== "" ? "block" : "none";
  });
});

const populateDropdowns = () => {
  const dropdowns = document.querySelectorAll(".dropdown select");
  dropdowns.forEach(select => {
      for (let currCode in countryList) {
          const newOption = document.createElement("option");
          newOption.value = currCode;
          newOption.innerText = currCode;
          select.appendChild(newOption);
      }
      updateFlag(select);
      select.addEventListener("change", () => updateFlag(select));
  });
};

// Update flag for country dropdowns
const updateFlag = (element) => {
  const countryCode = countryList[element.value];
  const flagImg = element.parentElement.querySelector("img");
  if (flagImg) {
      flagImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  }
};
