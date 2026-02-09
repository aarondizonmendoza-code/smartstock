/* ELEMENTS */
const form = document.getElementById("productForm");
const table = document.getElementById("productTable");

const nameInput = document.getElementById("name");
const quantityInput = document.getElementById("quantity");
const expiryInput = document.getElementById("expiry");

/* LOAD FROM LOCALSTORAGE */
let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

/* INITIAL DISPLAY */
displayProducts();

/* SUBMIT */
form.addEventListener("submit", e => {
  e.preventDefault();

  const product = {
    name: nameInput.value.trim(),
    quantity: Number(quantityInput.value),
    expiry: expiryInput.value
  };

  if (!product.name || !product.quantity || !product.expiry) {
    alert("Please fill out all fields");
    return;
  }

  if (editIndex === null) {
    products.push(product);
  } else {
    products[editIndex] = product;
    editIndex = null;
  }

  saveToStorage();
  form.reset();
  displayProducts();
});

/* DISPLAY */
function displayProducts() {
  table.innerHTML = "";

  products.forEach((p, i) => {
    const status = getStatus(p.quantity, p.expiry);
    const cls =
      status.includes("Low") ? "low-stock" :
      status.includes("Expiring") ? "expiring" : "good";

    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.quantity}</td>
        <td>${p.expiry}</td>
        <td class="${cls}">${status}</td>
        <td>
          <button onclick="editProduct(${i})">Edit</button>
          <button onclick="deleteProduct(${i})">Delete</button>
        </td>
      </tr>
    `;
  });
}

/* EDIT */
function editProduct(i) {
  nameInput.value = products[i].name;
  quantityInput.value = products[i].quantity;
  expiryInput.value = products[i].expiry;
  editIndex = i;
}

/* DELETE */
function deleteProduct(i) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(i, 1);
    saveToStorage();
    displayProducts();
  }
}

/* STATUS */
function getStatus(q, d) {
  const diff = (new Date(d) - new Date()) / 86400000;
  if (q <= 3) return "⚠ Low Stock";
  if (diff <= 7) return "⏰ Expiring Soon";
  return "✅ OK";
}

/* SAVE */
function saveToStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}