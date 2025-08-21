// Đăng ký với Google
document.getElementById('google-register').addEventListener('click', function () {
  alert('Đang chuyển hướng đến Google để đăng ký...');
  // Tích hợp Google OAuth 2.0
  window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email profile';
});

// Đăng ký với Zalo
document.getElementById('zalo-register').addEventListener('click', function () {
  alert('Đang chuyển hướng đến Zalo để đăng ký...');
  // Tích hợp Zalo OAuth
  window.location.href = 'https://oauth.zaloapp.com/v3/auth?app_id=YOUR_ZALO_APP_ID&redirect_uri=YOUR_REDIRECT_URI&state=YOUR_STATE';
});

// Xử lý hiển thị/ẩn mật khẩu
document.querySelectorAll('.toggle-password').forEach((toggle) => {
  toggle.addEventListener('click', function () {
    const targetId = this.getAttribute('data-target');
    const passwordField = document.getElementById(targetId);

    // Kiểm tra trạng thái hiện tại và thay đổi
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      this.classList.remove('fa-eye');
      this.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'password';
      this.classList.remove('fa-eye-slash');
      this.classList.add('fa-eye');
    }
  });
});

// Xử lý sự kiện đăng ký
document.getElementById('register-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngăn form gửi đi

  // Lấy giá trị từ các trường nhập liệu
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  // Kiểm tra nếu bỏ trống
  if (!username || !email || !password || !confirmPassword) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Email không hợp lệ!');
    return;
  }

  // Kiểm tra mật khẩu và xác nhận mật khẩu
  if (password !== confirmPassword) {
    alert('Mật khẩu và xác nhận mật khẩu không khớp!');
    return;
  }

  // Kiểm tra độ dài mật khẩu
  if (password.length < 6) {
    alert('Mật khẩu phải có ít nhất 6 ký tự!');
    return;
  }

  // Lưu thông tin người dùng vào LocalStorage
  try {
    const user = {
      username: username,
      email: email,
      password: password,
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    window.location.href = 'login.html'; // Chuyển hướng sang trang đăng nhập
  } catch (error) {
    console.error('Lỗi khi lưu thông tin người dùng:', error);
    alert('Đã xảy ra lỗi khi lưu thông tin. Vui lòng thử lại!');
  }
});