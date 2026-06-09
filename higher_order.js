// ============================================================
// BÀI B3 — HIGHER-ORDER FUNCTIONS CHALLENGE
// ============================================================

// ── 1. pipe() ─────────────────────────────────────────────
// Nhận nhiều functions, trả về 1 function thực thi chúng lần lượt.
// Kết quả của hàm trước là input của hàm sau.
function pipe(...fns) {
  return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
}

// Test pipe:
const process = pipe(
  (x) => x * 2, // 5  → 10
  (x) => x + 10, // 10 → 20
  (x) => x.toString(), // 20 → "20"
  (x) => "Kết quả: " + x, //    → "Kết quả: 20"
);
console.log("=== pipe() ===");
console.log(process(5)); // → "Kết quả: 20"
console.log(process(3)); // → "Kết quả: 16"

// ── 2. memoize() ──────────────────────────────────────────
// Cache kết quả theo arguments. Lần gọi sau cùng key → trả thẳng từ cache.
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Test memoize:
const expensiveCalc = memoize((n) => {
  console.log("Đang tính...");
  let result = 0;
  for (let i = 0; i < n; i++) result += i;
  return result;
});

console.log("\n=== memoize() ===");
console.log(expensiveCalc(1000000)); // → in "Đang tính..." rồi ra 499999500000
console.log(expensiveCalc(1000000)); // → lấy từ cache, KHÔNG in "Đang tính..."
console.log(expensiveCalc(500)); // → in "Đang tính..." (key mới)
console.log(expensiveCalc(500)); // → cache

// ── 3. debounce() ─────────────────────────────────────────
// Trì hoãn việc thực thi fn cho đến khi không có lời gọi mới
// trong khoảng `delay` ms. Hữu ích cho search-as-you-type, resize, ...
function debounce(fn, delay) {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

// Test debounce:
console.log("\n=== debounce() ===");
const search = debounce((query) => {
  console.log("Searching:", query);
}, 500);

search("i"); // hủy sau 500ms
search("ip"); // hủy sau 500ms
search("iph"); // hủy sau 500ms
search("ipho"); // hủy sau 500ms
search("iphone"); // → chỉ cái này chạy (sau 500ms không có gọi thêm)

// Để thấy output trong Node.js, setTimeout cần event loop chạy — bạn có thể
// test bằng cách chạy file này: node higher_order.js

// ── 4. retry() ────────────────────────────────────────────
// Thử lại async function tối đa `maxAttempts` lần.
// Nếu thành công → resolve. Nếu hết lần thử → reject với lỗi cuối cùng.
async function retry(fn, maxAttempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await fn();
      console.log(`✅ Thành công ở lần ${attempt}`);
      return result;
    } catch (err) {
      lastError = err;
      console.log(`❌ Lần ${attempt} thất bại: ${err.message}`);
      if (attempt < maxAttempts) {
        console.log(`   Thử lại...`);
      }
    }
  }
  throw new Error(`Thất bại sau ${maxAttempts} lần: ${lastError.message}`);
}

// Test retry:
console.log("\n=== retry() ===");
let callCount = 0;

const unreliableAPI = () =>
  new Promise((resolve, reject) => {
    callCount++;
    if (callCount < 3) {
      reject(new Error(`Network timeout (lần ${callCount})`));
    } else {
      resolve({ data: "Dữ liệu từ server" });
    }
  });

retry(unreliableAPI, 5)
  .then((result) => console.log("Kết quả:", result))
  .catch((err) => console.log("Cuối cùng lỗi:", err.message));
