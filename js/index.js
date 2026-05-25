import { obtenerTodos, agregarAlcarrito } from "./storage.js";

function mostrarProductos() {
  const productos = obtenerTodos("productos");
  const contenedor = document.getElementById("productos");

  contenedor.innerHTML = productos
    .map((producto) => {
      return `
        <div>
            <h1>${producto.nom}</h1>
            <p>${producto.codigo}</p>
            <p>${producto.precio}</p>
            <img src="${producto.imagen}">
            <p>${producto.descrp}</p>
            <button data-id="${producto.id}">agregar al carrito</button>
        </div>
    `;
    })
    .join("");
}

    document.addEventListener("DOMContentLoaded", function () {
    mostrarProductos();
    document.getElementById("productos")
    .addEventListener("click", function (e) {
      if (e.target.textContent === "agregar al carrito"){
        const productos = obtenerTodos("productos");
        const id = e.target.dataset.id;
        let producto = productos.find((item) => item.id === Number(id));
        agregarAlcarrito("carrito", producto);

      }
    })
    })