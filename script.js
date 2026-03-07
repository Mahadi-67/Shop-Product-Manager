// =========================
// Shopkeeper Product Manager
// =========================

// --------- Auth (demo only) ----------
const USERS = {
  admin: {
    username: "admin",
    password: "1234",
  },
  user: {
    username: "user",
    password: "5678",
  },
};

let currentRole = null;

// --------- Dashboard view state ----------
let dashboardView = "top"; // "top" | "sales"

// --------- Data ----------
let orders = [];
let cart = [];
let products = [];
let salesHistory = []; // { name, price, time }

// --------- Local Storage ----------
function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("salesHistory", JSON.stringify(salesHistory));
}

function loadData() {
  const savedProducts = localStorage.getItem("products");
  const savedOrders = localStorage.getItem("orders");
  const savedCart = localStorage.getItem("cart");
  const savedSales = localStorage.getItem("salesHistory");

  if (savedProducts) products = JSON.parse(savedProducts);
  if (savedOrders) orders = JSON.parse(savedOrders);
  if (savedCart) cart = JSON.parse(savedCart);
  if (savedSales) salesHistory = JSON.parse(savedSales);
}

// --------- Demo Seed ----------
function seedDemo() {
  loadData();

  if (products.length === 0) {
    products = [
      {
        name: "Milk 1L",
        details: "Fresh dairy milk (pasteurized)",
        price: 90,
        quantity: 12,
        sold: 0,
        image:
          "https://t4.ftcdn.net/jpg/02/31/84/29/360_F_231842968_qThCnmslPbEAwhg7nuW9rAy8qRNhRli7.jpg",
      },
      {
        name: "Bread",
        details: "Soft loaf bread (500g)",
        price: 60,
        quantity: 18,
        sold: 0,
        image:
          "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Eggs (12 pcs)",
        details: "Farm eggs, medium size",
        price: 150,
        quantity: 9,
        sold: 0,
        image:
          "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Rice 1kg",
        details: "Premium basmati rice",
        price: 120,
        quantity: 25,
        sold: 0,
        image:
          "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=800&auto=format&fit=crop",
      },
    ];

    saveData();
  }

  renderAll();
  renderOrders();
  renderCart();
}

// --------- Rendering ----------
function renderAll() {
  renderProducts();
  renderDashboardContent();
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach((p, index) => {
    const soldOut = p.quantity <= 0;

    grid.innerHTML += `
      <div class="card bg-base-100 shadow">
        <figure>
          <img src="${escapeHtml(p.image)}" class="h-40 w-full object-cover" alt="${escapeHtml(p.name)}" />
        </figure>

        <div class="card-body">
          <h2 class="card-title text-base">${escapeHtml(p.name)}</h2>
          <p class="text-sm text-gray-700">${escapeHtml(p.details)}</p>

          <div class="flex flex-wrap gap-2 mt-2">
            <span class="badge badge-primary">Price: ${formatMoney(p.price)}</span>
            <span class="badge ${soldOut ? "badge-error" : "badge-success"}">Qty: ${p.quantity}</span>
            <span class="badge badge-neutral">Sold: ${p.sold}</span>
          </div>

       <div class="flex gap-2 mt-4 flex-wrap">
       ${
        currentRole === "admin"
          ? `
          <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">
            Edit
          </button>
          <button class="btn btn-secondary btn-sm" onclick="restockProduct(${index})">
            Re-stock
          </button>
          <button class="btn btn-error btn-sm" onclick="deleteProduct(${index})">
            Delete
          </button>
          `
          : `
            <button class="btn btn-primary btn-sm ${soldOut ? "btn-disabled" : ""}"     onclick="openBuyModal(${index})">
              Buy
            </button>
            <button class="btn btn-secondary btn-sm ${soldOut ? "btn-disabled" : ""}" onclick="addToCart(${index})">
              Cart
            </button>
            `
         }
        </div>

          ${soldOut ? `<div class="alert alert-error mt-3 p-2 text-sm">Out of stock</div>` : ""}
        </div>
      </div>
    `;
  });

  // Add Product Card at end
  if (currentRole === "admin") {
    grid.innerHTML += `
      <div id="addProductCard" class="card bg-base-100 shadow border border-dashed border-base-300">
        <div class="card-body flex justify-center items-center text-center">
          <div class="text-5xl">＋</div>
          <h2 class="card-title">Add Product</h2>
          <p class="text-sm text-gray-700">Add a new item to your shop.</p>
          <button class="btn btn-primary mt-2" onclick="openAddModal()">
            Add Product
          </button>
        </div>
      </div>
    `;
  }
} 

