import {
  obtenerTodos,
  agregarItem,
  actualizarItem,
  eliminarItem,
} from "./storage.js";

let ideditando = null

function mostrarCategorias(){
    const categorias = obtenerTodos("categorias")
    const contenedor = document.getElementById("tarjetas")

contenedor.innerHTML = categorias.map((categoria) => {
    return `
    <div>
        <h1>${categoria.nombre}</h1>
        <p>${categoria.descripcion}</p>
        <button data-id="${categoria.id}">Editar</button>
        <button data-id="${categoria.id}">Eliminar</button>
    </div>
`;
  })
  .join("");
}

function agregarCategoria (){
    if (ideditando === null ){
      let x = document.getElementById("nombre");
      const nombre = x.value;
      let y = document.getElementById("descripcion");
      const descripcion = y.value;
      agregarItem("categorias", { nombre, descripcion });
      x.value = "";
      y.value = "";
      cerrarModal();
      mostrarCategorias();
    }
    else{
          const nombre = document.getElementById("nombre").value;
          const descripcion = document.getElementById("descripcion").value;
          actualizarItem("categorias", ideditando, { nombre, descripcion });
          ideditando = null;
          cerrarModal();
          mostrarCategorias();
    }
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
    mostrarCategorias();

    const agregar = document.getElementById("btnAgregar");
    agregar.addEventListener("click", abrirModal);
    const guardar = document.getElementById("btnGuardar");
    guardar.addEventListener("click", agregarCategoria);

    document.getElementById("tarjetas").addEventListener("click", function (e) {
      if (e.target.textContent === "Eliminar") {
        const id = e.target.dataset.id;
        eliminarItem("categorias", id);
        mostrarCategorias()
      }
      if (e.target.textContent === "Editar"){
        const id = e.target.dataset.id;
        editar(id);
        
      }
    });
    
});

function editar(id){
  ideditando = Number(id)
  let array = obtenerTodos("categorias")
  let Aeditar =array.find((item) => item.id === ideditando);
  document.getElementById("nombre").value = Aeditar.nombre;
  document.getElementById("descripcion").value = Aeditar.descripcion;
  abrirModal();
}

