// Lấy dữ liệu từ LocalStorage
const orderData = JSON.parse(localStorage.getItem('orderData'));

// Kiểm tra nếu không có dữ liệu
if (!orderData) {
    alert('Không tìm thấy thông tin đơn hàng!');
    window.location.href = 'giohang.html'; // Quay lại giỏ hàng nếu không có dữ liệu
}

// Tạo thời gian giao hàng ngẫu nhiên (2-5 ngày)
const randomDeliveryDays = Math.floor(Math.random() * 4) + 2; // Ngẫu nhiên từ 2 đến 5
const deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate() + randomDeliveryDays);
const formattedDeliveryDate = deliveryDate.toLocaleDateString();

// Thời gian xác nhận tạo bằng local storage
const randomConfirmMinutes = Math.floor(Math.random() * 30) + 1; // Ngẫu nhiên từ 1 đến 30 phút
const confirmTime = `${randomConfirmMinutes} 11 : 30 : 09   AM`;  // Giả sử xác nhận sau 1-30 phút

// Hiển thị thông tin đơn hàng
document.getElementById("order-date").textContent = orderData.orderDate;
document.getElementById("confirm-time").textContent = orderData.confirmTime;
document.getElementById("delivery-time").textContent = formattedDeliveryDate;

// Hiển thị danh sách sản phẩm
const productTable = document.getElementById("product-table");
orderData.products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            ${product.name}
        </td>
        <td>${product.quantity}</td>
        <td>${product.price.toLocaleString()} VND</td>
        <td>${(product.quantity * product.price).toLocaleString()} VND</td>
    `;
    productTable.appendChild(row);
});

// Hiển thị tổng tiền
document.getElementById("subtotal").textContent = `${orderData.subtotal.toLocaleString()} VND`;
document.getElementById("discount").textContent = `${orderData.discount.toLocaleString()} VND`;
document.getElementById("total").textContent = `${orderData.total.toLocaleString()} VND`;

// Hiển thị thông tin khách hàng
document.getElementById("customer-name").textContent = orderData.customer.name;
document.getElementById("customer-phone").textContent = orderData.customer.phone;
document.getElementById("customer-address").textContent = orderData.customer.address;

// Nút quay lại
function goBack() {
    window.location.href = 'giohang.html';
}