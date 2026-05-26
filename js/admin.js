function sesion (){
    let ini = localStorage.getItem("sesion")
    let sesion = JSON.parse(ini)
    if (!sesion){
        window.location.href = "../pages/loggin.html"
    }
}

sesion();

setInterval(sesion,3000);