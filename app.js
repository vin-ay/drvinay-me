const root = document.documentElement;
const toggle = document.querySelector("#theme-toggle");
const syncToggle = () => {
  const dark = root.classList.contains("dark");
  toggle.setAttribute("aria-label", dark ? "Switch to day theme" : "Switch to night theme");
  toggle.title = dark ? "Day" : "Night";
};
toggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  try { localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light"); } catch (e) {}
  syncToggle();
});
syncToggle();

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("is-open", open);
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  menu.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.querySelector("#year").textContent = new Date().getFullYear();

const [sy, sm] = ["2022", "01"];
const now = new Date();
const total = (now.getFullYear() - Number(sy)) * 12 + (now.getMonth() + 1 - Number(sm));
document.querySelectorAll(".num[data-since]").forEach((el) => {
  el.textContent = el.dataset.unit === "years" ? Math.floor(total / 12) : total % 12;
});

const search = document.querySelector("#pub-search");
const items = [...document.querySelectorAll("#pubs li")];
const count = document.querySelector("#pub-count");
const empty = document.querySelector("#pub-empty");
const buttons = [...document.querySelectorAll(".chip-btn")];
let year = "all";
const apply = () => {
  const q = search.value.trim().toLowerCase();
  let shown = 0;
  items.forEach((li) => {
    const match = (year === "all" || li.dataset.year === year) && li.textContent.toLowerCase().includes(q);
    li.hidden = !match;
    if (match) shown++;
  });
  count.textContent = `Showing ${shown} of ${items.length} articles`;
  empty.hidden = shown > 0;
};
search.addEventListener("input", apply);
buttons.forEach((b) => b.addEventListener("click", () => {
  year = b.dataset.year;
  buttons.forEach((x) => x.classList.toggle("is-active", x === b));
  apply();
}));
apply();
