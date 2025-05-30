function getProductCards(products, isDashboard = false) {
  let html = '';
  for (let product of products) {
    html += `
      <div class="product-card">
        <img src="${product.imagen}" alt="${product.name}">
        <h2>${product.nombre}</h2>
        <p>${product.descripcion}</p>
        <p>${product.precio}€</p>
        <a href="/products/${product._id}">Ver detalle</a>
        ${isDashboard ? `
          <a href="/dashboard/${product._id}/edit">Editar</a>
          <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST" style="display:inline;">
            <button type="submit">Eliminar</button>
          </form>` : ''}
      </div>`;
  }
  return html;
};

module.exports = getProductCards;