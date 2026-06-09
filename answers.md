# PHIẾU BÀI TẬP 08 — ĐÁP ÁN PHẦN A & C

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Function Declaration vs Expression vs Arrow

```javascript
// 1. Function Declaration
function tinhThueBaoHiem_Declaration(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue,
    thuc_nhan: luong - thue,
  };
}

// 2. Function Expression
const tinhThueBaoHiem_Expression = function (luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue,
    thuc_nhan: luong - thue,
  };
};

// 3. Arrow Function
const tinhThueBaoHiem_Arrow = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue,
    thuc_nhan: luong - thue,
  };
};
```

**Giải thích Hoisting:**

- **Function Declaration** được hoisted hoàn toàn — có thể gọi TRƯỚC khi khai báo:

  ```javascript
  console.log(tinhThueBaoHiem_Declaration(15000000)); // ✅ Chạy được
  function tinhThueBaoHiem_Declaration(luong) { ... }
  ```

- **Function Expression & Arrow Function** KHÔNG được hoisted — chỉ có tên biến được hoisted với giá trị `undefined`:
  ```javascript
  console.log(tinhThueBaoHiem_Expression(15000000)); // ❌ TypeError: not a function
  const tinhThueBaoHiem_Expression = function(luong) { ... };
  ```

---

### Câu A2 — Scope & Closure

**Đoạn 1 — Dự đoán output:**

```
1   ← c.increment() → count: 0→1
2   ← c.increment() → count: 1→2
3   ← c.increment() → count: 2→3
2   ← c.decrement() → count: 3→2
2   ← c.getCount()  → count vẫn là 2
```

**Đoạn 2 — Dự đoán output (sau 200ms):**

```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

**Giải thích `var` vs `let` trong setTimeout:**

- **`var`** có function scope (hoặc global scope) — chỉ có 1 biến `i` duy nhất được chia sẻ cho cả 3 callback. Khi setTimeout chạy sau 100ms, vòng lặp đã kết thúc và `i = 3`, nên cả 3 in ra `3`.

- **`let`** có block scope — mỗi lần lặp tạo ra 1 biến `j` mới, riêng biệt. Mỗi callback closure "nhớ" giá trị `j` của lần lặp đó, nên in ra đúng `0`, `1`, `2`.

---

### Câu A3 — Array Methods (1 dòng mỗi câu)

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const soChans = nums.filter((n) => n % 2 === 0); // [2,4,6,8,10]

// 2. Nhân mỗi số với 3
const nhan3 = nums.map((n) => n * 3); // [3,6,9,...,30]

// 3. Tính tổng
const tong = nums.reduce((acc, n) => acc + n, 0); // 55

// 4. Tìm số đầu tiên > 7
const dauTien = nums.find((n) => n > 7); // 8

// 5. Kiểm tra CÓ số > 10 không
const coSoLon = nums.some((n) => n > 10); // false

// 6. Kiểm tra TẤT CẢ đều > 0
const tatCaDuong = nums.every((n) => n > 0); // true

// 7. Tạo mảng chuỗi mô tả chẵn/lẻ
const moTa = nums.map((n) => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
// ["Số 1 là lẻ", "Số 2 là chẵn", ...]

// 8. Đảo ngược (không mutate)
const daoNguoc = [...nums].reverse(); // [10,9,...,1]
```

---

### Câu A4 — Object Destructuring & Spread

**Dự đoán output:**

```javascript
const {
  name,
  price,
  specs: { ram, color },
} = product;
console.log(name, price, ram, color);
// → "iPhone 16" 25990000 8 "Titan"

console.log(specs);
// → ReferenceError: specs is not defined
// Lý do: destructuring "specs: { ram, color }" chỉ trích xuất ram và color,
// không tạo biến "specs"

const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price); // → 23990000 (ghi đè giá gốc)
console.log(updated.sale); // → true
console.log(product.price); // → 25990000 (object gốc KHÔNG đổi)

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram); // → 16 (KHÔNG phải 8!)
// Lý do: Spread chỉ copy SHALLOW (nông). Object "specs" lồng bên trong
// vẫn là cùng 1 reference. Khi sửa copy.specs.ram, thực chất đang sửa
// cùng object specs, nên product.specs.ram cũng bị ảnh hưởng.
```

---

## PHẦN C — SUY LUẬN

### Câu C1 — Refactor Code

```javascript
// SAU (clean code — ≤ 10 dòng):
function processOrders(orders) {
  return orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
      id,
      customer,
      total,
      discount: total * 0.1,
      finalTotal: total * 0.9,
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
}
```

**So sánh:**

- Thay `for` loop bằng `.filter()`, `.map()`, `.sort()` — ngắn gọn, rõ ý hơn
- Thay `var` bằng xử lý trong `.map()` — không cần biến trung gian `item`
- Bubble sort O(n²) → `.sort()` built-in (O(n log n))
- Destructuring trong tham số giúp code self-documenting

---

### Câu C2 — miniArray implementation

```javascript
const miniArray = {
  map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i, arr));
    }
    return result;
  },

  filter(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i], i, arr)) result.push(arr[i]);
    }
    return result;
  },

  reduce(arr, fn, initialValue) {
    let acc = initialValue;
    let startIndex = 0;

    // Nếu không truyền initialValue → dùng phần tử đầu làm accumulator
    if (acc === undefined) {
      acc = arr[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < arr.length; i++) {
      acc = fn(acc, arr[i], i, arr);
    }
    return acc;
  },
};

// Test:
console.log(miniArray.map([1, 2, 3], (x) => x * 2)); // → [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], (x) => x > 2)); // → [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10
```
