
// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("bi-eye-fill");
        toggleIcon.classList.add("bi-eye-slash-fill");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("bi-eye-slash-fill");
        toggleIcon.classList.add("bi-eye-fill");
    }
}

// Login validation and redirect
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutBtn");

    // If login form exists → Login page
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const usernameError = document.getElementById("usernameError");
            const passwordError = document.getElementById("passwordError");
            const loginError = document.getElementById("loginError");

            usernameError.textContent = "";
            passwordError.textContent = "";
            loginError.textContent = "";

            let isValid = true;

            if (username === "") {
                usernameError.textContent = "Username is required";
                isValid = false;
            }

            if (password === "") {
                passwordError.textContent = "Password is required";
                isValid = false;
            }

            if (isValid) {
                if (username === "admin" && password === "123456") {
                    localStorage.setItem("isLoggedIn", "true"); // ✅ Store login state
                    window.location.href = "admin.html";
                } else {
                    loginError.textContent = "Invalid username or password";
                }
            }
        });
    }

    // If logout button exists → Admin page
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn"); // ✅ Clear login
            window.location.href = "index.html";
        });
    }

    // Protect admin page
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "admin.html") {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
            window.location.href = "index.html"; // 🚫 Not logged in
        }
    }
});


   document.querySelector(".theme-toggler").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");
  document.querySelectorAll(".theme-toggler span").forEach((span) =>
    span.classList.toggle("active")
  );
});
// //order

window.onload = function () {
    loadOrders();
  };

  function loadOrders() {
    const orders = JSON.parse(sessionStorage.getItem("orders")) || [];
    const tableBody = document.getElementById("orderForm"); // tbody ID in your HTML
    tableBody.innerHTML = ""; // clear before reloading

    orders.forEach((order, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.payment}</td>
        <td class="${order.status === 'Pending' ? 'warning' : 'success'}">${order.status}</td>
        <td>
          <button class="btn-edit" onclick="editOrder(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteOrder(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  function editOrder(index) {
    sessionStorage.setItem("editIndex", index);
    window.location.href = "order.html";
  }

  function deleteOrder(index) {
    let orders = JSON.parse(sessionStorage.getItem("orders")) || [];
    orders.splice(index, 1);
    sessionStorage.setItem("orders", JSON.stringify(orders));
    loadOrders(); // Refresh table
  }
