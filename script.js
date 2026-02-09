const form = document.getElementById("productForm");
const table = document.getElementById("productTable");

let products = [];
let editIndex = null;

/* SUBMIT */
form.addEventListener("submit", e => {
  e.preventDefault();

  const product = {
    name: name.value,
    quantity: Number(quantity.value),
    expiry: expiry.value
  };

  if (editIndex === null) products.push(product);
  else {
    products[editIndex] = product;
    editIndex = null;
  }

  form.reset();
  displayProducts();
});

/* DISPLAY */
function displayProducts() {
  table.innerHTML = "";

  products.forEach((p, i) => {
    const status = getStatus(p.quantity, p.expiry);
    const cls = status.includes("Low") ? "low-stock" :
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
  name.value = products[i].name;
  quantity.value = products[i].quantity;
  expiry.value = products[i].expiry;
  editIndex = i;
}

/* DELETE */
function deleteProduct(i) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(i, 1);
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

/* LOGOUT */
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}