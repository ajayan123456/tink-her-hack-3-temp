document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const addContactBtn = document.getElementById("addContactBtn");
  const sosBtn = document.getElementById("sosBtn");
  const contactsList = document.getElementById("contacts");
  const voiceStatus = document.getElementById("voiceStatus");

  // Handle logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    alert("You have been logged out!");
    window.location.href = "index.html";
  });

  // Add trusted contact
  addContactBtn.addEventListener("click", () => {
    const contactName = document.getElementById("contactName").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();

    if (!contactName || !contactNumber) {
      alert("Please fill in all fields!");
      return;
    }

    const contactItem = document.createElement("li");
    contactItem.textContent = `${contactName} - ${contactNumber}`;
    contactsList.appendChild(contactItem);

    document.getElementById("contactName").value = "";
    document.getElementById("contactNumber").value = "";
  });

  // Proceed to SOS page
  document.getElementById("nextPageBtn").addEventListener("click", () => {
    window.location.href = "sos.html";
  });

  // Send SOS message
  sosBtn.addEventListener("click", () => {
    const contacts = Array.from(contactsList.children).map(contact => contact.textContent);
    if (contacts.length > 0) {
      alert(`SOS sent to:\n${contacts.join("\n")}`);
    } else {
      alert("No trusted contacts to send SOS!");
    }
  });

  // Continuous voice detection for 'DANGER' or 'HELP'
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.continuous = true;

  recognition.onstart = () => {
    voiceStatus.textContent = "Listening for 'DANGER' or 'HELP'...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toUpperCase();
    if (transcript.includes("DANGER") || transcript.includes("HELP")) {
      alert("SOS Triggered! Sending help...");
      sendSOS();
    }
  };

  recognition.start();

  function sendSOS() {
    const contacts = Array.from(contactsList.children).map(contact => contact.textContent);
    if (contacts.length > 0) {
      alert(`SOS sent to:\n${contacts.join("\n")}`);
    } else {
      alert("No trusted contacts to send SOS!");
    }
  }
});