function renderDashboardContent() {
  updateDashboardButtons();

  const container = document.getElementById("dashboardContent");
  if (!container) return;

  container.innerHTML =
    dashboardView === "top" ? renderTopSellingHTML() : renderSalesDetailsHTML();
}

function renderTopSellingHTML() {
  const soldOnly = [...products]
    .sort((a, b) => b.sold - a.sold)
    .filter((p) => p.sold > 0);

  if (soldOnly.length === 0) {
    return `<div class="text-sm text-gray-600">No sales yet.</div>`;
  }

  return soldOnly
    .map(
      (p, i) => `
        <div class="p-3 bg-base-200 rounded-box mb-2 flex items-center justify-between">
          <div>
            <div class="font-semibold">${i + 1}. ${escapeHtml(p.name)}</div>
            <div class="text-xs text-gray-600">Remaining: ${p.quantity}</div>
          </div>
          <span class="badge badge-accent">Sold: ${p.sold}</span>
        </div>
      `
    )
    .join("");
}

function renderSalesDetailsHTML() {
  if (salesHistory.length === 0) {
    return `<div class="text-sm text-gray-700">Nothing sold yet.</div>`;
  }

  return [...salesHistory]
    .reverse()
    .map(
      (s) => `
        <div class="p-3 bg-base-200 rounded-box mb-2">
          <div class="font-semibold">${escapeHtml(s.name)}</div>
          <div class="text-sm">${formatMoney(s.price)}</div>
          <div class="text-xs text-gray-700">${escapeHtml(s.time)}</div>
        </div>
      `
    )
    .join("");
}

function updateDashboardButtons() {
  const btnTop = document.getElementById("btnTop");
  const btnSales = document.getElementById("btnSales");
  if (!btnTop || !btnSales) return;

  btnTop.classList.toggle("btn-active", dashboardView === "top");
  btnSales.classList.toggle("btn-active", dashboardView === "sales");
}

// --------- Actions ----------
// Delete products
function deleteProduct(index) {
  if (currentRole !== "admin") {
    alert("Only admin can delete products.");
    return;
  }

  const product = products[index];
  if (!product) return;

  const ok = confirm(`Delete "${product.name}"?`);
  if (!ok) return;

  products.splice(index, 1);

  saveData();
  renderAll();
}
// Edit products
function editProduct(index) {
  if (currentRole !== "admin") {
    alert("Only admin can edit products.");
    return;
  }
  const product = products[index];
  if (!product) return;

  const newName = prompt("Edit product name", product.name);
  if (newName === null) return;

  const newDetails = prompt("Edit product details", product.details);
  if (newDetails === null) return;

  const newPrice = prompt("Edit price", product.price);
  if (newPrice === null) return;

  const newQty = prompt("Edit quantity", product.quantity);
  if (newQty === null) return;

  const newImage = prompt("Edit image URL", product.image);
  if (newImage === null) return;

  const priceNum = Number(newPrice);
  const qtyNum = Number(newQty);

  if (!Number.isFinite(priceNum) || priceNum < 0) {
    alert("Invalid price.");
    return;
  }
  if (!Number.isFinite(qtyNum) || qtyNum < 0) {
    alert("Invalid quantity.");
    return;
  }
  if (String(newImage).trim() === "") {
    alert("Image URL cannot be empty.");
    return;
  }

  product.name = newName.trim() || product.name;
  product.details = newDetails.trim();
  product.price = priceNum;
  product.quantity = Math.floor(qtyNum);
  product.image = newImage.trim();

  saveData();
  renderAll();
}

// Re-stock Product

