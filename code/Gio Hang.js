// Danh sách sản phẩm mẫu để tìm kiếm
const products = [
  "Adidas UltraBoost",
  "Nike Air Max 2025",
  "Converse Classic",
  "Vans Old Skool",
  "Adidas Premium",
  "Adidas Gold",
  "Adidas Silver"
];

// Danh sách voucher mẫu
const vouchers = {
    "SALE10": 0.1, // Giảm 10%
    "SALE20": 0.2, // Giảm 20%
    "FREESHIP": 50000 // Giảm 50,000 VND
};

// Cập nhật tổng tiền
function updateTotal() {
  const itemPrices = document.querySelectorAll('.item-price');
  const itemQuantities = document.querySelectorAll('.item-quantity');
  let subtotal = 0;

  itemPrices.forEach((price, index) => {
    const quantity = parseInt(itemQuantities[index].value);
    subtotal += parseInt(price.textContent.replace(/,/g, '')) * quantity;
  });

  document.getElementById('subtotal').textContent = subtotal.toLocaleString();
  const discount = parseInt(document.getElementById('discount').textContent.replace(/,/g, '')) || 0;
  const total = subtotal - discount;
  document.getElementById('total').textContent = total.toLocaleString();
}

// Gợi ý tìm kiếm
const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('search-suggestions');

searchInput.addEventListener('input', function () {
  const query = searchInput.value.trim().toLowerCase();
  suggestionsList.innerHTML = ''; // Xóa gợi ý cũ

  if (query) {
    const suggestions = products.filter(product => product.toLowerCase().includes(query));
    suggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      li.addEventListener('click', function () {
        searchInput.value = suggestion;
        suggestionsList.innerHTML = ''; // Ẩn gợi ý sau khi chọn
      });
      suggestionsList.appendChild(li);
    });
    suggestionsList.style.display = 'block';
  } else {
    suggestionsList.style.display = 'none';
  }
});

// Tìm kiếm sản phẩm
document.querySelector('.header-search button').addEventListener('click', function () {
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    const foundProducts = products.filter(product => product.toLowerCase().includes(query));
    if (foundProducts.length > 0) {
      alert(`Tìm thấy sản phẩm: ${foundProducts.join(', ')}`);
    } else {
      alert('Không tìm thấy sản phẩm nào!');
    }
  } else {
    alert('Vui lòng nhập từ khóa tìm kiếm!');
  }
});

// Hiển thị/Ẩn danh sách voucher
const toggleVoucherButton = document.getElementById('toggle-voucher-list');
const voucherList = document.getElementById('voucher-list');
const voucherInput = document.getElementById('voucher-code');

toggleVoucherButton.addEventListener('click', function () {
    voucherList.classList.toggle('hidden');
    const icon = toggleVoucherButton.querySelector('i');
    if (voucherList.classList.contains('hidden')) {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    } else {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    }
});

// Chọn voucher từ danh sách
document.querySelectorAll('.available-vouchers li').forEach(voucher => {
    voucher.addEventListener('click', function () {
        const selectedVoucher = voucher.getAttribute('data-voucher');
        voucherInput.value = selectedVoucher; // Hiển thị mã voucher vào ô nhập
        voucherList.classList.add('hidden'); // Ẩn danh sách voucher
        toggleVoucherButton.querySelector('i').classList.remove('fa-chevron-up');
        toggleVoucherButton.querySelector('i').classList.add('fa-chevron-down');
    });
});

// Áp dụng voucher
document.getElementById('apply-voucher').addEventListener('click', function () {
    const voucherCode = voucherInput.value.trim().toUpperCase();
    const subtotal = parseInt(document.getElementById('subtotal').textContent.replace(/,/g, ''));

    if (vouchers[voucherCode]) {
        let discount = 0;
        if (vouchers[voucherCode] < 1) {
            discount = subtotal * vouchers[voucherCode];
        } else {
            discount = vouchers[voucherCode];
        }
        document.getElementById('discount').textContent = discount.toLocaleString();
        const total = subtotal - discount;
        document.getElementById('total').textContent = total.toLocaleString();
        alert('Áp dụng voucher thành công!');
    } else {
        alert('Mã voucher không hợp lệ!');
    }
});

// Lấy các phần tử liên quan
const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
const creditCardForm = document.getElementById('credit-card-form');
const bankTransferForm = document.getElementById('bank-transfer-form');
const bankList = document.getElementById('bank-list');
const bankLogoContainer = document.getElementById('bank-logo-container');
const bankLogo = document.getElementById('bank-logo');

// Hiển thị logo ngân hàng khi chọn ngân hàng
bankList.addEventListener('change', function () {
    const selectedOption = bankList.options[bankList.selectedIndex];
    const logoSrc = selectedOption.getAttribute('data-logo');

    if (logoSrc) {
        bankLogo.src = logoSrc;
        bankLogo.alt = `Logo ${selectedOption.textContent}`;
        bankLogoContainer.classList.remove('hidden');
    } else {
        bankLogoContainer.classList.add('hidden');
    }
});

// Lắng nghe sự kiện thay đổi phương thức thanh toán
paymentMethods.forEach(method => {
    method.addEventListener('change', function () {
        if (this.value === 'credit-card') {
            creditCardForm.classList.remove('hidden');
            bankTransferForm.classList.add('hidden');
        } else if (this.value === 'bank-transfer') {
            bankTransferForm.classList.remove('hidden');
            creditCardForm.classList.add('hidden');
        } else {
            creditCardForm.classList.add('hidden');
            bankTransferForm.classList.add('hidden');
        }
    });
});

// Xử lý thanh toán
document.getElementById('checkout').addEventListener('click', function () {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedMethod) {
        alert('Vui lòng chọn phương thức thanh toán!');
        return;
    }

    if (selectedMethod.value === 'credit-card') {
        const cardNumber = document.getElementById('card-number').value.trim();
        const cardHolder = document.getElementById('card-holder').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
            alert('Vui lòng nhập đầy đủ thông tin thẻ tín dụng!');
            return;
        }

        alert(`Thanh toán thành công bằng thẻ tín dụng!`);
    } else if (selectedMethod.value === 'bank-transfer') {
        const bank = document.getElementById('bank-list').value;
        const accountNumber = document.getElementById('account-number').value.trim();

        if (!bank || !accountNumber) {
            alert('Vui lòng nhập đầy đủ thông tin chuyển khoản!');
            return;
        }

        alert(`Thanh toán thành công qua ngân hàng ${bank}!`);
    } else if (selectedMethod.value === 'cash-on-delivery') {
        alert('Thanh toán khi nhận hàng đã được chọn!');
    }
});

// Xử lý tăng/giảm số lượng
document.querySelectorAll('.increase').forEach((button, index) => {
  button.addEventListener('click', function () {
    const quantityInput = document.querySelectorAll('.item-quantity')[index];
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotal();
  });
});

document.querySelectorAll('.decrease').forEach((button, index) => {
  button.addEventListener('click', function () {
    const quantityInput = document.querySelectorAll('.item-quantity')[index];
    if (parseInt(quantityInput.value) > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
      updateTotal();
    }
  });
});