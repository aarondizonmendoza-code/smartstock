// ================== CONFIG ==================
const owner = "aarondizonmendoza-code";
const repo = "smartstock";
const path = "products.json";
const token = "YOUR_GITHUB_PAT"; // Replace with your GitHub Personal Access Token
const apiURL = https://api.github.com/repos/${owner}/${repo}/contents/${path};

const form = document.getElementById("productForm");
const table = document.getElementById("productTable");

let sha;      // GitHub file SHA needed to update
let editId = null;

// ================== LOAD PRODUCTS ==================
async function loadProducts() {
  try {
    const res = await fetch(apiURL, {
      headers: { Authorization: token ${token} }
    });
    const data = await res.json();
    sha = data.sha; // store SHA for updates
    const content = atob(data.content); // decode base64
    const products = JSON.parse(content);
    displayProducts(products);
    return products;
  } catch (err) {
    console.error("Error loading products:", err);
    return [];
  }
}

// ================== DISPLAY PRODUCTS ==================
function displayProducts(products) {
  table.innerHTML = "";
  products.forEach(p => {
    const status = getStatus(p.quantity, p.expiry);
    const cssClass = status.includes("Low") ? "low-stock" : status.includes("Expiring") ? "expiring" : "good";

    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.quantity}</td>
        <td>${p.expiry}</td>
        <td class="${cssClass}">${status}</td>
        <td>
          <button onclick="editProduct(${p.id})">Edit</button>
          <button onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ================== STATUS CHECK ==================
function getStatus(quantity, expiry) {
  const diffDays = (new Date(expiry) - new Date()) / 86400000;
  if (quantity <= 5) return "⚠ Low Stock";
  if (diffDays <= 7) return "⏰ Expiring Soon";
  return "✅ OK";
}

// ================== SAVE PRODUCTS TO GITHUB ==================
async function saveProducts(products, message = "Update products") {
  try {
    const res = await fetch(apiURL, {
      method: "PUT",
      headers: {
        Authorization: token ${token},
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message,
        content: btoa(JSON.stringify(products, null, 2)), // encode JSON
        sha: sha
      })
    });

    const data = await res.json();

    if (data.content && data.content.sha) {
      sha = data.content.sha; // update SHA
      // reload table after GitHub confirms update
      await loadProducts();
    } else {
      console.error("GitHub did not return updated content:", data);
    }
  } catch (err) {
    console.error("Error saving products:", err);
  }
}

// ================== ADD / EDIT PRODUCT ==================
form.addEventListener("submit", async e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const quantity = Number(document.getElementById("quantity").value);
  const expiry = document.getElementById("expiry").value;

  const products = await loadProducts();

  if (editId) {
    // EDIT existing product
    const index = products.findIndex(p => p.id === editId);
    products[index] = { ...products[index], name, quantity, expiry };
    editId = null;
  } else {
    // ADD new product
    const id = Date.now();
    products.push({ id, name, quantity, expiry });
  }

  form.reset();
  saveProducts(products);
});

// ================== EDIT PRODUCT ==================
async function editProduct(id) {
  const products = await loadProducts();
  const p = products.find(p => p.id === id);
  document.getElementById("name").value = p.name;
  document.getElementById("quantity").value = p.quantity;
  document.getElementById("expiry").value = p.expiry;
  editId = id;
}

// ================== DELETE PRODUCT ==================
async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  const products = await loadProducts();
  const updated = products.filter(p => p.id !== id);
  saveProducts(updated, "Delete product");
}

// ================== INITIAL LOAD ==================
loadProducts();
