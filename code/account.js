// Lấy các phần tử DOM
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalInput = document.getElementById('modal-input');
const modalForm = document.getElementById('modal-form');
const closeModal = document.getElementById('close-modal');

// Các phần tử thông tin
const userName = document.getElementById('no-update');
const userEmail = document.getElementById('user-email');
const userPhone = document.getElementById('user-phone');
const bankName = document.getElementById('bank-name');
const bankAccount = document.getElementById('bank-account');
const shippingAddress = document.getElementById('shipping-address');

// Nút chỉnh sửa
const editUserInfo = document.getElementById('edit-user-info');
const editBankInfo = document.getElementById('edit-bank-info');
const editShippingInfo = document.getElementById('edit-shipping-info');

// Biến lưu trạng thái chỉnh sửa
let currentEditField = null;

// Hàm mở modal
function openModal(title, currentValue) {
  modalTitle.textContent = title;
  modalInput.value = currentValue;
  modal.style.display = 'flex';
}

// Hàm đóng modal
function closeModalHandler() {
  modal.style.display = 'none';
}

// Xử lý lưu thay đổi
modalForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const newValue = modalInput.value;

  if (currentEditField) {
    currentEditField.textContent = newValue;

    // Cập nhật thông tin trong localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    if (currentEditField === userName) userInfo.name = newValue;
    if (currentEditField === userEmail) userInfo.email = newValue;
    if (currentEditField === userPhone) userInfo.phone = newValue;
    if (currentEditField === bankName) userInfo.bankName = newValue;
    if (currentEditField === bankAccount) userInfo.bankAccount = newValue;
    if (currentEditField === shippingAddress) userInfo.shippingAddress = newValue;

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }

  closeModalHandler();
});

// Đóng modal khi nhấn nút hủy
closeModal.addEventListener('click', closeModalHandler);

// Xử lý chỉnh sửa thông tin người dùng
editUserInfo.addEventListener('click', function () {
  currentEditField = userName;
  openModal('Thay đổi thông tin người dùng', userName.textContent);
});

// Xử lý chỉnh sửa liên kết ngân hàng
editBankInfo.addEventListener('click', function () {
  currentEditField = bankName;
  openModal('Thay đổi liên kết ngân hàng', bankName.textContent);
});

// Xử lý chỉnh sửa địa chỉ giao hàng
editShippingInfo.addEventListener('click', function () {
  currentEditField = shippingAddress;
  openModal('Thay đổi địa chỉ giao hàng', shippingAddress.textContent);
});

// Tự động cập nhật thông tin từ localStorage khi tải trang
document.addEventListener('DOMContentLoaded', function () {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo) {
    userName.textContent = userInfo.name || "Chưa cập nhật";
    userEmail.textContent = userInfo.email || "Chưa cập nhật";
    userPhone.textContent = userInfo.phone || "Chưa cập nhật";
    bankName.textContent = userInfo.bankName || "Chưa cập nhật";
    bankAccount.textContent = userInfo.bankAccount || "Chưa cập nhật";
    shippingAddress.textContent = userInfo.shippingAddress || "Chưa cập nhật";
  }
});