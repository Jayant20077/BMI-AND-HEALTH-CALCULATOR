const startBtn = document.getElementById("startBtn");
const hero = document.getElementById("home");
const calculator = document.getElementById("calculator");
const darkToggle = document.getElementById("darkToggle");

startBtn.addEventListener("click", () => {
  hero.style.display = "none";
  calculator.classList.remove("hidden");
});

/* DARK MODE */
if (localStorage.getItem("dark") === "on") {
  document.body.classList.add("dark");
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "dark",
    document.body.classList.contains("dark") ? "on" : "off"
  );
});

/* BMI LOGIC */
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const calcBtn = document.getElementById("calcBtn");
const bmiResult = document.getElementById("bmiResult");
const status = document.getElementById("status");
const message = document.getElementById("message");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

renderHistory();

calcBtn.addEventListener("click", () => {
  const h = Number(heightInput.value);
  const w = Number(weightInput.value);

  if (!h || !w) {
    message.textContent = "Please enter valid values.";
    return;
  }

  const bmi = (w / ((h / 100) ** 2)).toFixed(1);
  bmiResult.textContent = `Your BMI: ${bmi}`;

  let health = "";

  if (bmi < 18.5) {
    health = "Underweight";
    message.textContent = "Consider healthy weight gain.";
  } else if (bmi < 25) {
    health = "Normal";
    message.textContent = "You're in a healthy range!";
  } else if (bmi < 30) {
    health = "Overweight";
    message.textContent = "Exercise & diet recommended.";
  } else {
    health = "Obese";
    message.textContent = "Consult a healthcare professional.";
  }

  status.textContent = `Health Status: ${health}`;

  const record = `BMI ${bmi} – ${health}`;
  history.unshift(record);
  localStorage.setItem("bmiHistory", JSON.stringify(history));
  renderHistory();
});

clearHistory.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("bmiHistory");
  renderHistory();
});
