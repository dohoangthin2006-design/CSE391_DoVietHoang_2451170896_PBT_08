// ============================================================
// BÀI B2 — SHOPPING CART DÙNG CLOSURE
// ============================================================

function createCart() {
  // Private state — không thể truy cập từ bên ngoài
  let items = [];
  let discountInfo = null; // { code, type, value }

  // Helper: format tiền VND
  const fmt = (n) => n.toLocaleString("vi-VN");

  // Helper: tính tổng trước giảm giá
  const rawTotal = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    // Thêm sản phẩm — nếu đã có thì tăng quantity
    addItem(product, quantity = 1) {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        items.push({ ...product, quantity });
      }
    },

    // Xóa sản phẩm theo id
    removeItem(productId) {
      items = items.filter((i) => i.id !== productId);
    },

    // Cập nhật số lượng — nếu quantity <= 0 thì xóa luôn
    updateQuantity(productId, newQuantity) {
      if (newQuantity <= 0) {
        this.removeItem(productId);
        return;
      }
      const item = items.find((i) => i.id === productId);
      if (item) item.quantity = newQuantity;
    },

    // Tính tổng tiền (sau giảm giá)
    getTotal() {
      const total = rawTotal();
      if (!discountInfo) return total;
      if (discountInfo.type === "percent") {
        return total * (1 - discountInfo.value);
      }
      return Math.max(0, total - discountInfo.value);
    },

    // Áp dụng mã giảm giá
    applyDiscount(code) {
      const codes = {
        SALE10: { type: "percent", value: 0.1 },
        SALE20: { type: "percent", value: 0.2 },
        FREESHIP: { type: "fixed", value: 30000 },
      };
      if (codes[code]) {
        discountInfo = { code, ...codes[code] };
        console.log(`✅ Áp dụng mã "${code}" thành công!`);
      } else {
        console.log(`❌ Mã "${code}" không hợp lệ.`);
      }
    },

    // In giỏ hàng dạng bảng
    printCart() {
      const line = "─".repeat(68);
      const dline = "═".repeat(68);

      console.log(`\n╔${dline}╗`);
      console.log(
        `║  #  ${"Sản phẩm".padEnd(18)} ${"SL".padStart(4)}  ${"Đơn giá".padStart(14)}  ${"Thành tiền".padStart(14)}  ║`,
      );
      console.log(`╠${dline}╣`);

      items.forEach((item, idx) => {
        const no = String(idx + 1).padStart(3);
        const name = item.name.padEnd(18);
        const qty = String(item.quantity).padStart(4);
        const unitP = fmt(item.price).padStart(14);
        const lineP = fmt(item.price * item.quantity).padStart(14);
        console.log(`║  ${no}  ${name} ${qty}  ${unitP}  ${lineP}  ║`);
      });

      console.log(`╠${dline}╣`);

      const before = rawTotal();
      const after = this.getTotal();
      if (discountInfo) {
        const saved = before - after;
        console.log(`║  Tổng trước giảm:${fmt(before).padStart(46)}đ  ║`);
        console.log(
          `║  Giảm (${discountInfo.code}):${("-" + fmt(saved)).padStart(52)}đ  ║`,
        );
      }
      console.log(
        `║  ${"TỔNG CỘNG:".padEnd(56)} ${fmt(after).padStart(14)}đ  ║`,
      );
      console.log(`╚${dline}╝\n`);
    },

    // Tổng số lượng sản phẩm
    getItemCount() {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    // Xóa toàn bộ giỏ
    clearCart() {
      items = [];
      discountInfo = null;
      console.log("🛒 Giỏ hàng đã được xóa.");
    },
  };
}

// ============================================================
// TEST
// ============================================================

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // → quantity tăng lên 2

console.log("=== GIỎ HÀNG BAN ĐẦU ===");
cart.printCart();

cart.applyDiscount("SALE10");
console.log("=== SAU KHI GIẢM GIÁ 10% ===");
cart.printCart();

console.log("Số SP trong giỏ:", cart.getItemCount()); // → 4

cart.removeItem(3);
console.log("Sau khi xóa AirPods Pro, số SP còn:", cart.getItemCount()); // → 2

console.log("=== SAU KHI XÓA AIRPODS ===");
cart.printCart();

cart.updateQuantity(1, 3);
console.log("=== SAU KHI CẬP NHẬT iPhone 16 SL=3 ===");
cart.printCart();

cart.clearCart();
console.log("Sau clearCart, số SP:", cart.getItemCount()); // → 0
