// Lấy các phần tử cần thiết
const cartContent = document.querySelector('.cart-content');
const subtotalElement = document.getElementById('subtotal');
const discountElement = document.getElementById('discount');
const totalElement = document.getElementById('total');
const voucherInput = document.getElementById('voucher-code');
const applyVoucherButton = document.getElementById('apply-voucher');
const toggleVoucherButton = document.getElementById('toggle-voucher-list');
const voucherList = document.getElementById('voucher-list');
const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
const creditCardForm = document.getElementById('credit-card-form');
const bankTransferForm = document.getElementById('bank-transfer-form');
const checkoutButton = document.getElementById('checkout');

// Lấy giỏ hàng từ LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Danh sách voucher mẫu
const vouchers = {
    "SALE10": 0.1, // Giảm 10%
    "SALE20": 0.2, // Giảm 20%
    "FREESHIP": 50000 // Giảm 50,000 VND
};

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
                <div>Sản phẩm</div>
                <div>Tên sản phẩm</div>
                <div>Giá</div>
                <div>Số lượng</div>
                <div>Tổng</div>
                <div>Thao tác</div>
            </div>
    `;

    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                </div>
                <div class="item-price">${item.price.toLocaleString()} VND</div>
                <div class="quantity-control">
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

    const discount = parseInt(discountElement.textContent.replace(/[^0-9]/g, '')) || 0;
    const total = subtotal - discount;
    totalElement.textContent = `${total.toLocaleString()} VND`;
}

// Thêm sự kiện cho các nút tăng/giảm số lượng và xóa sản phẩm
function addCartEventListeners() {
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

// Áp dụng voucher
applyVoucherButton.addEventListener('click', function () {
    const voucherCode = voucherInput.value.trim().toUpperCase();
    const subtotal = parseInt(subtotalElement.textContent.replace(/[^0-9]/g, ''));

    if (vouchers[voucherCode]) {
        let discount = 0;
        if (vouchers[voucherCode] < 1) {
            discount = subtotal * vouchers[voucherCode];
        } else {
            discount = vouchers[voucherCode];
        }
        discountElement.textContent = `${discount.toLocaleString()} VND`;
        updateTotal();
        alert('Áp dụng voucher thành công!');
    } else {
        alert('Mã voucher không hợp lệ!');
    }
});

// Hiển thị danh sách voucher
toggleVoucherButton.addEventListener('click', function () {
    voucherList.classList.toggle('hidden');
});

// Hiển thị form thanh toán tương ứng
paymentMethods.forEach(method => {
    method.addEventListener('change', function () {
        // Ẩn tất cả các form trước
        creditCardForm.classList.add('hidden');
        bankTransferForm.classList.add('hidden');

        // Hiển thị form tương ứng với phương thức thanh toán được chọn
        if (this.value === 'credit-card') {
            creditCardForm.classList.remove('hidden');
        } else if (this.value === 'bank-transfer') {
            bankTransferForm.classList.remove('hidden');
        }
    });
});

// Xử lý khi bấm nút Mua hàng
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

// Hiển thị giỏ hàng khi tải trang
renderCart();