const toast = document.querySelector(".toast");
const copyButton = document.querySelector(".copy-code");
const taskInputs = document.querySelectorAll(".task-item input");
const storageKey = "lera-mentorship-lesson-1-homework";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 1800);
}

copyButton?.addEventListener("click", async () => {
  const code = copyButton.dataset.code || copyButton.textContent.trim();

  try {
    await navigator.clipboard.writeText(code);
    showToast("Код скопирован");
  } catch {
    showToast("Код: " + code);
  }
});

const savedTasks = JSON.parse(localStorage.getItem(storageKey) || "[]");

taskInputs.forEach((input, index) => {
  input.checked = Boolean(savedTasks[index]);
  input.addEventListener("change", () => {
    const state = Array.from(taskInputs).map((item) => item.checked);
    localStorage.setItem(storageKey, JSON.stringify(state));
  });
});
