import {
  obtenerTodos,
  agregarItem,
  actualizarItem,
  eliminarItem,
} from "./storage.js";

export function mostrarPedidos() {
  const pedidos = document.getElementById("contenedor");
  let ordenes = obtenerTodos("pedido");
  ordenes.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  pedidos.innerHTML = ordenes
    .map((orden) => {
      // ✅ ahora multiplica precio × cantidad
      let total = orden.productos.reduce(
        (acc, item) => acc + Number(item.precio) * (item.cantidad || 1),
        0
      );
      return `
        <div>
          nombre: ${orden.nombre}
          identificacion: ${orden.identificacion}
          direccion: ${orden.direccion}
          telefono: ${orden.telefono}
          e-mail: ${orden.mail}
          fecha: ${new Date(orden.fecha).toLocaleDateString("es-ES")}
          total: ${total.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })}
          <button class="vermas" data-id="${orden.id}">VER MAS</button>
        </div>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarPedidos();
  activarVerMas();
});

function activarVerMas() {
  const contenedor = document.getElementById("contenedor");
  const modal = document.getElementById("modal");
  const detalleProducto = document.getElementById("detalleProducto");
  const cerrar = document.getElementById("cerrar");

  contenedor.addEventListener("click", function (e) {
    if (e.target.classList.contains("vermas")) {
      const id = Number(e.target.dataset.id);
      const ordenes = obtenerTodos("pedido");
      const pedido = ordenes.find((o) => o.id === id);

      detalleProducto.innerHTML = pedido.productos
        .map((item) => {
          // ✅ subtotal por producto
          const cantidad = item.cantidad || 1;
          const subtotal = Number(item.precio) * cantidad;
          return `
            <div>
              <img src="${item.imagen}" alt="${item.nom}">
              <h3>${item.nom}</h3>
              <p><strong>Categoría:</strong> ${item.categoria}</p>
              <p><strong>Precio unitario:</strong> ${Number(
                item.precio
              ).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}</p>
              <p><strong>Cantidad:</strong> ${cantidad}</p>
              <p><strong>Subtotal:</strong> ${subtotal.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}</p>
              <p><strong>Descripción:</strong> ${item.descrp}</p>
              <hr>
            </div>
          `;
        })
        .join("");

      modal.classList.remove("oculto");
    }
  });

  cerrar.addEventListener("click", () => {
    modal.classList.add("oculto");
  });
}
