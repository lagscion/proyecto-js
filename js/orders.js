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
            .map((orden, index) => {let total = orden.productos.reduce((acc, item) => acc + Number(item.precio), 0);
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
            <button class="vermas" data-index="${index}">VER MAS</button>
            <div>
            `;
            })
            .join("");
            // producto: ${orden.productos.map((item) => item.nom).join(", ")}
        }

        document.addEventListener("DOMContentLoaded",function(){
            mostrarPedidos();
            activarVerMas();

        })  

function activarVerMas() {
  const botones = document.querySelectorAll(".vermas");

  botones.forEach((boton) => {
    boton.addEventListener("click", function () {
      const index = this.dataset.index;
      const ordenes = obtenerTodos("pedido");
      const pedido = ordenes[index];

      let productos = pedido.productos
        .map(
          (item) => `
                    Producto: ${item.nom}
                    categoria: ${item.categoria}
                    Precio: ${Number(item.precio).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                    descripcion${item.descrp}
                `
        )
        .join("\n");

      alert(productos);
    });
  });
}