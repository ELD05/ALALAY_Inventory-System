// Login state
var loggedIn = false;
var currentUser = null;

// Initialize login screen and auth check
document.addEventListener('DOMContentLoaded', function() {
  var loginScreen = document.getElementById('login-screen');
  var loginForm = document.getElementById('login-form');

  // Default credentials for demo
  var validUsers = {
    'admin': 'admin123',
    'user': 'user123'
  };

  // Handle login form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (validUsers[username] && validUsers[username] === password) {
      loggedIn = true;
      currentUser = username;
      // Store session in localStorage
      localStorage.setItem('alalay_loggedIn', 'true');
      localStorage.setItem('alalay_user', username);
      // Redirect to main app
      window.location.href = 'index.html';
    } else {
      alert('Invalid username or password. Please try again.');
      document.getElementById('password').value = '';
    }
  });

  // Allow Enter key to submit
  document.getElementById('password').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      loginForm.dispatchEvent(new Event('submit'));
    }
  });
});