function restockProduct(index) {
  if (currentRole !== "admin") {
    alert("Only admin can re-stock products.");
    return;
  }

  const product = products[index];
  if (!product) return;

  const amount = prompt(`Enter re-stock quantity for ${product.name}`, "1");
  if (amount === null) return;

  const qtyToAdd = Number(amount);

  if (!Number.isFinite(qtyToAdd) || qtyToAdd <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  product.quantity += Math.floor(qtyToAdd);

  saveData();
  renderAll();
}

// --------- Dashboard controls ----------
function toggleDashboard() {
  const dash = document.getElementById("dashboard");
  if (!dash) return;

  dash.classList.toggle("hidden");
  if (!dash.classList.contains("hidden")) renderDashboardContent();
}

function setDashboardView(view) {
  dashboardView = view;
  renderDashboardContent();
}

function toggleOrders() {
  const orders = document.getElementById("ordersSection");

  if (!orders) return;

  orders.classList.toggle("hidden");
}

function toggleCartSection() {
  const cartSection = document.getElementById("cartSection");
  if (!cartSection) return;

  cartSection.classList.toggle("hidden");
}
// Add to Cart
function addToCart(index) {
  if (currentRole !== "user") return;

  const product = products[index];
  if (!product) return;

  if (product.quantity <= 0) {
    alert("Out of stock!");
    return;
  }

  const qtyInput = prompt(`Enter quantity for ${product.name}`, "1");
  if (qtyInput === null) return;

  const qty = Number(qtyInput);

  if (!Number.isFinite(qty) || qty <= 0) {
    alert("Invalid quantity.");
    return;
  }

  if (qty > product.quantity) {
    alert("Not enough stock available.");
    return;
  }

  const existingItem = cart.find(item => item.product === product.name);

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({
      product: product.name,
      price: product.price,
      quantity: qty,
    });
  }

  renderCart();
  saveData();

  alert(`${qty} ${product.name} added to cart`);
}
// Render Cart
function renderCart() {
  const container = document.getElementById("cartContent");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-gray-600">No items in cart.</p>`;
    return;
  }

  container.innerHTML = cart.map((item, i) => `
  <div class="p-3 bg-base-200 rounded-box mb-2 flex justify-between items-center">

    <div>
      <div class="font-semibold">${item.product}</div>
      <div class="text-sm">Price: ${formatMoney(item.price)}</div>
      <div class="text-sm">Quantity: ${item.quantity}</div>
      <div class="text-sm font-medium">Total: ${formatMoney(item.price * item.quantity)}</div>
    </div>

    <button class="btn btn-error btn-sm" onclick="deleteCartItem(${i})">
      <i class="fa-solid fa-trash"></i>
    </button>

  </div>
`).join("");
}
// Delete Cart Items
function deleteCartItem(index) {
  const ok = confirm("Remove this item from cart?");
  if (!ok) return;

  cart.splice(index, 1);

  saveData();
  renderCart();
}
// Delete Order
function deleteOrder(index) {
  const ok = confirm("Delete this order?");
  if (!ok) return;

  orders.splice(index, 1);

  saveData();
  renderOrders();
}

// --------- Modal ----------
function openAddModal() {
  if (currentRole !== "admin") {
    alert("Only admin can add products.");
    return;
  }

  const modal = document.getElementById("addModal");
  if (modal && typeof modal.showModal === "function") modal.showModal();
}

let selectedProductIndex = null;
// Open Buy Model
function openBuyModal(index) {
  if (currentRole !== "user") return;

  selectedProductIndex = index;

  const modal = document.getElementById("buyModal");
  if (modal) modal.showModal();
}
// Submit Order
function submitOrder() {
  const name = document.getElementById("bName").value.trim();
  const phone = document.getElementById("bPhone").value.trim();
  const qtyValue = Number(document.getElementById("bQty").value);
  const email = document.getElementById("bEmail").value.trim();
  const address = document.getElementById("bAddress").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill required fields.");
    return;
  }

  if (!Number.isFinite(qtyValue) || qtyValue <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  const buyQty = Math.floor(qtyValue);
  const product = products[selectedProductIndex];
  if (!product) return;

  if (product.quantity < buyQty) {
    alert("Not enough stock available.");
    return;
  }

  product.quantity -= buyQty;
  product.sold += buyQty;

  orders.push({
    product: product.name,
    name,
    phone,
    email,
    address,
    quantity: buyQty,
    total: product.price * buyQty,
  });

  salesHistory.push({
    name: `${product.name} x${buyQty}`,
    price: product.price * buyQty,
    time: new Date().toLocaleString(),
  });

  saveData();
  renderOrders();
  renderAll();

  alert("Order placed successfully!");

  document.getElementById("buyModal").close();

  document.getElementById("bName").value = "";
  document.getElementById("bPhone").value = "";
  document.getElementById("bQty").value = "1";
  document.getElementById("bEmail").value = "";
  document.getElementById("bAddress").value = "";
}
// Render Order
function renderOrders() {
  const container = document.getElementById("ordersContent");
  if (!container) return;

  if (orders.length === 0) {
    container.innerHTML = `<p class="text-gray-600">No orders yet.</p>`;
    return;
  }

  container.innerHTML = orders.map((o, i) => `
  <div class="p-3 bg-base-200 rounded-box mb-2 flex justify-between items-center">

    <div>
      <div class="font-semibold">${o.product}</div>
      <div class="text-sm">Name: ${o.name}</div>
      <div class="text-sm">Phone: ${o.phone}</div>
      <div class="text-sm">Quantity: ${o.quantity}</div>
      <div class="text-sm">Total: ${formatMoney(o.total)}</div>
      <div class="text-sm">${o.address}</div>
    </div>

    <button class="btn btn-error btn-sm" onclick="deleteOrder(${i})">
      <i class="fa-solid fa-trash"></i>
    </button>

  </div>
`).join("");
}

