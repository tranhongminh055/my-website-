// Đăng nhập với Google
document.getElementById('google-login').addEventListener('click', function () {
  alert('Đang chuyển hướng đến Google để đăng nhập...');
  // Tích hợp Google OAuth 2.0
  window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email profile';
});

// Đăng nhập với Zalo
document.getElementById('zalo-login').addEventListener('click', function () {
  alert('Đang chuyển hướng đến Zalo để đăng nhập...');
  // Tích hợp Zalo OAuth
  window.location.href = 'https://oauth.zaloapp.com/v3/auth?app_id=YOUR_ZALO_APP_ID&redirect_uri=YOUR_REDIRECT_URI&state=YOUR_STATE';
});

// Xử lý hiển thị/ẩn mật khẩu
document.getElementById('toggle-password').addEventListener('click', function() {
  const passwordInput = document.getElementById('password');
  const icon = this;

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
});

// Xử lý sự kiện form đăng nhập
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  // Lấy thông tin từ localStorage
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  // Kiểm tra thông tin đăng nhập
  if (usernameInput === storedUsername && passwordInput === storedPassword) {
    alert('Đăng nhập thành công!');
    // Chuyển hướng đến trang chính (ví dụ: index.html)
    window.location.href = 'index.html';
  } else {
    alert('Tên đăng nhập hoặc mật khẩu không đúng!');
  }
});