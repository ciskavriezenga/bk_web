document.getElementById("sendBtn").addEventListener("click", () => {
  const email = document.getElementById("emailInput").value;

  fetch("/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById("statusMsg").textContent = data;
  })
  .catch(err => {
    document.getElementById("statusMsg").textContent = "Fout bij verzenden.";
  });
});
