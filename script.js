const toast = document.querySelector(".toast");
const copyButtons = document.querySelectorAll(".copy-code");
const taskInputs = document.querySelectorAll(".task-item input");
const taskLinks = document.querySelectorAll(".task-item a");
const approvalInputs = document.querySelectorAll(".approval-card input");
const storageKey = "valeria-mentorship-portal-tasks";
const approvalStorageKey = `valeria-approval-${window.location.pathname}`;

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

const savedApprovals = JSON.parse(localStorage.getItem(approvalStorageKey) || "[]");

approvalInputs.forEach((input, index) => {
  input.checked = Boolean(savedApprovals[index] ?? input.checked);
  input.addEventListener("change", () => {
    const state = Array.from(approvalInputs).map((item) => item.checked);
    localStorage.setItem(approvalStorageKey, JSON.stringify(state));
  });
});

taskLinks.forEach((link) => {
  link.addEventListener("click", (event) => event.stopPropagation());
});
