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

// Function 1: Filter Logic
function filterServicesByCategory(category) {
  const items = document.querySelectorAll('.service-card');
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  localStorage.setItem('selectedCategory', category);
}

// Function 2: Form Validation
function validateFormInput(event) {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const emailPattern = /^[^s@]+@[^s@]+.[^s@]+$/;

  if (!emailPattern.test(emailInput.value)) {
    event.preventDefault();
    emailError.textContent = formValidationRules.emailInvalid;
  } else {
    emailError.textContent = '';
  }
}

// Function 3: Browser Storage Restoration
window.addEventListener('DOMContentLoaded', () => {
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    filterServicesByCategory(savedCategory);
  }
});
