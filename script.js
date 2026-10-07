// Array 1: Service Catalog Data
const serviceCatalog = [
  { id: 1, title: "Beginner Yoga", category: "beginner" },
  { id: 2, title: "Advanced Power Flow", category: "advanced" },
  { id: 3, title: "Weekend Sound Bath", category: "workshop" }
];

// Object 1: Validation Rules
const formValidationRules = {
  nameRequired: "Full Name is required.",
  emailInvalid: "Please enter a valid email address (e.g., name@example.com)"
};

const STORAGE_KEY = "riverbendYogaStudioFormData";
const SUBMISSIONS_KEY = "riverbendYogaStudioSubmissions";

function getStoredDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch (error) {
    console.warn("Unable to read saved form data:", error);
    return {};
  }
}

function saveDraft(formData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.warn("Unable to save form data:", error);
  }
}

function getSavedSubmissions() {
  try {
    const saved = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.warn("Unable to read saved submissions:", error);
    return [];
  }
}

function saveSubmission(submission) {
  const submissions = getSavedSubmissions();
  submissions.push(submission);

  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  } catch (error) {
    console.warn("Unable to save submission:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) {
    return;
  }

  const formFields = Array.from(form.querySelectorAll("input, select, textarea"));
  const savedDraft = getStoredDraft();

  formFields.forEach((field) => {
    const fieldName = field.name;

    if (fieldName && savedDraft[fieldName] !== undefined) {
      field.value = savedDraft[fieldName];
    }

    field.addEventListener("input", () => {
      const draftData = {};

      formFields.forEach((inputField) => {
        if (inputField.name) {
          draftData[inputField.name] = inputField.value;
        }
      });

      saveDraft(draftData);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(form).entries());

    if (!formData.userName || formData.userName.trim() === "") {
      alert(formValidationRules.nameRequired);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.userEmail || !emailPattern.test(formData.userEmail)) {
      alert(formValidationRules.emailInvalid);
      return;
    }

    const submission = {
      ...formData,
      submittedAt: new Date().toISOString()
    };

    saveSubmission(submission);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    alert("Your request has been saved locally.");
  });
});
