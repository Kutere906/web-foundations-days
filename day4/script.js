const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

const MAX_CHARS = 200;
const WARN_AT = 180;
const DRAFT_KEY = "note-draft";
const THEME_KEY = "note-theme";

function updateCounts() {
  const text = noteText.value;
  const chars = text.length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  charCount.textContent = chars + " / " + MAX_CHARS + " characters";
  wordCount.textContent = words + (words === 1 ? " word" : " words");

  charCount.classList.toggle("warning", chars > WARN_AT && chars <= MAX_CHARS);
  charCount.classList.toggle("over", chars > MAX_CHARS);
}

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, noteText.value);
}

function clearNote() {
  noteText.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounts();
}

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
}

noteText.addEventListener("input", function () {
  updateCounts();
  saveDraft();
});

clearBtn.addEventListener("click", clearNote);

noteText.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearNote();
  }
});

themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark");
  applyTheme(isDark);
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
});

// On load: restore draft and theme, then update counters
const savedDraft = localStorage.getItem(DRAFT_KEY);
if (savedDraft !== null) {
  noteText.value = savedDraft;
}
applyTheme(localStorage.getItem(THEME_KEY) === "dark");
updateCounts();