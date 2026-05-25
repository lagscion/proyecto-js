import {
  obtenerTodos,
  agregarItem,
  actualizarItem,
  eliminarItem,
} from "./storage.js";

let ideditando = null;

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
            <button data-id="${producto.id}">Editar</button>
            <button data-id="${producto.id}">Eliminar</button>
        </div>
    `;
    })
    .join("");
}

function agregarProducto() {
  if (ideditando === null) {
    // declaro variables
    const codigo = document.getElementById("codigo").value;
    const nom = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;
    const imagen = document.getElementById("imagen").value;
    const descrp = document.getElementById("descripcion").value;
    //declaro variables

    agregarItem("productos", {
      codigo,
      nom,
      categoria,
      precio,
      imagen,
      descrp,
    });
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("imagen").value = "";
    document.getElementById("descripcion").value = "";
    cerrarModal();
    mostrarProductos();
  } else {
    const codigo = document.getElementById("codigo").value;
    const nom = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;
    const imagen = document.getElementById("imagen").value;
    const descrp = document.getElementById("descripcion").value;
    actualizarItem("productos", ideditando, {
      codigo,
      nom,
      categoria,
      precio,
      imagen,
      descrp,
    });
    ideditando = null;
    cerrarModal();
    mostrarProductos();
  }
}

function abrirModal() {
  document.getElementById("codigo").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("imagen").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("modal").style.visibility = "visible";
  cargarCategorias();
}

    function cerrarModal() {
    let cont = document.getElementById("modal");
    cont.style.visibility = "hidden";
    }

    document.addEventListener("DOMContentLoaded", function () {
        mostrarProductos();
    
        const agregar = document.getElementById("agregar");
        agregar.addEventListener("click", abrirModal);
        const guardar = document.getElementById("guardar");
        guardar.addEventListener("click", agregarProducto);
    
        document.getElementById("productos").addEventListener("click", function (e) {
            if (e.target.textContent === "Eliminar") {
              const id = e.target.dataset.id;
              eliminarItem("productos", id);
              mostrarProductos();
            }
            if (e.target.textContent === "Editar") {
              const id = e.target.dataset.id;
              editar(id);
            }
          });
        
    });
    

    function editar(id){
      ideditando = Number(id)
      let array = obtenerTodos("productos")
      let Aeditar =array.find((item) => item.id === ideditando);
  document.getElementById("codigo").value = Aeditar.codigo ;
  document.getElementById("nombre").value = Aeditar.nombre ;
  document.getElementById("categoria").value = Aeditar.categoria;
  document.getElementById("precio").value = Aeditar.precio ;
  document.getElementById("imagen").value = Aeditar.imagen ;
  document.getElementById("descripcion").value = Aeditar.descrp;
      abrirModal();
    }

    function cargarCategorias(){
      const categorias = obtenerTodos("categorias");
      const select = document.getElementById("categoria");

      select.innerHTML = categorias
        .map((categoria) => {
          return `<option value="${categoria.nombre}">${categoria.nombre}</option>`;
        })
        .join("");
    }

    document.addEventListener("DOMContentLoaded");