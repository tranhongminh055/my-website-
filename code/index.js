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