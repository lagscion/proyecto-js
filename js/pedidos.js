import { obtenerTodos } from "./storage.js";

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
