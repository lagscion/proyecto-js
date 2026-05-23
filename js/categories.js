import {
  obtenerTodos,
  agregarItem,
  actualizarItem,
  eliminarItem,
} from "./storage.js";

function mostrarCategorias(){
    const categorias = obtenerTodos("categorias")
    const contenedor = document.getElementById("tarjetas")

contenedor.innerHTML = categorias.map((categoria) => {
    return `<h1>${categoria.nombre}</h1><p>${categoria.descripcion}</p>`;
  })
  .join("");
}

function agregarCategoria (){
    let x = document.getElementById("nombre") 
    const nombre = x.value
    let y = document.getElementById("descripcion");
    const descripcion = y.value
    agregarItem("categorias", {nombre, descripcion })
    x.value = ""
    y.value = ""
    cerrarModal();
    mostrarCategorias();
}

function abrirModal(){
    let cont = document.getElementById("modal")
    cont.style.visibility = "visible";
}

function cerrarModal() {
  let cont = document.getElementById("modal");
  cont.style.visibility = "hidden";
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarcategorias();
    const agregar = document.getElementById("btnAgregar");
    agregar.addEventListener("click", abrirModal);
    const guardar = document.getElementById("btnGuardar");
    guardar.addEventListener("click", agregarCategoria);

});