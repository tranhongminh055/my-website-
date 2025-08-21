// Danh sách sản phẩm mẫu
const products = [
    "Nike Air Max 2025",
    "Adidas UltraBoost",
    "Adidas Sport",
    "Adidas American",
    "Adidas Premium",
    "Adidas Gold",
    "Converse Classic",
    "Vans Old Skool",
    "Adidas football",
    "Shoe Classic",
    "Biti's Premium",
    "Adidas Silver"
];

// Lấy các phần tử DOM
const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('search-suggestions');

// Xử lý sự kiện nhập liệu
searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim().toLowerCase();

    // Nếu không có nội dung tìm kiếm, ẩn danh sách gợi ý
    if (!query) {
        suggestionsList.style.display = 'none';
        return;
    }

    // Lọc danh sách sản phẩm dựa trên từ khóa
    const suggestions = products.filter(product =>
        product.toLowerCase().includes(query)
    );

    // Hiển thị danh sách gợi ý
    renderSuggestions(suggestions);
});

// Hàm hiển thị danh sách gợi ý
function renderSuggestions(suggestions) {
    // Xóa danh sách gợi ý cũ
    suggestionsList.innerHTML = '';

    // Nếu không có gợi ý, ẩn danh sách
    if (suggestions.length === 0) {
        suggestionsList.style.display = 'none';
        return;
    }

    // Tạo danh sách gợi ý mới
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;

        // Xử lý sự kiện khi nhấn vào gợi ý
        li.addEventListener('click', function () {
            searchInput.value = suggestion; // Điền gợi ý vào thanh tìm kiếm
            suggestionsList.style.display = 'none'; // Ẩn danh sách gợi ý
        });

        suggestionsList.appendChild(li);
    });

    // Hiển thị danh sách gợi ý
    suggestionsList.style.display = 'block';
}

// Ẩn danh sách gợi ý khi nhấn ra ngoài
document.addEventListener('click', function (event) {
    if (!searchInput.contains(event.target) && !suggestionsList.contains(event.target)) {
        suggestionsList.style.display = 'none';
    }
});

// Lấy các nút "Mua ngay"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Lấy giỏ hàng từ LocalStorage hoặc khởi tạo giỏ hàng trống
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cập nhật số lượng sản phẩm trong giỏ hàng (hiển thị trên icon giỏ hàng)
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Thêm sự kiện cho các nút "Mua ngay"
addToCartButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseInt(productCard.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
        const productImage = productCard.querySelector('img').src;

        // Tạo đối tượng sản phẩm
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1; // Tăng số lượng nếu đã có
        } else {
            cart.push(product); // Thêm sản phẩm mới
        }

        // Lưu giỏ hàng vào LocalStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Cập nhật số lượng sản phẩm trong giỏ hàng
        updateCartCount();
        alert(`Đã thêm "${productName}" vào giỏ hàng!`);
    });
});

// Cập nhật số lượng sản phẩm khi tải trang
updateCartCount();