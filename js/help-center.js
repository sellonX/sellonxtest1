// Handle Help Center Form
document.getElementById("helpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const topic = document.getElementById("topic").value;
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const file = document.getElementById("file").files[0];

  // Simple Validation
  if (!topic || !firstName || !lastName || !phone || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  if (file && file.type !== "application/pdf") {
    alert("Only PDF files are allowed!");
    return;
  }

  // For now, just show confirmation
  alert("Form submitted successfully! (Demo only, no backend connected yet)");
  
  // Reset the form
  e.target.reset();
});