// Xử lý sự kiện form đăng ký
document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Lưu thông tin đăng ký vào localStorage (đồng bộ hóa)
  localStorage.setItem('fullname', fullname);
  localStorage.setItem('email', email);
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);

  // Chuyển hướng đến trang đăng nhập
  window.location.href = 'login.html';
});

// Xử lý sự kiện đăng ký với Google và Zalo (giả lập)
document.getElementById('google-register').addEventListener('click', function() {
  alert('Đăng ký với Google đang được phát triển!');
});

document.getElementById('zalo-register').addEventListener('click', function() {
  alert('Đăng ký với Zalo đang được phát triển!');
});

// Xử lý sự kiện hiển thị/ẩn mật khẩu
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