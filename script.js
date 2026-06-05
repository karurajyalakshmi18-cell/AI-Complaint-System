let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

function classifyComplaint() {
  let text = document.getElementById("complaint").value.toLowerCase();
  let location = document.getElementById("location").value;

  let category = "";
  let department = "";
  let severity = "";
  let color = "";

  let complaintID = "CMP-" + Math.floor(Math.random() * 10000);
  let status = "Submitted";

  if (text.includes("electricity") || text.includes("current") || text.includes("power")) {
    category = "⚡ Electricity Issue";
    department = "Electricity Board";
    severity = "High";
    color = "red";
  }
  else if (text.includes("water") || text.includes("tap")) {
    category = "💧 Water Issue";
    department = "Water Dept";
    severity = "Medium";
    color = "blue";
  }
  else if (text.includes("road") || text.includes("pothole")) {
    category = "🛣 Road Issue";
    department = "Municipality";
    severity = "Medium";
    color = "orange";
  }
  else if (text.includes("garbage") || text.includes("waste")) {
    category = "🗑 Sanitation Issue";
    department = "Swachh Bharat";
    severity = "Low";
    color = "green";
  }
  else {
    category = "❓ General Complaint";
    department = "Help Desk";
    severity = "Low";
    color = "gray";
  }

  // AUTO STATUS PROGRESS
  setTimeout(() => {
    status = "In Progress";
    updateUI();
  }, 2000);

  setTimeout(() => {
    status = "Resolved";
    updateUI();
  }, 5000);

  function updateUI() {
    document.getElementById("resultBox").innerHTML =
      "<h3 style='color:" + color + "'>" + category + "</h3>" +
      "🏢 Department: " + department + "<br>" +
      "📍 Location: " + location + "<br>" +
      "⚠ Severity: " + severity + "<br>" +
      "🆔 ID: " + complaintID + "<br>" +
      "📌 Status: " + status + "<br>" +
      "📨 Sent To: " + department;

    document.getElementById("msg").innerText =
      "✅ Complaint is " + status + " by " + department;
  }

  let complaintObj = {
    id: complaintID,
    text: text,
    location: location,
    category: category,
    department: department,
    severity: severity,
    status: status
  };

  complaints.push(complaintObj);
  localStorage.setItem("complaints", JSON.stringify(complaints));

  updateHistory();
}


// HISTORY
function updateHistory() {
  let list = document.getElementById("history");
  if (!list) return;

  list.innerHTML = "";

  complaints.forEach(c => {
    let item = document.createElement("li");
    item.innerText =
      c.id + " | " + c.category + " | " + c.location + " | " + c.status;
    list.appendChild(item);
  });
}


// CLEAR
function clearAll() {
  document.getElementById("complaint").value = "";
  document.getElementById("resultBox").innerHTML = "";
  document.getElementById("suggestion").innerText = "";
  document.getElementById("msg").innerText = "";
}


// VOICE
function startVoice() {
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function(event) {
    document.getElementById("complaint").value =
      event.results[0][0].transcript;
  };
}


// SUGGESTION
document.getElementById("complaint").addEventListener("input", function() {
  let text = this.value.toLowerCase();
  let hint = [];

  if (text.includes("electric")) hint.push("⚡ Electricity Issue");
  if (text.includes("water")) hint.push("💧 Water Issue");
  if (text.includes("road")) hint.push("🛣 Road Issue");
  if (text.includes("garbage")) hint.push("🗑 Sanitation Issue");

  document.getElementById("suggestion").innerText =
    hint.length ? "Suggestions: " + hint.join(", ") : "";
});
