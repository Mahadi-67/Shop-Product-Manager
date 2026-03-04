// =========================
// Shopkeeper Product Manager
// =========================

// --------- Auth (demo only) ----------
const DEMO_USER = "admin";
const DEMO_PASS = "1234";

// --------- Dashboard view state ----------
let dashboardView = "top"; // "top" | "sales"

// --------- Data ----------
let products = [];
let salesHistory = []; // { name, price, time }

// --------- Demo Seed ----------
function seedDemo() {
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

  salesHistory = [];
  renderAll();
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
          <p class="text-sm opacity-80">${escapeHtml(p.details)}</p>

          <div class="flex flex-wrap gap-2 mt-2">
            <span class="badge badge-primary">Price: ${formatMoney(p.price)}</span>
            <span class="badge ${soldOut ? "badge-error" : "badge-success"}">Qty: ${p.quantity}</span>
            <span class="badge badge-neutral">Sold: ${p.sold}</span>
          </div>

          <div class="flex gap-2 mt-4 flex-wrap">
            <button class="btn btn-success btn-sm ${soldOut ? "btn-disabled" : ""}" onclick="sellProduct(${index})">
              Sell
            </button>
            <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">
              Edit
            </button>
            <button class="btn btn-error btn-sm" onclick="deleteProduct(${index})">
              Delete
            </button>
          </div>

          ${soldOut ? `<div class="alert alert-error mt-3 p-2 text-sm">Out of stock</div>` : ""}
        </div>
      </div>
    `;
  });

  // Add Product Card at end
  grid.innerHTML += `
    <div class="card bg-base-100 shadow border border-dashed border-base-300">
      <div class="card-body flex justify-center items-center text-center">
        <div class="text-5xl">＋</div>
        <h2 class="card-title">Add Product</h2>
        <p class="text-sm opacity-70">Add a new item to your shop.</p>
        <button class="btn btn-primary mt-2" onclick="openAddModal()">
          Add Product
        </button>
      </div>
    </div>
  `;
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
    return `<div class="text-sm opacity-70">No sales yet.</div>`;
  }

  return soldOnly
    .map(
      (p, i) => `
        <div class="p-3 bg-base-200 rounded-box mb-2 flex items-center justify-between">
          <div>
            <div class="font-semibold">${i + 1}. ${escapeHtml(p.name)}</div>
            <div class="text-xs opacity-70">Remaining: ${p.quantity}</div>
          </div>
          <span class="badge badge-accent">Sold: ${p.sold}</span>
        </div>
      `
    )
    .join("");
}

function renderSalesDetailsHTML() {
  if (salesHistory.length === 0) {
    return `<div class="text-sm opacity-70">Nothing sold yet.</div>`;
  }

  return [...salesHistory]
    .reverse()
    .map(
      (s) => `
        <div class="p-3 bg-base-200 rounded-box mb-2">
          <div class="font-semibold">${escapeHtml(s.name)}</div>
          <div class="text-sm">${formatMoney(s.price)}</div>
          <div class="text-xs opacity-70">${escapeHtml(s.time)}</div>
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
function sellProduct(index) {
  const product = products[index];
  if (!product) return;

  if (product.quantity <= 0) {
    alert("Out of stock!");
    return;
  }

  product.quantity--;
  product.sold++;

  salesHistory.push({
    name: product.name,
    price: product.price,
    time: new Date().toLocaleString(),
  });

  renderAll();
}

function deleteProduct(index) {
  const product = products[index];
  if (!product) return;

  const ok = confirm(`Delete "${product.name}"?`);
  if (!ok) return;

  products.splice(index, 1);
  renderAll();
}

function editProduct(index) {
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

// --------- Modal ----------
function openAddModal() {
  const modal = document.getElementById("addModal");
  if (modal && typeof modal.showModal === "function") modal.showModal();
}

function addProductFromModal() {
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

  renderAll();
}

// --------- Auth UI ----------
function showApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
}

function login() {
  const u = document.getElementById("loginUser").value.trim();
  const p = document.getElementById("loginPass").value.trim();

  const err = document.getElementById("loginError");
  err.classList.add("hidden");

  if (u === DEMO_USER && p === DEMO_PASS) {
    sessionStorage.setItem("loggedIn", "true");
    showApp();

    // ✅ IMPORTANT FIX: load demo cards right after login
    seedDemo();

    // default dashboard view
    dashboardView = "top";
  } else {
    err.classList.remove("hidden");
  }
}

function logout() {
  sessionStorage.removeItem("loggedIn");
  showLogin();
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

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) resetBtn.addEventListener("click", seedDemo);

  // If already logged in (same tab), show app + demo
  if (sessionStorage.getItem("loggedIn") === "true") {
    showApp();
    seedDemo();
  } else {
    showLogin();
  }
});