// Add Product from Model
function addProductFromModal() {
  if (currentRole !== "admin") {
    alert("Only admin can add products.");
    return;
  }
  const nameEl = document.getElementById("pName");
  const detailsEl = document.getElementById("pDetails");
  const priceEl = document.getElementById("pPrice");
  const qtyEl = document.getElementById("pQty");
  const imgEl = document.getElementById("pImg");

  const name = nameEl.value.trim();
  const details = detailsEl.value.trim();
  const price = Number(priceEl.value);
  const qty = Number(qtyEl.value);
  const image = imgEl.value.trim();

  if (!name || !details || !image) {
    alert("Please fill name, details, and image URL.");
    return;
  }
  if (!Number.isFinite(price) || price < 0) {
    alert("Enter a valid price.");
    return;
  }
  if (!Number.isFinite(qty) || qty < 0) {
    alert("Enter a valid quantity.");
    return;
  }

  products.push({
    name,
    details,
    price,
    quantity: Math.floor(qty),
    sold: 0,
    image,
  });

  nameEl.value = "";
  detailsEl.value = "";
  priceEl.value = "";
  qtyEl.value = "";
  imgEl.value = "";

  const modal = document.getElementById("addModal");
  if (modal && typeof modal.close === "function") modal.close();
  
  saveData();
  renderAll();
}

// --------- Auth UI ----------
function showApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}
// Show Login
function showLogin() {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
}
// Login
function login() {
  const u = document.getElementById("loginUser").value.trim();
  const p = document.getElementById("loginPass").value.trim();
  const role = document.getElementById("loginRole").value;

  const err = document.getElementById("loginError");
  err.classList.add("hidden");

  const account = USERS[role];

  if (u === account.username && p === account.password) {
    currentRole = role;
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("role", role);

    showApp();
    seedDemo();
    dashboardView = "top";
    applyRolePermissions();
    renderOrders();
    renderCart();
  } else {
    err.classList.remove("hidden");
  }
}
// Apply Role Permission
function applyRolePermissions() {
  const dashboardBtn = document.getElementById("dashboardBtn");
  const orderBtn = document.getElementById("orderBtn");
  const cartBtn = document.getElementById("cartBtn");
  const resetBtn = document.getElementById("resetDataBtn");

  if (currentRole === "admin") {
    if (dashboardBtn) dashboardBtn.classList.remove("hidden");
    if (orderBtn) orderBtn.classList.add("hidden");
    if (cartBtn) cartBtn.classList.add("hidden");
    if (resetBtn) resetBtn.classList.remove("hidden");
  } else {
    if (dashboardBtn) dashboardBtn.classList.add("hidden");
    if (orderBtn) orderBtn.classList.remove("hidden");
    if (cartBtn) cartBtn.classList.remove("hidden");
    if (resetBtn) resetBtn.classList.add("hidden");
  }
}
// Logout
function logout() {
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("role");
  currentRole = null;

  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("ordersSection").classList.add("hidden");
  document.getElementById("cartSection").classList.add("hidden");

  showLogin();
}
// Reset All Data
function resetAllData() {
  const ok = confirm("This will delete ALL data. Continue?");
  if (!ok) return;

  localStorage.clear();

  orders = [];
  cart = [];
  products = [];
  salesHistory = [];

  seedDemo();

  alert("All data has been reset.");
}
// --------- Helpers ----------
function formatMoney(n) {
  return "৳" + Number(n).toFixed(2);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// --------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) loginBtn.addEventListener("click", login);

  const loginPass = document.getElementById("loginPass");
  if (loginPass) {
    loginPass.addEventListener("keydown", (e) => {
      if (e.key === "Enter") login();
    });
  }
  const resetBtn = document.getElementById("resetDataBtn");

// If already logged in (same tab), show app + demo
if (sessionStorage.getItem("loggedIn") === "true") {
  currentRole = sessionStorage.getItem("role");
  showApp();
  seedDemo();
  applyRolePermissions();
  renderOrders();
  renderCart();
} else {
  showLogin();
}
});