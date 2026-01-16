// <!-- ================= SCRIPT ================= -->

  const studyBtn = document.getElementById("studyBtn");
  const eduPanel = document.getElementById("eduPanel");
  const eduOverlay = document.getElementById("eduOverlay");

  studyBtn.addEventListener("click", () => {
    eduPanel.classList.add("active");
    eduOverlay.classList.add("active");
  });

  function closeEdu() {
    eduPanel.classList.remove("active");
    eduOverlay.classList.remove("active");
  }

  eduOverlay.addEventListener("click", closeEdu);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeEdu();
  });



const interestBtn = document.getElementById("interestBtn");
const intPanel = document.getElementById("intPanel");
const intOverlay = document.getElementById("intOverlay");

interestBtn.addEventListener("click", () => {
  intPanel.classList.add("active");
  intOverlay.classList.add("active");
});

function closeInterest() {
  intPanel.classList.remove("active");
  intOverlay.classList.remove("active");
}

// Close on overlay click
intOverlay.addEventListener("click", closeInterest);

// Close on ESC key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeInterest();
});