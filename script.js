const API_URL = "https://jsonplaceholder.typicode.com/users";
const userList = document.getElementById("userList");
const errorDiv = document.getElementById("error");
const reloadBtn = document.getElementById("reloadBtn");

// Fetch and display users
async function fetchUsers() {
  userList.innerHTML = "";
  errorDiv.textContent = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const userCard = document.createElement("div");
      userCard.className = "user-card";
      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite},${user.address.city},${user.address.zipcode}
        </p>
      `;
      userList.appendChild(userCard);
    });
  } catch (error) {
    errorDiv.textContent = "Failed to load data. Please check your connection.";
    console.error("Fetch error:", error);
  }
}

// Reload button
reloadBtn.addEventListener("click", fetchUsers);

// Fetch users on initial load
fetchUsers();
