document.addEventListener("DOMContentLoaded", () => {
  const classCards = document.querySelectorAll(".clickable-class");

  classCards.forEach((card) => {
    card.addEventListener("click", () => {
      const selectedClass = card.dataset.class;
      window.location.href = `event.html?class=${encodeURIComponent(selectedClass)}`;
    });
  });

  const form = document.querySelector("form");
  if (!form) return;

  const urlParams = new URLSearchParams(window.location.search);
  const selectedClass = urlParams.get("class");

  if (!selectedClass) return;

  const interestSelect = document.getElementById("interest");
  if (!interestSelect) return;

  const classMap = {
    gentle: "gentle",
    vinyasa: "vinyasa",
    private: "workshop"
  };

  const mappedValue = classMap[selectedClass];
  if (mappedValue) {
    interestSelect.value = mappedValue;
  }
});
