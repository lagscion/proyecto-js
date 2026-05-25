import { agregarItem, eliminarItem, obtenerTodos} from "./storage.js";

export function mostrarProductos() {
  let carrito = obtenerTodos("carrito");
  const contenedor = document.getElementById("contenedor");

  contenedor.innerHTML = carrito
    .map((item) => {
      return `
        <div>
            <h1>${item.nom}</h1>
            <p>${item.codigo}</p>
            <p>${item.precio}</p>
            <img src="${item.imagen}">
            <p>${item.descrp}</p>
            <button data-id="${item.id}">eliminar del carrito</button>
        </div>
    `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", function(){
    mostrarProductos();
    document.getElementById("contenedor")
        .addEventListener("click", function(e) {
            if (e.target.textContent === "eliminar del carrito") {
                const id = e.target.dataset.id;
                eliminarItem("carrito", id);
                mostrarProductos();
                sumatoria();
            }
        }
    )
        })

document.getElementById("comprar").addEventListener("click", function () {
    sumatoria();
  abrirModal();
});

document.getElementById("aceptar").addEventListener("click", function(){
    confirmar()
})

function abrirModal() {
    
    let identifi =document.getElementById("Noidentificacion");
    let  nombre = document.getElementById("nombre");
    let direccion = document.getElementById("direccion");
    let telefono = document.getElementById("telefono");
    let mail = document.getElementById("mail");
    const cont = document.getElementById("modal");
    Noiden.value = ""
    nombre.value = "";
    direccion.value = "";
    telefono.value ="";
    mail.value ="";
     
    cont.style.visibility = "visible";
}

function cerrarModal(){
    const cont = document.getElementById("modal");
    cont.style.visibility = "hidden";

}

function confirmar(){
                let Noiden = document.getElementById("Noiden").value;
                let nombre = document.getElementById("nombre").value;
                let direccion = document.getElementById("direccion").value;
                let telefono = document.getElementById("telefono").value;
                let mail = document.getElementById("mail").value;
                let fecha = new Date().toLocaleDateString("es-ES");
                let productos = obtenerTodos("carrito")
                agregarItem("pedido", {
                  identificacion: Noiden,
                  nombre: nombre,
                  direccion: direccion,
                  telefono: telefono,
                  mail: mail,
                  fecha: fecha,
                  productos: productos,
                });
                localStorage.removeItem("carrito");
                cerrarModal();
                mostrarProductos();
}

    function sumatoria(){
        let valor = document.getElementById("valor")
        let productos = obtenerTodos("carrito")
        let sumatoria = productos.reduce((acumulador, item)=>{
            return acumulador + Number(item.precio);
        },0)
        valor.innerHTML = `el valor de su compra seria ${sumatoria}` 
    }