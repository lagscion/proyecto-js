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
        .map((orden) => {let total = orden.productos.reduce((acc, item) => acc + Number(item.precio), 0);
        return `
        <div>nombre: ${orden.nombre}
        identificacion: ${orden.identificacion}
        direccion: ${orden.direccion}
        telefono: ${orden.telefono}
        e-mail: ${orden.mail}
        fecha: ${new Date(orden.fecha).toLocaleDateString("es-ES")}
        producto: ${orden.productos.map((item) => item.nom).join(", ")}
        total: ${total}
        <div>
        `;
        })
        .join("");
    }

    document.addEventListener("DOMContentLoaded",function(){
        mostrarPedidos();
    })  