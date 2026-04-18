async function loadMessages() {
  const res = await fetch("http://localhost:5000/messages");
  const data = await res.json();

  const container = document.getElementById("messages");

  container.innerHTML = "";

  data.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("project-card"); 

    div.innerHTML = `
      <h3>${msg.name}</h3>
      <p>${msg.email}</p>
      <p>${msg.message}</p>
    `;

    container.appendChild(div);
  });
}

loadMessages();