
function sesion (){
    let ini = localStorage.getItem("sesion")
    let sesion = JSON.parse(ini)
    if (!sesion){
        window.location.href = "../pages/loggin.html"
    }
}

function logout() {
  let boton = document.getElementById("btn-volver");
  boton.addEventListener("click", function () {
    localStorage.removeItem("sesion");
    window.location.href = "../pages/loggin.html";
  });
}

sesion();
logout();

setInterval(sesion,3000);