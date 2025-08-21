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

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngăn form gửi đi và reload trang

  // Lấy giá trị từ các trường nhập liệu
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Kiểm tra nếu bỏ trống
  if (!username || !password) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  // Lấy thông tin người dùng từ LocalStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Kiểm tra thông tin đăng nhập
  if (!user || user.username !== username || user.password !== password) {
    alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    return;
  }

  // Nếu thông tin hợp lệ, chuyển hướng đến trang chủ
  alert('Đăng nhập thành công!');
  window.location.href = 'index.html'; // Chuyển hướng sang trang chủ
});