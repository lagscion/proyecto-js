    import {
    agregarItem,
    eliminarItem,
    obtenerTodos,
    agregarAlcarrito,
    } from "./storage.js";

    export function mostrarProductos() {
    let carrito = obtenerTodos("carrito");
    const contenedor = document.getElementById("contenedor");

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p>El carrito está vacío.</p>`;
        return;
    }

    contenedor.innerHTML = carrito
        .map((item) => {
        const subtotal = Number(item.precio) * item.cantidad;
        return `
            <div>
                <h1>${item.nom}</h1>
                <p>${item.codigo}</p>
                <img src="${item.imagen}">
                <p>${item.descrp}</p>
                <p>Precio unitario: $${Number(item.precio).toLocaleString(
                "es-CO"
                )}</p>

                <button class="restar" data-id="${item.id}">-</button>
                <span>${item.cantidad}</span>
                <button class="sumar" data-id="${item.id}">+</button>

                <p>Subtotal: $${subtotal.toLocaleString("es-CO")}</p>
                <button class="eliminar" data-id="${
                item.id
                }">eliminar del carrito</button>
            </div>
        `;
        })
        .join("");

    sumatoria(); // ✅ siempre actualiza el total al renderizar
    }

    document.addEventListener("DOMContentLoaded", function () {
    mostrarProductos();

    document.getElementById("contenedor").addEventListener("click", function (e) {
        const id = Number(e.target.dataset.id);

        // Eliminar
        if (e.target.classList.contains("eliminar")) {
        eliminarItem("carrito", id);
        mostrarProductos();
        }

        // Restar cantidad
        if (e.target.classList.contains("restar")) {
        const carrito = obtenerTodos("carrito");
        const item = carrito.find((p) => p.id === id);
        if (item.cantidad > 1) {
            item.cantidad -= 1;
        } else {
            // Si llega a 0, elimina el producto
            eliminarItem("carrito", id);
            mostrarProductos();
            return;
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarProductos();
        }

        // Sumar cantidad
        if (e.target.classList.contains("sumar")) {
        const carrito = obtenerTodos("carrito");
        const item = carrito.find((p) => p.id === id);
        item.cantidad += 1;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarProductos();
        }
    });

    document.getElementById("comprar").addEventListener("click", function () {
        abrirModal();
    });

    document.getElementById("aceptar").addEventListener("click", function () {
        confirmar();
    });
    });

    function abrirModal() {
    document.getElementById("Noiden").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("modal").style.visibility = "visible";
    document.getElementById("modal").style.display = "flex";
    }

    function cerrarModal() {
    const cont = document.getElementById("modal");
    cont.style.visibility = "hidden";
    }

    function confirmar() {
    let Noiden = document.getElementById("Noiden").value;
    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let mail = document.getElementById("mail").value;

    if (!/^\d{10}$/.test(telefono)) {
        alert("El teléfono debe tener exactamente 10 números");
        return;
    }

    let fecha = new Date().toISOString();
    let productos = obtenerTodos("carrito");

    agregarItem("pedido", {
        identificacion: Noiden,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        mail: mail,
        fecha: fecha,
        productos: productos, // ✅ cada producto ya trae su cantidad
    });

    localStorage.removeItem("carrito");
    cerrarModal();
    mostrarProductos();
    }

    function sumatoria() {
    const valor = document.getElementById("valor");
    const productos = obtenerTodos("carrito");

    // ✅ ahora multiplica precio × cantidad
    const total = productos.reduce((acc, item) => {
        return acc + Number(item.precio) * item.cantidad;
    }, 0);

    valor.innerHTML = `Total: ${total.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
    })}`;
    }
