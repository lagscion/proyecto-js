
import { obtenerTodos, agregarAlcarrito } from "./storage.js";
import { productCard } from "./components/product-card.js";

function mostrarProductos() {
  const productos = obtenerTodos("productos");
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = productos.map(productCard).join("");
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarProductos();

  document.getElementById("productos").addEventListener("click", function (e) {
    if (e.target.closest(".product-card__btn")) {
      const id = e.target.dataset.id;
      const productos = obtenerTodos("productos");
      const producto = productos.find((item) => item.id === Number(id));
      agregarAlcarrito("carrito", producto);
    }
  });
});
