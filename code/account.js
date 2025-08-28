// Lấy các phần tử DOM
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalInput = document.getElementById('modal-input');
const modalForm = document.getElementById('modal-form');
const closeModal = document.getElementById('close-modal');

// Các phần tử thông tin
const userName = document.getElementById('user-name');
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