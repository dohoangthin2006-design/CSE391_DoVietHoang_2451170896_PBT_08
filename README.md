# 📑 BÁO CÁO KẾT QUẢ PHIẾU BÀI TẬP 08
## **Môn học: Nền tảng Phát triển Web (CSE391)**
### **Chủ đề: JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS**

---

## 👤 Thông tin sinh viên
* **Họ và tên:** Đỗ Việt Hoàng
* **Mã số sinh viên (MSSV):** 2451170896
* **Lớp:** 66KTPM2
* **Dự án liên kết:** Hệ thống E-Commerce (BTL)

---

## 📊 Tổng quan tiến độ nộp bài

| Thành phần | File/Thư mục | Trạng thái | Ghi chú |
| :--- | :--- | :---: | :--- |
| **Phần A + C** | `answers.md` | 🟩 Hoàn thành | Đầy đủ lý thuyết Hoisting, lý giải vòng lặp `var`/`let`, refactor chuỗi hàm và tự thiết kế `miniArray`. |
| **Bài B1** | `product_manager.js` | 🟩 Hoàn thành | Quản lý sản phẩm thuần thục qua các hàm chức năng `filter`, `map`, `reduce`, `sort`, `find`. |
| **Bài B2** | `shopping_cart.js` | 🟩 Hoàn thành | Module giỏ hàng đóng gói hoàn hảo bằng Closure Pattern, bảo mật dữ liệu tĩnh, định dạng bảng. |
| **Bài B3** | `higher_order.js` | 🟩 Hoàn thành | Làm chủ lập trình hàm nâng cao với `pipe`, `memoize`, `debounce`, và hàm bất đồng bộ `retry`. |
| **Minh chứng** | `screenshots/` | 🟩 Hoàn thành | Ảnh chụp cấu trúc dữ liệu hiển thị trên Node.js Terminal và Browser Console. |
| **Video OBS** | `videos/PBT08_...mp4` | 🟩 Hoàn thành | Video dài 10-15 phút, giải thích chuyên sâu cơ chế hoạt động của Closure và hàm `reduce`. |

---

## 🛠️ Phân tích kiến trúc mã nguồn & Giải pháp kỹ thuật

### 1. Xử lý tập hợp nâng cao bằng Array Methods (`product_manager.js`)
* Loại bỏ hoàn toàn tư duy sử dụng vòng lặp truyền thống (`for`/`while`) để chuyển dịch sang phong cách lập trình hàm (Declarative Programming).
* **Thuật toán tìm sản phẩm rẻ nhất theo danh mục (`cheapestByCategory`):** Khai thác sức mạnh của `reduce()`, tích lũy dữ liệu vào một đối tượng trống dạng bộ đếm. Ở mỗi bước lặp, thuật toán so sánh thuộc tính `price` để liên tục ghi đè phần tử tối ưu, giúp giảm độ phức tạp tính toán xuống còn đúng $O(n)$.
* **Định dạng dữ liệu (`formatProductList`):** Sử dụng `map()` kết hợp hàm `.toLocaleString('vi-VN')` biến đổi các con số thô thành chuỗi tiền tệ trực quan có kèm ký tự đơn vị `đ`.

### 2. Thiết kế Module bảo mật bằng Closure Pattern (`shopping_cart.js`)
* **Kiến trúc dữ liệu ẩn (Private State):** Mảng chứa các sản phẩm `items` và thông tin mã giảm giá `discountInfo` được khai báo trực tiếp bên trong phạm vi scope của hàm `createCart()`. Do đó, không một tác vụ bên ngoài nào có thể can thiệp hay sửa đổi trực tiếp dữ liệu (ví dụ: `cart.items = []` sẽ gây lỗi), loại bỏ hoàn toàn ô nhiễm biến toàn cục (Global Scope Pollution).
* Giao tiếp ra ngoài hoàn toàn thông qua các phương thức (Methods) được bọc trong đối tượng trả về, đảm bảo tính đóng gói tuyệt đối (Encapsulation) giống với lập trình hướng đối tượng nhưng chạy bằng cơ chế Lexical Scope nguyên bản của JavaScript.

