// Lấy các phần tử cần thiết
const cartItemsContainer = document.querySelector('.cart-items'); // chỉ render sản phẩm
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
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Giỏ hàng của bạn đang trống</h2>
                <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.</p>
                <a href="index.html" class="btn-continue-shopping">Tiếp tục mua sắm</a>
            </div>
        `;
        subtotalElement.textContent = '0 VND';
        totalElement.textContent = '0 VND';
        discountElement.textContent = '0 VND';
        return;
    }

    let cartHTML = `
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

    cartItemsContainer.innerHTML = cartHTML;

    // Thêm sự kiện
    addCartEventListeners();
    updateTotal();
}

// Cập nhật tổng tiền
function updateTotal() {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    subtotalElement.textContent = `${subtotal.toLocaleString()} VND`;

    const discount = parseInt(discountElement.textContent.replace(/[^0-9]/g, '')) || 0;
    let total = subtotal - discount;
    if (total < 0) total = 0; // không cho âm
    totalElement.textContent = `${total.toLocaleString()} VND`;
}

// Thêm sự kiện cho nút
function addCartEventListeners() {
    document.querySelectorAll('.increase').forEach((button, index) => {
        button.addEventListener('click', () => {
            cart[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    document.querySelectorAll('.decrease').forEach((button, index) => {
        button.addEventListener('click', () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        });
    });

    document.querySelectorAll('.remove-item').forEach((button, index) => {
        button.addEventListener('click', () => {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });
}

// Sự kiện chọn voucher từ danh sách
document.querySelectorAll('#voucher-list li[data-voucher]').forEach(voucherItem => {
    voucherItem.addEventListener('click', function () {
        const code = voucherItem.getAttribute('data-voucher');
        voucherInput.value = code;
        voucherList.classList.add('hidden');
        applyVoucherButton.click(); // Tự động áp dụng voucher khi chọn
    });
});

// Sự kiện toggle danh sách voucher
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

// Sự kiện áp dụng voucher
applyVoucherButton.addEventListener('click', function () {
    const voucherCode = voucherInput.value.trim().toUpperCase();
    const subtotal = parseInt(subtotalElement.textContent.replace(/[^0-9]/g, '')) || 0;

    // Điều kiện cho từng loại voucher
    if (voucherCode === "SALE10" || voucherCode === "SALE20" || voucherCode === "FREESHIP") {
        let discount = 0;
        if (voucherCode === "SALE10") discount = subtotal * 0.1;
        else if (voucherCode === "SALE20") discount = subtotal * 0.2;
        else if (voucherCode === "FREESHIP") discount = 50000;

        discountElement.textContent = `${discount.toLocaleString()} VND`;
        totalElement.textContent = `${(subtotal - discount).toLocaleString()} VND`;
        alert('Áp dụng voucher thành công!');
    } else if (voucherCode === "SALE50") {
        alert("Voucher đã hết hạn!");
        discountElement.textContent = "0 VND";
        totalElement.textContent = `${subtotal.toLocaleString()} VND`;
    } else if (voucherCode === "NEWYEAR") {
        if (subtotal < 5000000) {
            alert("Voucher chỉ áp dụng cho đơn hàng trên 5,000,000 VND!");
            discountElement.textContent = "0 VND";
            totalElement.textContent = `${subtotal.toLocaleString()} VND`;
        } else {
            // Ví dụ: giảm 500,000 VND nếu đủ điều kiện
            discountElement.textContent = "500,000 VND";
            totalElement.textContent = `${(subtotal - 500000).toLocaleString()} VND`;
            alert('Áp dụng voucher thành công!');
        }
    } else {
        alert("Mã voucher không hợp lệ!");
        discountElement.textContent = "0 VND";
        totalElement.textContent = `${subtotal.toLocaleString()} VND`;
    }
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

// Thanh toán
checkoutButton.addEventListener('click', () => {
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

// Xử lý khi bấm nút Mua hàng
checkoutButton.addEventListener('click', function () {
    const customerName = document.getElementById('customer-name').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();

    // Kiểm tra thông tin khách hàng
    if (!customerName || !customerPhone || !customerAddress) {
        alert('Vui lòng nhập đầy đủ thông tin khách hàng!');
        return;
    }

    // Lấy thông tin giỏ hàng
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = 50000; // Ví dụ giảm giá cố định
    const total = subtotal - discount;

    // Lưu thông tin vào LocalStorage
    const orderData = {
        orderId: `#${Math.floor(Math.random() * 1000000000)}`, // Tạo mã đơn hàng ngẫu nhiên
        orderDate: new Date().toLocaleDateString(),
        confirmTime: "30 phút sau khi đặt hàng",
        deliveryTime: "2-3 ngày làm việc",
        products: cart,
        subtotal: subtotal,
        discount: discount,
        total: total,
        customer: {
            name: customerName,
            phone: customerPhone,
            address: customerAddress,
        },
    };

    localStorage.setItem('orderData', JSON.stringify(orderData));

    // Chuyển sang trang hóa đơn
    window.location.href = 'hoadonxacnhan.html';
});

// Tích hợp Google Maps API
let map, autocomplete, marker;

function initMap() {
    // Khởi tạo bản đồ
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 10.762622, lng: 106.660172 }, // Tọa độ mặc định (TP.HCM)
        zoom: 15,
    });

    // Khởi tạo autocomplete cho ô nhập địa chỉ
    const input = document.getElementById("customer-address");
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);

    // Marker để hiển thị vị trí trên bản đồ
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
    });

    // Khi người dùng chọn địa chỉ từ autocomplete
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
            alert("Không tìm thấy vị trí!");
            return;
        }

        // Cập nhật vị trí marker và bản đồ
        map.setCenter(place.geometry.location);
        map.setZoom(15);
        marker.setPosition(place.geometry.location);
    });

    // Khi người dùng kéo marker
    google.maps.event.addListener(marker, "dragend", () => {
        const position = marker.getPosition();
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: position }, (results, status) => {
            if (status === "OK" && results[0]) {
                input.value = results[0].formatted_address;
            }
        });
    });
}

// Load Google Maps API
function loadGoogleMapsAPI() {
    const script = document.createElement("script");
    script.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.856217469708!2d105.81945431533262!3d21.00311799396345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8d5f5b5b9f%3A0x5f5b5b9f5b5b5b9f!2zMTIzIMSQxrDhu51uZyBMw6FuZywgxJDhu5NuZyDEkOG6r2EsIEjDoCBO4buZaQ!5e0!3m2!1sen!2s!4v1692431234567!5m2!1sen!2s`;
    script.async = true;
    document.head.appendChild(script);
}

// Gọi hàm load Google Maps API khi trang tải
loadGoogleMapsAPI();

// Render khi tải trang
renderCart();

// Nếu muốn khởi tạo giỏ hàng mẫu, hãy sử dụng đoạn này một lần duy nhất hoặc khi cần reset giỏ hàng:
// const sampleCart = [
//     {
//         name: "Áo thun nam",
//         quantity: 2,
//         price: 150000,
//         image: "path/to/image1.jpg",
//     },
//     {
//         name: "Quần jeans nữ",
//         quantity: 1,
//         price: 350000,
//         image: "path/to/image2.jpg",
//     },
// ];
// localStorage.setItem('cart', JSON.stringify(sampleCart));
