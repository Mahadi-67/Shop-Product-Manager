// =========================
// Shopkeeper Product Manager
// =========================

// --------- Auth () ----------
let users = [];

let currentRole = null;
let pendingOrder = null;

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
// Save user
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}
// Load user
function loadUsers() {
  const savedUsers = localStorage.getItem("users");
  if (savedUsers) {
    users = JSON.parse(savedUsers);
  } else {
    users = [
      {
        username: "admin",
        password: "1234",
        role: "admin",
        mobile: "N/A",
        email: "N/A",
        address: "N/A"
      },
      {
        username: "user",
        password: "5678",
        role: "user",
        mobile: "01700000000",
        email: "",
        address: "Demo Address"
      }
    ];
    saveUsers();
  }
}

// --------- Demo Seed ----------
function seedDemo() {
  loadData();

  if (products.length === 0) {
    products = [
      {
      name:"Milk 1L",
      details:"Fresh dairy milk",
      price:90,
      quantity:12,
      sold:0,
      image:"https://www.thefrozengarden.com/cdn/shop/articles/benefits-of-whole-milk-benefits-of-drinking-whole-milk-blog-frozen-garden_e991a019-eebb-455b-99b2-96041863f037.webp?v=1769703843"
      },
      {
      name:"Bread",
      details:"Soft loaf bread",
      price:60,
      quantity:18,
      sold:0,
      image:"https://images.unsplash.com/photo-1549931319-a545dcf3bc73"
      },
      {
      name:"Eggs (12 pcs)",
      details:"Farm eggs",
      price:150,
      quantity:9,
      sold:0,
      image:"https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg"
      },
      {
      name:"Rice 1kg",
      details:"Premium basmati rice",
      price:120,
      quantity:25,
      sold:0,
      image:"https://freshdi.com/blog/wp-content/uploads/2025/07/unnamed.jpg"
      },
      {
      name:"Sugar 1kg",
      details:"Refined white sugar",
      price:110,
      quantity:20,
      sold:0,
      image:"https://5.imimg.com/data5/SELLER/Default/2023/2/RC/ZR/RS/183387354/white-suger.jpg"
      },
      {
      name:"Salt 1kg",
      details:"Pure iodized salt",
      price:35,
      quantity:30,
      sold:0,
      image:"https://static.vegsoc.org/app/uploads/2024/07/shutterstock_2315756181.jpg"
      },
      {
      name:"Cooking Oil 1L",
      details:"Bashundhara Fortified Soyabean Oil",
      price:210,
      quantity:15,
      sold:0,
      image:"https://dokanpat.com.bd/wp-content/uploads/2021/02/bashundhara-fortified-soyabean-oil-5ltr.jpg"
      },
      {
      name:"Tea 200g",
      details:"Seylon Family Blend Black Tea",
      price:180,
      quantity:16,
      sold:0,
      image:"https://i.chaldn.com/_mpimage/seylon-family-blend-black-tea-400-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D131441&q=best&v=1"
      },
      {
      name:"Coffee 100g",
      details:"Nescafe Original Instant Coffee 100g",
      price:250,
      quantity:14,
      sold:0,
      image:"https://images.ctfassets.net/6jpeaipefazr/7B4EkPrji6OGr0sf6RVeOD/f40f49b5d114581fba44cead732463e3/P12-5011546415499.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale"
      },
      {
      name:"Butter 200g",
      details:"Amul Butter Tub Salted 200g",
      price:200,
      quantity:10,
      sold:0,
      image:"https://foodpanda.dhmedia.io/image/darkstores-bd/food/08901262010320.jpg?height=480"
      },
      {
      name:"Cheese",
      details:"Ultra Mozzarella Cheese",
      price:280,
      quantity:11,
      sold:0,
      image:"https://i.chaldn.com/_mpimage/ultra-mozzarella-cheese-200-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D125459&q=best&v=1"
      },
      {
      name:"Banana (1 dozen)",
      details:"Fresh bananas",
      price:70,
      quantity:20,
      sold:0,
      image:"https://5.imimg.com/data5/SELLER/Default/2022/12/EK/NP/CN/49293026/fresh-banana-fruit.webp"
      },
      {
      name:"Apple 1kg",
      details:"Red apples",
      price:240,
      quantity:18,
      sold:0,
      image:"https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6"
      },
      {
      name:"Orange 1kg",
      details:"Fresh oranges",
      price:190,
      quantity:17,
      sold:0,
      image:"https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"
      },
      {
      name:"Potato 1kg",
      details:"Fresh potatoes",
      price:40,
      quantity:40,
      sold:0,
      image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655"
      },
      {
      name:"Onion 1kg",
      details:"Fresh onions",
      price:55,
      quantity:35,
      sold:0,
      image:"https://www.dailypost.net/media/imgAll/2023September/onion-20240422092135.jpg"
      },
      {
      name:"Tomato 1kg",
      details:"Fresh tomatoes",
      price:60,
      quantity:28,
      sold:0,
      image:"https://media.post.rvohealth.io/wp-content/uploads/2020/09/AN313-Tomatoes-732x549-Thumb.jpg"
      },
      {
      name:"Chicken 1kg",
      details:"Fresh chicken meat",
      price:320,
      quantity:12,
      sold:0,
      image:"https://meatdirect.co.nz/wp-content/uploads/whole-chicken-frozen-raw.jpg"
      },
      {
      name:"Beef 1kg",
      details:"Fresh beef meat",
      price:650,
      quantity:10,
      sold:0,
      image:"https://www.lovefoodhatewaste.com/sites/default/files/styles/16_9_two_column/public/2022-08/Beef-sh344681603.jpg.webp?itok=qenlRZUs"
      },
      {
      name:"Biscuits",
      details:"Belleame Digestive Biscuit 214g",
      price:50,
      quantity:25,
      sold:0,
      image:"https://foodpanda.dhmedia.io/image/darkstores/nv-global-catalog/bd/c420d9eb-0770-4aaa-9a2e-286f8f7cf32d.jpg?height=480"
      },
      {
      name:"Chocolate",
      details:"Cadbury Family Pack Dairy Milk Chocolate Bar 130g",
      price:120,
      quantity:22,
      sold:0,
      image:"https://rukminim2.flixcart.com/image/480/480/xif0q/chocolate/u/e/f/260-dairy-milk-chocolate-family-pack-2-cadbury-original-imagp6zgmzymfgh6.jpeg?q=90"
      },
      {
      name:"Ice Cream",
      details:"Selecta Supreme Double Dutch Ice Cream",
      price:300,
      quantity:13,
      sold:0,
      image:"https://assets.unileversolutions.com/v1/124823375.png"
      },
      {
      name:"Soft Drink",
      details:"Mojo 1 Litre",
      price:60,
      quantity:30,
      sold:0,
      image:"https://fbbazar.com/wp-content/uploads/2025/06/mojo-pet-1-litre-price-bd-fbbazar.jpg"
      },
      {
      name:"Mineral Water",
      details:"Super Fresh Drinking Water 1L",
      price:30,
      quantity:50,
      sold:0,
      image:"https://www.mgi.org/assets/images/sku/super-fresh-drinking-water-1-liter-bottle.jpg"
      }
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
          <img src="${escapeHtml(p.image)}" class="h-60 w-full object-cover" alt="${escapeHtml(p.name)}" />
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

  const menu = document.getElementById("profileMenu");
  if (menu) menu.classList.add("hidden");
}

function toggleCartSection() {
  const cartSection = document.getElementById("cartSection");
  if (!cartSection) return;

  cartSection.classList.toggle("hidden");

  const menu = document.getElementById("profileMenu");
  if (menu) menu.classList.add("hidden");
}
// Toggle Profile Menu
function toggleProfileMenu() {
  const menu = document.getElementById("profileMenu");
  if (!menu) return;

  menu.classList.toggle("hidden");
}
// Toggle Account Section
function toggleAccountSection() {
  const accountSection = document.getElementById("accountSection");
  if (!accountSection) return;

  accountSection.classList.toggle("hidden");
  renderAccountInfo();

  const menu = document.getElementById("profileMenu");
  if (menu) menu.classList.add("hidden");
}
// Toggle Payment Field
function togglePaymentFields() {
  const method = document.getElementById("paymentMethod").value;

  const bkashFields = document.getElementById("bkashFields");
  const cardFields = document.getElementById("cardFields");
  const cashFields = document.getElementById("cashFields");

  if (bkashFields) bkashFields.classList.add("hidden");
  if (cardFields) cardFields.classList.add("hidden");
  if (cashFields) cashFields.classList.add("hidden");

  if (method === "bkash" && bkashFields) {
    bkashFields.classList.remove("hidden");
  } else if (method === "card" && cardFields) {
    cardFields.classList.remove("hidden");
  } else if (method === "cash" && cashFields) {
    cashFields.classList.remove("hidden");
  }
}
// Render Account Info
function renderAccountInfo() {
  const container = document.getElementById("accountContent");
  if (!container) return;

  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");

  const account = users.find(
    u => u.username === username && u.role === role
  );

  if (!account) {
    container.innerHTML = `<div>Account information not found.</div>`;
    return;
  }

  container.innerHTML = `
    <div><strong>Username:</strong> ${escapeHtml(account.username)}</div>
    <div><strong>Role:</strong> ${escapeHtml(account.role)}</div>
    <div><strong>Mobile Number:</strong> ${escapeHtml(account.mobile || "N/A")}</div>
    <div><strong>Email:</strong> ${escapeHtml(account.email || "N/A")}</div>
    <div><strong>Address:</strong> ${escapeHtml(account.address || "N/A")}</div>
    <div><strong>Total Orders:</strong> ${orders.length}</div>
    <div><strong>Cart Items:</strong> ${cart.length}</div>
  `;
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
  const summary = document.getElementById("cartSummary");
  const totalEl = document.getElementById("cartTotalPrice");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-gray-600">No items in cart.</p>`;
    if (summary) summary.classList.add("hidden");
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

  if (summary && totalEl) {
    totalEl.textContent = formatMoney(getCartTotal());
    summary.classList.remove("hidden");
  }
}
// Delete Cart Items
function deleteCartItem(index) {
  const ok = confirm("Remove this item from cart?");
  if (!ok) return;

  cart.splice(index, 1);

  saveData();
  renderCart();
}
// Get Cart Total
function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
// Open Cart Payment Model
function openCartPaymentModal() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  document.getElementById("cartPaymentMethod").value = "";
  document.getElementById("cartBkashNumber").value = "";
  document.getElementById("cartBkashTxn").value = "";
  document.getElementById("cartCardUserNumber").value = "";
  document.getElementById("cartCardTxn").value = "";

  toggleCartPaymentFields();

  document.getElementById("cartPaymentModal").showModal();
}
// Toggle Cart Payment Fields
function toggleCartPaymentFields() {
  const method = document.getElementById("cartPaymentMethod").value;

  document.getElementById("cartBkashFields").classList.add("hidden");
  document.getElementById("cartCardFields").classList.add("hidden");
  document.getElementById("cartCashFields").classList.add("hidden");

  if (method === "bkash") {
    document.getElementById("cartBkashFields").classList.remove("hidden");
  } else if (method === "card") {
    document.getElementById("cartCardFields").classList.remove("hidden");
  } else if (method === "cash") {
    document.getElementById("cartCashFields").classList.remove("hidden");
  }
}
// Confirm Cart Payment
function confirmCartPayment() {
  const name = document.getElementById("cartBuyerName").value.trim();
  const phone = document.getElementById("cartBuyerPhone").value.trim();
  const email = document.getElementById("cartBuyerEmail").value.trim();
  const address = document.getElementById("cartBuyerAddress").value.trim();
  const paymentMethod = document.getElementById("cartPaymentMethod").value;

  if (!name || !phone || !address) {
    alert("Please fill required fields.");
    return;
  }

  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  let paymentDetails = {};

  if (paymentMethod === "bkash") {
    const bkashNumber = document.getElementById("cartBkashNumber").value.trim();
    const bkashTxn = document.getElementById("cartBkashTxn").value.trim();

    if (!bkashNumber || !bkashTxn) {
      alert("Please fill bKash payment details.");
      return;
    }

    paymentDetails = {
      bkashNumber,
      transactionId: bkashTxn
    };
  }

  if (paymentMethod === "card") {
    const cardUserNumber = document.getElementById("cartCardUserNumber").value.trim();
    const cardTxn = document.getElementById("cartCardTxn").value.trim();
  
    if (!cardUserNumber || !cardTxn) {
      alert("Please fill card payment details.");
      return;
    }
  
    paymentDetails = {
      cardUserNumber,
      transactionId: cardTxn
    };
  }

  for (const cartItem of cart) {
    const product = products.find(p => p.name === cartItem.product);

    if (!product) {
      alert(`Product not found: ${cartItem.product}`);
      return;
    }

    if (product.quantity < cartItem.quantity) {
      alert(`Not enough stock for ${cartItem.product}`);
      return;
    }
  }

  cart.forEach(cartItem => {
    const product = products.find(p => p.name === cartItem.product);

    product.quantity -= cartItem.quantity;
    product.sold += cartItem.quantity;

    orders.push({
      product: cartItem.product,
      name,
      phone,
      email,
      address,
      quantity: cartItem.quantity,
      total: cartItem.price * cartItem.quantity,
      paymentMethod,
      ...paymentDetails
    });

    salesHistory.push({
      name: `${cartItem.product} x${cartItem.quantity}`,
      price: cartItem.price * cartItem.quantity,
      time: new Date().toLocaleString()
    });
  });

  cart = [];

  saveData();
  renderCart();
  renderOrders();
  renderAll();

  document.getElementById("cartPaymentModal").close();

  document.getElementById("cartBuyerName").value = "";
  document.getElementById("cartBuyerPhone").value = "";
  document.getElementById("cartBuyerEmail").value = "";
  document.getElementById("cartBuyerAddress").value = "";
  document.getElementById("cartPaymentMethod").value = "";
  document.getElementById("cartBkashNumber").value = "";
  document.getElementById("cartBkashTxn").value = "";
  document.getElementById("cartCardUserNumber").value = "";
document.getElementById("cartCardTxn").value = "";

  toggleCartPaymentFields();

  alert("Cart order placed successfully!");
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

  document.getElementById("paymentMethod").value = "";
  document.getElementById("bkashNumber").value = "";
  document.getElementById("bkashTxn").value = "";
  document.getElementById("cardUserNumber").value = "";
  document.getElementById("cardTxn").value = "";

  togglePaymentFields();

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

  pendingOrder = {
    productIndex: selectedProductIndex,
    productName: product.name,
    name,
    phone,
    email,
    address,
    quantity: buyQty,
    total: product.price * buyQty
  };

  document.getElementById("buyModal").close();
  document.getElementById("paymentModal").showModal();
}
// Confirm Payment
function confirmPayment() {
  const paymentMethod = document.getElementById("paymentMethod").value;

  if (!pendingOrder) {
    alert("No pending order found.");
    return;
  }

  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  let paymentDetails = {};

  if (paymentMethod === "bkash") {
    const bkashNumber = document.getElementById("bkashNumber").value.trim();
    const bkashTxn = document.getElementById("bkashTxn").value.trim();

    if (!bkashNumber || !bkashTxn) {
      alert("Please fill bKash payment details.");
      return;
    }

    paymentDetails = {
      bkashNumber,
      transactionId: bkashTxn
    };
  }

  if (paymentMethod === "card") {
    const cardUserNumber = document.getElementById("cardUserNumber").value.trim();
    const cardTxn = document.getElementById("cardTxn").value.trim();
  
    if (!cardUserNumber || !cardTxn) {
      alert("Please fill card payment details.");
      return;
    }
  
    paymentDetails = {
      cardUserNumber,
      transactionId: cardTxn
    };
  }

  const product = products[pendingOrder.productIndex];
  if (!product) return;

  if (product.quantity < pendingOrder.quantity) {
    alert("Not enough stock available.");
    return;
  }

  product.quantity -= pendingOrder.quantity;
  product.sold += pendingOrder.quantity;

  orders.push({
    product: pendingOrder.productName,
    name: pendingOrder.name,
    phone: pendingOrder.phone,
    email: pendingOrder.email,
    address: pendingOrder.address,
    quantity: pendingOrder.quantity,
    total: pendingOrder.total,
    paymentMethod,
    ...paymentDetails
  });

  salesHistory.push({
    name: `${pendingOrder.productName} x${pendingOrder.quantity}`,
    price: pendingOrder.total,
    time: new Date().toLocaleString()
  });

  saveData();
  renderOrders();
  renderAll();

  document.getElementById("paymentModal").close();

  document.getElementById("bName").value = "";
  document.getElementById("bPhone").value = "";
  document.getElementById("bQty").value = "1";
  document.getElementById("bEmail").value = "";
  document.getElementById("bAddress").value = "";

  document.getElementById("paymentMethod").value = "";
document.getElementById("bkashNumber").value = "";
document.getElementById("bkashTxn").value = "";
document.getElementById("cardUserNumber").value = "";
document.getElementById("cardTxn").value = "";

togglePaymentFields();
pendingOrder = null;
selectedProductIndex = null;

  alert("Payment successful and order placed.");
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
      <div class="text-sm">Payment: ${o.paymentMethod}</div>
      ${o.transactionId ? `<div class="text-sm">Txn ID: ${o.transactionId}</div>` : ""}
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

  const account = users.find(
    user => user.username === u && user.password === p && user.role === role
  );

  if (account) {
    currentRole = role;
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("username", u);

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
// Open Register Model
function openRegisterModal() {
  document.getElementById("registerModal").showModal();
}
// Register Account
function registerAccount() {
  const username = document.getElementById("regUser").value.trim();
  const password = document.getElementById("regPass").value.trim();
  const mobile = document.getElementById("regMobile").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const address = document.getElementById("regAddress").value.trim();
  const role = "user";

  if (!username || !password || !mobile || !address) {
    alert("Please fill all required fields.");
    return;
  }

  const exists = users.find(u => u.username === username && u.role === role);
  if (exists) {
    alert("This account already exists.");
    return;
  }

  users.push({
    username,
    password,
    mobile,
    email,
    address,
    role,
  });

  saveUsers();

  document.getElementById("regUser").value = "";
  document.getElementById("regPass").value = "";
  document.getElementById("regMobile").value = "";
  document.getElementById("regEmail").value = "";
  document.getElementById("regAddress").value = "";
  document.getElementById("registerModal").close();

  alert("Account registered successfully.");
}
// Forget Model
function openForgotModal() {
  document.getElementById("forgotModal").showModal();
}
// Change Password
function changePassword() {
  const username = document.getElementById("forgotUser").value.trim();
  const role = document.getElementById("forgotRole").value.trim();
  const newPassword = document.getElementById("newPass").value.trim();

  if (!username || !role || !newPassword) {
    alert("Please fill all fields.");
    return;
  }

  const account = users.find(
    u => u.username === username && u.role === role
  );

  if (!account) {
    alert("Account not found.");
    return;
  }

  // NEW CHECK
  if (account.password === newPassword) {
    alert("Password same as previous one.");
    return;
  }

  // Change password
  account.password = newPassword;
  saveUsers();

  document.getElementById("forgotUser").value = "";
  document.getElementById("forgotRole").value = "";
  document.getElementById("newPass").value = "";
  document.getElementById("forgotModal").close();

  alert("Password changed successfully.");
}
// Apply Role Permission
function applyRolePermissions() {

  const dashboardBtn = document.getElementById("dashboardBtn");
  const cartBtn = document.getElementById("cartBtn");
  const resetBtn = document.getElementById("resetDataBtn");
  const profileBtn = document.getElementById("profileBtn");
  const adminLogoutBtn = document.getElementById("adminLogoutBtn");

  if (currentRole === "admin") {

    dashboardBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");

    cartBtn.classList.add("hidden");
    profileBtn.classList.add("hidden");

    adminLogoutBtn.classList.remove("hidden");

  } else {

    dashboardBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");

    cartBtn.classList.remove("hidden");
    profileBtn.classList.remove("hidden");

    adminLogoutBtn.classList.add("hidden");
  }
}
// Logout
function logout() {
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("username");
  currentRole = null;

  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("ordersSection").classList.add("hidden");
  document.getElementById("cartSection").classList.add("hidden");
  document.getElementById("accountSection").classList.add("hidden");
  document.getElementById("profileMenu")?.classList.add("hidden");

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
  loadUsers();
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
  const savedUsername = sessionStorage.getItem("username");

  showApp();
  seedDemo();
  applyRolePermissions();
  renderOrders();
  renderCart();

  if (savedUsername) {
    sessionStorage.setItem("username", savedUsername);
  }
} else {
  showLogin();
}
});