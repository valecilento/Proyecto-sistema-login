async function saveProduct(productId) {
  const title = document.getElementById(`input-title-${productId}`).value;
  const description = document.getElementById(`input-description-${productId}`).value;
  const price = parseFloat(document.getElementById(`input-price-${productId}`).value);
  const stock = parseInt(document.getElementById(`input-stock-${productId}`).value);

  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, price, stock }),
  });

  if (response.ok) {
    alert("Producto actualizado");
  } else {
    alert("Error al actualizar el producto");
  }
}
