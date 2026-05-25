import { obtenerTodos, agregarAlcarrito } from "./storage.js";

function cargarDetalle() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const productos = obtenerTodos("productos");
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    document.querySelector(
      ".detalle-contenedor"
    ).innerHTML = `<p style="font-family:sans-serif;color:#290b5e;padding:40px;">Producto no encontrado.</p>`;
    return;
  }

  document.getElementById("header-nombre").textContent = producto.nom;
  document.getElementById("detalle-imagen").src = producto.imagen;
  document.getElementById("detalle-imagen").alt = producto.nom;
  document.getElementById("detalle-categoria").textContent = producto.categoria;
  document.getElementById("detalle-nombre").textContent = producto.nom;
  document.getElementById(
    "detalle-codigo"
  ).textContent = `Código: ${producto.codigo}`;
  document.getElementById("detalle-descripcion").textContent = producto.descrp;
  document.getElementById("detalle-precio").textContent = `$${Number(
    producto.precio
  ).toLocaleString("es-CO")}`;

  document.getElementById("btn-agregar").addEventListener("click", function () {
    agregarAlcarrito("carrito", producto);
    const mensaje = document.getElementById("mensaje-carrito");
    mensaje.style.display = "block";
    setTimeout(() => {
      mensaje.style.display = "none";
    }, 2000);
  });
}

document.addEventListener("DOMContentLoaded", cargarDetalle);
