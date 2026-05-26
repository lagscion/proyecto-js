export function obtenerTodos(clave){
    const datos = localStorage.getItem(clave);
    if (!datos) {
        return [];
    }
    return JSON.parse(datos);
}

            export function agregarItem(clave, valor){
                const array = obtenerTodos(clave)
                valor.id = Date.now()
                array.push (valor)

                localStorage.setItem(clave, JSON.stringify(array) )
            }

        export function actualizarItem(clave, id, datosNuevos){
            const datos = obtenerTodos(clave)
            let arrayact = datos.map(item => {
            if(item.id === id){
                return {...item, ...datosNuevos}
            }
            return item;
            }
        )
        localStorage.setItem(clave, JSON.stringify(arrayact));
        }

        export function eliminarItem(clave, id ){
            const datos = obtenerTodos(clave);
            let newarray = datos.filter((item) => item.id !== Number(id));
            localStorage.setItem(clave, JSON.stringify(newarray));
        }

export function agregarAlcarrito(clave, valor) {
  const array = obtenerTodos(clave);

  // ¿Ya existe este producto en el carrito?
  const existente = array.find((item) => item.id === valor.id);

  if (existente) {
    // Solo aumenta la cantidad
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    // Es nuevo, agrégalo con cantidad 1
    valor.cantidad = 1;
    array.push(valor);
  }

  localStorage.setItem(clave, JSON.stringify(array));
}
