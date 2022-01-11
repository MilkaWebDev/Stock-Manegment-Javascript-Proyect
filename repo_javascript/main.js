function random() {
    return Math.floor((Math.random() * (9999 - 0001 +1)) + 0001);
};

class Ingreso {
    constructor (codigo, modelo, marca, talle, color, stock,  precio) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.marca = marca;
        this.talle = talle;
        this.color = color;
        this.stock = stock;
        this.precio = precio;
        
        
    }

    calcularPrecio (){
        this.precio = (this.precio * 3) * 1.21;
    }

}

const producto = new Ingreso(codigo, modelo, marca, talle, color, stock, precio);
const productos = [];
const codigosEnTabla = [];

const tablaProductos = document.getElementById('tablaProductos');
const btnGenerar = document.getElementById('generar');
const btnAgregarStock = document.getElementById('btnAgregarStock');




class UI {
    addProduct(producto) {
        const fila = tablaProductos.insertRow();
        fila.innerHTML = `<tr id="listaProductos" >
                            <th class="codigoTabla">${producto.codigo}</th>
                            <td>${producto.modelo}</td>
                            <td>${producto.marca}</td>
                            <td>${producto.talle}</td>
                            <td>${producto.color}</td>
                            <td>${producto.stock}</td> 
                            <td>${producto.precio}</td> 
                            <td><a href="#" id="${producto.codigo}" name="eliminar" class= "btn btn-outline-danger">Eliminar</a></td>
                            </tr>`

        
    
        tablaProductos.appendChild(fila);
        $("#parrafo").hide();
        $("#btnAgregarStock").show();
       
    }
    //este array contiene todos los productos que ingreso
    generarArray(producto) {
        productos.push(producto);
    }

    resetearFormulario(){
        document.getElementById('formulario').reset();
    }

    eliminarProducto(element){
        if(element.name === 'eliminar'){
           element.parentElement.parentElement.remove();
           
        }
        
    }

   
}


//DOM
document.getElementById('formulario')
    .addEventListener('submit', function(e){
        const codigo = document.getElementById('codigo').value;
        const modelo = document.getElementById('modelo').value;
        const marca = document.getElementById('marca').value;
        const talle = document.getElementById('talle').value;
        const color = document.getElementById('color').value;
        const stock = document.getElementById('stock').value;
        const precio = document.getElementById('precio').value;

        const producto = new Ingreso(codigo, modelo, marca, talle, color, stock, precio);

    
        const ui = new UI();
        ui.addProduct(producto);
        ui.generarArray(producto);
        ui.resetearFormulario();
        
        
        e.preventDefault();

        

}
)

//boton elimina productos de lista html (pero no del array Productos)

tablaProductos.addEventListener('click', function(e){
    const ui = new UI();
    ui.eliminarProducto(e.target);

})


//boton que genera codigo automaticamente

btnGenerar.addEventListener('click', function(e){
    document.getElementById('codigo').value = random();
})


// boton que almacena stock 
btnAgregarStock.addEventListener('click', function(e){
    //creo un array con los codigos que estan en mi tabla html
    let codTabla = tablaProductos.querySelectorAll('th');
    let    result = [];
    for (let i = 0; i < codTabla.length; i++){
        result.push(codTabla[i].textContent)
    }
    
    //filtro el array productos, si elimine uno de mi tabla html, no va a aparecer en mi array final
    let filtro = productos.filter((producto) => result.includes(producto.codigo));
    //console.log(filtro);

    //Guardar en localstorage

    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
    guardarLocal("listaProductos", JSON.stringify(filtro));

    location.reload();


})


