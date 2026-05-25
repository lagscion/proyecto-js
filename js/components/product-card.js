
export function productCard(producto) {
  return `
    <article class="product-card" data-id="${producto.id}">
      <img src="${producto.imagen}" alt="${producto.nom}" class="product-card__img">
      <div class="product-card__body">
        <span class="product-card__category">${producto.categoria}</span>
        <h2 class="product-card__name">${producto.nom}</h2>
        <p class="product-card__desc">${producto.descrp}</p>
        <div class="product-card__footer">
          <span class="product-card__price">$${Number(producto.precio).toLocaleString("es-CO")}</span>
          <button class="product-card__btn" data-id="${producto.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  `;
}
