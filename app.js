const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll("[data-interest]").forEach((link) => link.addEventListener("click", () => {
  document.querySelector('[name="interest_area"]').value = link.dataset.interest;
}));

const enquiryForm = document.querySelector("#enquiry-form");
const formStatus = document.querySelector("#form-status");
enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const f = new FormData(enquiryForm);
  if (f.get("website")) return;
  const lines = [["Name", "name"], ["Email", "work_email"], ["Organisation", "organisation"], ["Role", "role"], ["Interest", "interest_area"], ["Format", "preferred_format"], ["Audience size", "audience_size"], ["Challenge", "short_business_challenge"]]
    .map(([label, key]) => `${label}: ${f.get(key) || ""}`);
  lines.push("I agree to be contacted about this enquiry.");
  const subject = encodeURIComponent("Enquiry from drvinay.tech");
  window.location.href = `mailto:write2vinayk@gmail.com?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
  formStatus.textContent = "Your email app should open with the enquiry ready to send. If it does not, write to write2vinayk@gmail.com.";
});