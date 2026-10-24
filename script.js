/* =========================================================
   PATIGANG AYARLARI — sitedeki tüm linkler buradan gelir.
   Bir değeri boş bırakırsan ("") o link sitede gizlenir.
   ========================================================= */
const PATIGANG = {
  instagram: "https://www.instagram.com/patigang/",   // TODO: gerçek hesap linki
  instagramHandle: "@patigang",                       // TODO: gerçek kullanıcı adı
  trendyol: "https://www.trendyol.com/sr?q=patigang",        // TODO: doğrudan mağaza linki
  hepsiburada: "https://www.hepsiburada.com/ara?q=patigang", // TODO: doğrudan mağaza linki
  email: "",                                          // isteğe bağlı: "merhaba@patigang.com"
};

document.documentElement.classList.add("js");

/* Linkleri doldur */
const linkFor = (key) => {
  const v = PATIGANG[key];
  if (!v) return "";
  return key === "email" ? `mailto:${v}` : v;
};

document.querySelectorAll("[data-link]").forEach((el) => {
  const href = linkFor(el.dataset.link);
  if (href) {
    el.href = href;
    if (!href.startsWith("mailto:")) {
      el.target = "_blank";
      el.rel = "noopener";
    }
  } else if (el.closest(".faq") || el.closest(".size-copy")) {
    // Metin içindeki link boşsa düz yazı olarak kalsın
    el.replaceWith(document.createTextNode(el.textContent));
  } else {
    el.hidden = true;
    el.style.display = "none";
  }
});

document.querySelectorAll("[data-text]").forEach((el) => {
  const v = PATIGANG[el.dataset.text];
  if (v) el.textContent = v;
});

/* Arama motorları için marka bilgisi */
const sameAs = ["instagram", "trendyol", "hepsiburada"].map((k) => PATIGANG[k]).filter(Boolean);
const ld = document.createElement("script");
ld.type = "application/ld+json";
ld.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PatiGang",
  description: "El yapımı kedi ve köpek yatakları. Simge'nin atölyesinde sevgiyle dikilir.",
  founder: { "@type": "Person", name: "Simge" },
  sameAs,
});
document.head.appendChild(ld);

/* Yıl */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Üst menü: kaydırınca arka plan, mobilde aç/kapa */
const header = document.querySelector(".site-header");
const nav = document.getElementById("nav");
const menuBtn = document.querySelector(".menu-btn");
const buybar = document.getElementById("buybar");
const hero = document.querySelector(".hero");

const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
  if (buybar && hero) {
    const pastHero = hero.getBoundingClientRect().bottom < 0;
    const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 420;
    buybar.classList.toggle("is-visible", pastHero && !nearEnd);
  }
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
};
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* Görünür olunca belirme */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

/* Yatak bulucu */
const lenInput = document.getElementById("petLen");
const lenOut = document.getElementById("lenOut");
const nameInput = document.getElementById("petName");
const resName = document.getElementById("resName");
const resCm = document.getElementById("resCm");
const resType = document.getElementById("resType");

const updateSize = () => {
  const len = Number(lenInput.value);
  const style = document.querySelector('input[name="style"]:checked').value;
  const curled = style === "kivrilarak";
  // Kıvrılarak uyuyana boy + ~10 cm, uzanarak uyuyana boy + ~20 cm; 5'in katına yuvarla
  const cm = Math.ceil((len + (curled ? 10 : 20)) / 5) * 5;

  let type;
  if (curled) type = cm <= 70 ? "Simit Yatak" : "Kenarlı Yatak";
  else type = "Minder Yatak";

  lenOut.textContent = `${len} cm`;
  const p = ((len - lenInput.min) / (lenInput.max - lenInput.min)) * 100;
  lenInput.style.setProperty("--p", `${p}%`);

  const name = nameInput.value.trim();
  resName.textContent = name || "Dostun";

  if (resCm.textContent !== String(cm)) {
    resCm.textContent = cm;
    resCm.parentElement.classList.remove("pop");
    void resCm.parentElement.offsetWidth;
    resCm.parentElement.classList.add("pop");
  }
  resType.textContent = type;
};

if (lenInput) {
  lenInput.addEventListener("input", updateSize);
  nameInput.addEventListener("input", updateSize);
  document.querySelectorAll('input[name="style"]').forEach((r) => r.addEventListener("change", updateSize));
  updateSize();
}