### 3. Kỹ thuật Lập trình hàm bậc cao (Higher-Order Functions) (`higher_order.js`)
* **Hàm `pipe(...fns)`:** Sử dụng `reduce()` trên tập hợp các hàm tham số đầu vào. Giá trị tích lũy (accumulator) của bước trước chính là tham số đầu vào cho hàm xử lý kế tiếp, tạo ra chuỗi xử lý dòng chảy dữ liệu mượt mà từ trái qua phải.
* **Hàm `memoize(fn)`:** Khởi tạo một cấu trúc dữ liệu `Map()` nội bộ làm bộ nhớ đệm (Cache Storage). Chuyển đổi mảng các đối số thành chuỗi JSON bằng `JSON.stringify(args)` để làm khóa phân biệt (Key). Nếu khóa đã tồn tại, hàm lập tức trả về kết quả cũ mà không cần tính toán lại, tối ưu hóa tuyệt đối cho các tác vụ nặng (như thuật toán đệ quy hoặc tính toán ma trận lớn).
* **Hàm `debounce(fn, delay)`:** Ứng dụng biến cờ hiệu `timeoutId` để theo dõi hàng đợi thời gian. Bất kể khi nào hàm được kích hoạt liên tục, lệnh `clearTimeout(timeoutId)` sẽ được gọi để xóa bỏ bộ đếm cũ và thiết lập lại bộ đếm mới. Hàm thực sự chỉ được chạy khi người dùng ngừng tương tác đủ một khoảng thời gian `delay` chỉ định (ứng dụng kinh điển trong tối ưu hóa sự kiện ô tìm kiếm `keyup`).

---

## 🔍 Báo cáo sửa lỗi & Rà soát chất lượng (Self-Review)

Trong quá trình xây dựng hệ thống, các ranh giới kiến thức giữa các phiên bản ES5 và ES6+ đã được đưa ra phân tích để ngăn chặn mã nguồn chạy sai lệch logic:

### Lỗi tham chiếu nông (Shallow Copy Gotcha) của toán tử Spread
* **Lỗi phát hiện:** Khi nhân bản cấu trúc đối tượng thông qua cú pháp phân rã: `const copy = { ...product };`, hệ thống chỉ sao chép được các trường dữ liệu nguyên bản ở tầng cao nhất (Primitive types). 
* **Hệ quả:** Đối tượng specs bên trong (`specs: { ram: 8, ... }`) thực chất vẫn giữ nguyên con trỏ tham chiếu đến vùng nhớ cũ trong RAM. Do đó, câu lệnh chỉnh sửa dữ liệu tầng sâu `copy.specs.ram = 16;` đã trực tiếp làm thay đổi luôn cả giá trị của đối tượng gốc `product.specs.ram` thành 16, tạo ra tác dụng phụ ngoài ý muốn (Side Effects).
* **Biện pháp khắc phục:** Thực hiện sao chép sâu (Deep Copy) đối với các đối tượng lồng nhau bằng cách giải phóng tham chiếu tầng sâu: `const copy = { ...product, specs: { ...product.specs } };` hoặc áp dụng hàm tiêu chuẩn `structuredClone(product)`.

### Tái cấu trúc mã nguồn cũ (Refactoring Uglified Code) ở câu C1
* **Mã nguồn cũ:** Sử dụng các vòng lặp `for` lồng nhau để lọc dữ liệu và áp dụng thuật toán sắp xếp nổi bọt (Bubble Sort) thủ công với độ phức tạp $O(n^2)$, làm suy giảm nghiêm trọng hiệu năng của ứng dụng.
* **Biện pháp khắc phục:** Rút gọn toàn bộ logic xuống còn 6 dòng code sạch, áp dụng cơ chế nối chuỗi phương thức liên tục (Method Chaining):
  ```javascript
  const processOrders = (orders) => 
      orders
          .filter(({ status, total }) => status === "completed" && total > 100000)
          .map(({ id, customer, total }) => ({
              id, customer, total,
              discount: total * 0.1,
              finalTotal: total * 0.9
          }))
          .sort((a, b) => b.finalTotal - a.finalTotal);
