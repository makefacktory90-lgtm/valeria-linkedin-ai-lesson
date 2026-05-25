const toast = document.querySelector(".toast");
const copyButtons = document.querySelectorAll(".copy-code");
const taskInputs = document.querySelectorAll(".task-item input");
const taskLinks = document.querySelectorAll(".task-item a");
const storageKey = "valeria-mentorship-portal-tasks";

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 1800);
}

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.dataset.code || button.textContent.trim();

    try {
      await navigator.clipboard.writeText(code);
      showToast("Скопировано");
    } catch {
      showToast(code);
    }
  });
});

const savedTasks = JSON.parse(localStorage.getItem(storageKey) || "[]");

taskInputs.forEach((input, index) => {
  input.checked = Boolean(savedTasks[index]);
  input.addEventListener("change", () => {
    const state = Array.from(taskInputs).map((item) => item.checked);
    localStorage.setItem(storageKey, JSON.stringify(state));
  });
});

taskLinks.forEach((link) => {
  link.addEventListener("click", (event) => event.stopPropagation());
});
