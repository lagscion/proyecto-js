import { obtenerTodos, agregarAlcarrito } from "./storage.js";
import { productCard } from "./components/product-card.js";

function mostrarProductos(filtroTexto = "", filtroCategoria = "") {
  const productos = obtenerTodos("productos");
  const contenedor = document.getElementById("productos");

  const filtrados = productos.filter((p) => {
    const textoCoincide =
      p.nom.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      p.descrp.toLowerCase().includes(filtroTexto.toLowerCase());
    const categoriaCoincide =
      filtroCategoria === "" || p.categoria === filtroCategoria;
    return textoCoincide && categoriaCoincide;
  });

  if (filtrados.length === 0) {
    contenedor.innerHTML = `<p style="text-align:center; color: #290b5e; font-family: sans-serif; padding: 40px;">No se encontraron productos.</p>`;
    return;
  }

  contenedor.innerHTML = filtrados.map(productCard).join("");
}

function cargarFiltros() {
  const categorias = obtenerTodos("categorias");
  const select = document.getElementById("filtroCategoria");

  select.innerHTML =
    `<option value="">Todas las categorías</option>` +
    categorias
      .map((c) => `<option value="${c.nombre}">${c.nombre}</option>`)
      .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  cargarFiltros();
  mostrarProductos();

  document.getElementById("buscador").addEventListener("input", function () {
    const texto = this.value;
    const categoria = document.getElementById("filtroCategoria").value;
    mostrarProductos(texto, categoria);
  });

  document
    .getElementById("filtroCategoria")
    .addEventListener("change", function () {
      const texto = document.getElementById("buscador").value;
      mostrarProductos(texto, this.value);
    });

  document.getElementById("productos").addEventListener("click", function (e) {
    if (e.target.closest(".product-card__btn")) {
      const id = e.target.dataset.id;
      const productos = obtenerTodos("productos");
      const producto = productos.find((item) => item.id === Number(id));
      agregarAlcarrito("carrito", producto);
    }
  });
});
