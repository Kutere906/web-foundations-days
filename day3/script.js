// ---------- Starting data ----------
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

const VALID_CATEGORIES = ["personal", "work", "study"];

// ---------- Functions ----------

// Returns notes whose text contains `word`, ignoring case.
function searchNotes(word) {
  const target = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(target));
}

// Returns the note with the most characters, or null if there are none.
function longestNote() {
  if (notes.length === 0) {
    return null;
  }
  let longest = notes[0];
  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

// Returns an object counting notes per category.
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    if (counts[note.category] === undefined) {
      counts[note.category] = 0;
    }
    counts[note.category]++;
  }
  return counts;
}

// Returns a sentence such as "5 notes: 2 personal, 1 work, 2 study."
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const word = total === 1 ? "note" : "notes";

  if (total === 0) {
    return `0 ${word}.`;
  }

  const parts = [];
  for (const category of VALID_CATEGORIES) {
    if (counts[category]) {
      parts.push(`${counts[category]} ${category}`);
    }
  }
  return `${total} ${word}: ${parts.join(", ")}.`;
}

// True if a note with the same text exists (ignoring case and extra spaces).
function isDuplicate(text) {
  const clean = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");
  const target = clean(text);
  return notes.some((note) => clean(note.text) === target);
}

// Adds a note if valid. Returns true when added, false otherwise (logs why).
function addNote(text, category) {
  const trimmed = text.trim();

  if (trimmed.length < 1 || trimmed.length > 200) {
    console.log("Not added: text must be 1-200 characters.");
    return false;
  }
  if (isDuplicate(trimmed)) {
    console.log("Not added: a note with that text already exists.");
    return false;
  }
  if (!VALID_CATEGORIES.includes(category)) {
    console.log("Not added: category must be personal, work or study.");
    return false;
  }

  const nextId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  notes.push({ id: nextId, text: trimmed, category: category });
  return true;
}

// ---------- Tests ----------

// searchNotes
console.log(searchNotes("MILK"));   // [ { id: 1, text: "Buy milk and bread", category: "personal" } ]
console.log(searchNotes("zebra"));  // [] (no results)

// longestNote
console.log(longestNote());         // { id: 3, text: "Email the project report to Grace", category: "work" }
const backup = notes;
notes = [];
console.log(longestNote());         // null (empty array)
notes = backup;

// countByCategory
console.log(countByCategory());     // { personal: 2, study: 2, work: 1 }
notes = [];
console.log(countByCategory());     // {} (empty array)
notes = backup;

// getSummary
console.log(getSummary());          // "5 notes: 2 personal, 1 work, 2 study."
notes = [backup[4]];
console.log(getSummary());          // "1 note: 1 personal."
notes = backup;

// isDuplicate
console.log(isDuplicate("  CALL   mum "));   // true (ignores case and extra spaces)
console.log(isDuplicate("Water the plants")); // false

// addNote
console.log(addNote("Water the plants", "personal")); // true
console.log(addNote("water  the PLANTS", "work"));    // logs duplicate reason, then false
console.log(addNote("   ", "work"));                  // logs length reason, then false
console.log(addNote("x".repeat(201), "work"));        // logs length reason, then false
console.log(addNote("Read a book", "hobby"));         // logs category reason, then false
console.log(getSummary());                            // "6 notes: 3 personal, 1 work, 2 study."