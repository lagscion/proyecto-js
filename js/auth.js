     function ingresar() {
        const usuario = document.getElementById("usuario");
        const pswrd = document.getElementById("contrasena");

        const usu = usuario.value;
        const contra = pswrd.value;

        if (contra !== "123456" || usu !== "admin@mail.com") {
            console.log("Usuario o contraseña incorrectos");
            alert("Acceso denegado");
        } else {
                console.log("¡Acceso correcto!");
                alert("Bienvenido");
                localStorage.setItem("sesion", JSON.stringify({activa: true}))
            setTimeout(() => {
                window.location.href = "admin.html";
            }, 500);
        }
    }

    const boton = document.getElementById("btnIngresar");
    boton.addEventListener("click", ingresar);

     function comprovacion (){
        localStorage.getItem()
    }



