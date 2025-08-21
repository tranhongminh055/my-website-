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

// Lấy các phần tử cần thiết
const toggleVoucherButton = document.getElementById('toggle-voucher-list');
const voucherList = document.getElementById('voucher-list');
const voucherInput = document.getElementById('voucher-code');
const applyVoucherButton = document.getElementById('apply-voucher');
const subtotalElement = document.getElementById('subtotal');
const discountElement = document.getElementById('discount');
const totalElement = document.getElementById('total');
const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
const creditCardForm = document.getElementById('credit-card-form');
const bankTransferForm = document.getElementById('bank-transfer-form');
const checkoutButton = document.getElementById('checkout');

// Lấy giỏ hàng từ LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContent = document.querySelector('.cart-content');

// Danh sách voucher mẫu
const vouchers = {
    "SALE10": 0.1, // Giảm 10%
    "SALE20": 0.2, // Giảm 20%
    "FREESHIP": 50000 // Giảm 50,000 VND
};

// Cập nhật tổng tiền
function updateTotal() {
    const subtotal = cart.reduce((total, item) => {
        return total + parseFloat(item.price.replace(/[^0-9]/g, '')) * item.quantity;
    }, 0);

    document.getElementById('subtotal').textContent = `${subtotal.toLocaleString()} VND`;
    document.getElementById('total').textContent = `${subtotal.toLocaleString()} VND`;
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
applyVoucherButton.addEventListener('click', function () {
    const voucherCode = voucherInput.value.trim().toUpperCase();
    const subtotal = parseInt(document.getElementById('subtotal').textContent.replace(/[^0-9]/g, ''));

    if (vouchers[voucherCode]) {
        let discount = 0;
        if (vouchers[voucherCode] < 1) {
            discount = subtotal * vouchers[voucherCode];
        } else {
            discount = vouchers[voucherCode];
        }
        document.getElementById('discount').textContent = `${discount.toLocaleString()} VND`;
        const total = subtotal - discount;
        document.getElementById('total').textContent = `${total.toLocaleString()} VND`;
        alert('Áp dụng voucher thành công!');
    } else {
        alert('Mã voucher không hợp lệ!');
    }
});

// Hiển thị form thanh toán tương ứng
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
checkoutButton.addEventListener('click', function () {
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

        alert('Thanh toán thành công bằng thẻ tín dụng!');
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

// Hiển thị giỏ hàng
function renderCart() {
    if (cart.length === 0) {
        // Nếu giỏ hàng trống, hiển thị thông báo
        cartContent.innerHTML = `
            <div class="empty-cart">
                <h2>Giỏ hàng của bạn đang trống</h2>
                <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.</p>
                <a href="index.html" class="btn-continue-shopping">Tiếp tục mua sắm</a>
            </div>
        `;
        subtotalElement.textContent = '0 VND';
        totalElement.textContent = '0 VND';
        return;
    }

    // Nếu giỏ hàng có sản phẩm, hiển thị danh sách sản phẩm
    let cartHTML = `
        <div class="cart-items">
            <div class="cart-header">
                <div class="header-info">Sản phẩm</div>
                <div class="header-price">Giá</div>
                <div class="header-quantity">Số lượng</div>
                <div class="header-total">Tổng</div>
                <div class="header-action">Thao tác</div>
            </div>
    `;

    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="item-info">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <h3>${item.name}</h3>
                </div>
                <div class="item-price">${item.price.toLocaleString()} VND</div>
                <div class="quantity-control">
                    <button class="decrease">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="item-quantity">
                    <button class="increase">+</button>
                </div>
                <div class="item-total">${(item.price * item.quantity).toLocaleString()} VND</div>
                <div class="item-remove">
                    <button class="remove-item"><i class="fas fa-trash"></i> Xóa</button>
                </div>
            </div>
        `;
    });

    cartHTML += `</div>`;
    cartContent.innerHTML = cartHTML;

    // Thêm sự kiện cho các nút tăng/giảm số lượng và xóa sản phẩm
    addCartEventListeners();
    updateTotal();
}

// Cập nhật tổng tiền
function updateTotal() {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    subtotalElement.textContent = `${subtotal.toLocaleString()} VND`;
    totalElement.textContent = `${subtotal.toLocaleString()} VND`;
}

// Áp dụng voucher
applyVoucherButton.addEventListener('click', function () {
    const voucherCode = voucherInput.value.trim().toUpperCase();
    const subtotal = parseInt(document.getElementById('subtotal').textContent.replace(/[^0-9]/g, ''));

    if (vouchers[voucherCode]) {
        let discount = 0;
        if (vouchers[voucherCode] < 1) {
            discount = subtotal * vouchers[voucherCode];
        } else {
            discount = vouchers[voucherCode];
        }
        document.getElementById('discount').textContent = `${discount.toLocaleString()} VND`;
        const total = subtotal - discount;
        document.getElementById('total').textContent = `${total.toLocaleString()} VND`;
        alert('Áp dụng voucher thành công!');
    } else {
        alert('Mã voucher không hợp lệ!');
    }
});

// Thêm sự kiện cho các nút tăng/giảm số lượng và xóa sản phẩm
function addCartEventListeners() {
    document.querySelectorAll('.decrease').forEach((button, index) => {
        button.addEventListener('click', function () {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        });
    });

    document.querySelectorAll('.increase').forEach((button, index) => {
        button.addEventListener('click', function () {
            cart[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    document.querySelectorAll('.remove-item').forEach((button, index) => {
        button.addEventListener('click', function () {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });
}

// Hiển thị giỏ hàng khi tải trang
renderCart();

