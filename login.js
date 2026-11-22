// Login page: sends credentials to the backend instead of checking them in the browser.
var API_URL = "http://localhost:3000/api/login";

document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("login-form");
  var submitBtn = loginForm.querySelector('button[type="submit"]');
  var passwordInput = document.getElementById("password");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var username = document.getElementById("username").value.trim();
    var password = passwordInput.value;

    submitBtn.disabled = true;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            return { ok: res.ok, data: data };
          });
      })
      .then(function (result) {
        if (result.ok && result.data.success) {
          // Keep the same localStorage keys that app.js expects
          localStorage.setItem("alalay_loggedIn", "true");
          localStorage.setItem("alalay_user", result.data.user.username);
          window.location.href = "index.html";
        } else {
          showError(result.data.message || "Login failed. Please try again.");
        }
      })
      .catch(function () {
        showError(
          "Cannot reach the server. Make sure the backend is running at http://localhost:3000.",
        );
      });
  });

  function showError(message) {
    alert(message);
    passwordInput.value = "";
    passwordInput.focus();
    submitBtn.disabled = false;
  }
});
