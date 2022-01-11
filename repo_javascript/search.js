const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
const productos = [];
const inputSearch = $("#inputSearch");
const listaCodigos = document.getElementById("listaCodigos")
const resultadobusqueda = document.getElementById("resultadobusqueda")
const tabla = document.getElementById("tablaCarrito");




//recupero objetos del local storage
class Producto {
    constructor(obj) {
        this.codigo = obj.codigo;
        this.modelo = obj.modelo;
        this.marca = obj.marca;
        this.talle = obj.talle;
        this.color = obj.color;
        this.stock = parseInt(obj.stock);
        this.precio = parseInt(obj.precio)
        this.precioefc = parseInt(obj.precio * 3);
        this.preciotarjeta = parseInt((obj.precio * 3) * 1.2)
    }
}



for (const objeto of almacenados)
    productos.push(new Producto(objeto));



//buscador de productos por codigo





//crea una lista de productos 

const displayLista = (productos) => {
    const htmlstring = productos.map(producto => {
        return `
        <a href="#" name='codEnLista' id="${producto.codigo}" class="list-group-item list-group-item-action">COD. ${producto.codigo}</a>
        `;
    })
    .join('');
    listaCodigos.innerHTML = htmlstring;  
        
}



//busqueda en el input
inputSearch.on('keyup', (e) => {
    const searchString = e.target.value;
    const filtroProductos = productos.filter (producto => {
        return producto.codigo.includes(searchString);
    })
    
    displayLista(filtroProductos);

    
    }
    
    
)

$("#busqueda").click(function (e){
    let element = e.target
    for (producto of productos){
        if(element.id === producto.codigo){
            if(producto.stock > 0){
                let container2 = document.createElement("div");
                container2.innerHTML = `
                <div class="container card" style="margin-top: 2%; padding: 1%; text-transform: uppercase;">
                    <div class="row">
                        <div class="col-md-12">
                            <h4>COD. ${producto.codigo}</h4>
                        </div>
                    </div>
                    <div class="card-body containerbody"> 
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bolder">Marca: ${producto.marca}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="font-weight-bolder">Modelo: ${producto.modelo}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bolder">Talle: ${producto.talle}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="font-weight-bolder">Color: ${producto.color}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <p class="text-warning font-weight-bolder">STOCK DISPONIBLE: <span class="cantidad">${producto.stock}</span></p> 
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bolder">PRECIO EFECTIVO: $${producto.precioefc}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="font-weight-bolder">PRECIO TARJETA: $${producto.preciotarjeta} </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-10 justify-content-end pt-4">
                                <button name="${producto.codigo}" class="btn btn-success">AGREGAR AL CARRITO</button>
                            </div>
                            <div class="col-md-2 justify-content-end pt-4">
                                <button name="borrar" class="btn btn-light">BORRAR</button>
                            </div>
                        </div>
                    </div>
                </div> `
            resultadobusqueda.appendChild(container2)
            }else if(producto.stock === 0){
                let container2 = document.createElement("div");
                container2.innerHTML = `
                <div class="container card" style="margin-top: 2%; padding: 1%; text-transform: uppercase;">
                    <div class="row">
                        <div class="col-md-12">
                            <h4>COD. ${producto.codigo}</h4>
                        </div>
                    </div>
                    <div class="card-body containerbody"> 
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bolder">Marca: ${producto.marca}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="font-weight-bolder">Modelo: ${producto.modelo}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bolder">Talle: ${producto.talle}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="font-weight-bolder">Color: ${producto.color}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <p class="text-danger font-weight-bolder">STOCK DISPONIBLE: <span class="cantidad">${producto.stock}</span></p> 
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bolder">PRECIO EFECTIVO: $${producto.precioefc}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="font-weight-bolder">PRECIO TARJETA: $${producto.preciotarjeta} </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-2 justify-content-end pt-4">
                                <button name="borrar" class="btn btn-light">BORRAR</button>
                            </div>
                        </div>
                    </div>
                </div> `
            resultadobusqueda.appendChild(container2)
            }
        }
        else{
            $("#busqueda a").hide();
        }
}


})



class UI {
    //cosas que pasan despues de busqueda
    agregarCarrito(element){
        for(producto of productos)
            if(element.name === producto.codigo){

                const fila = tabla.insertRow();

                fila.innerHTML = `<tr>
                <th>${producto.codigo}</th>
                <td>${producto.modelo}(${producto.marca})</td>
                
                <td class="cantidad">${parseInt(1)}</td> 
                <td><button type="button" name="sumBtn" class="btn btn-primary btn-rounded">+</button> <button type="button" name="restaBtn" class="btn btn-danger btn-rounded">-</button></td>
                
                <td class="precioEfectivo">$${parseInt(producto.precioefc)}</td> 
                <td class="precioTarjeta">$${parseInt(producto.preciotarjeta)}</td> 
                
                </tr>`

                tabla.appendChild(fila); 

            //esto pasa en la tabla   
            $("#parrafo").hide();
            $("#btnFinal").show();

            //elimino la card de la busqueda
            element.parentElement.parentElement.parentElement.parentElement.remove();

            
            //AJAX
            const URLGET   = "https://jsonplaceholder.typicode.com/posts"

            $.post(URLGET, producto ,(respuesta, estado) => {
                    if(estado === "success"){
                        $(".container-fluid").prepend(`<div id="mensaje" class="alert alert-success" role="alert">
                        COD.${respuesta.codigo} agregado al carrito
                        </div>`);
                         }  
                    });
                
            }

            setTimeout(function(){
                $('#mensaje').remove();
            }, 2000)
    
    }
    
    eliminarContainer(element) {
        if(element.name === 'borrar'){
            element.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }
    
    //cosas que pasan en tabla

    modificarCantidad(element){
        const elementoPadre = element.parentElement.parentElement
        const encontrar = productos.find(producto => producto.codigo ===  elementoPadre.querySelector("th").textContent)
        let cantidad = parseInt(elementoPadre.querySelector(".cantidad").textContent)
        if(element.name === 'sumBtn'){
             if(cantidad < encontrar.stock){
                let a = cantidad + 1
                elementoPadre.querySelector(".cantidad").textContent = a
                elementoPadre.querySelector(".precioEfectivo").textContent = "$"+(encontrar.precioefc*a);
                elementoPadre.querySelector(".precioTarjeta").textContent = "$"+(encontrar.preciotarjeta*a);

            } else if (cantidad = encontrar.stock){
                alert('no hay mas stock disponible')
            }
               
           
        } else if(element.name === "restaBtn"){
            if(cantidad > 1){
                let b = cantidad - 1 
                elementoPadre.querySelector(".cantidad").textContent = b
                elementoPadre.querySelector(".precioEfectivo").textContent = "$"+(encontrar.precioefc*b);
                elementoPadre.querySelector(".precioTarjeta").textContent = "$"+(encontrar.preciotarjeta*b);



            } else if (cantidad = 1){
                elementoPadre.remove();
            }
        }
    }

    //cosas que pasan en el footer

    sumarCantidades(){
        let cantidadesTabla = tabla.querySelectorAll(".cantidad");
        let result = [];
        for (let i = 0; i < cantidadesTabla.length; i++){
            result.push(parseInt(cantidadesTabla[i].textContent))
        }
        let sumaCantidades = result.reduce((a, b) => a + b, 0);
        document.getElementById('cantidadTotal').textContent = sumaCantidades;
    }
    
    sumarPrecio(enter, exit){
        let entrada = tabla.querySelectorAll(enter);
        let result = []
        for (let i = 0; i < entrada.length; i++){
            result.push(entrada[i].textContent)
        }
        
        var sum = result.reduce(function(pre, curr){
            if(isNaN(curr[0]))return pre+(+curr.slice(1));
            return pre+curr;
          },0);
    
          document.getElementById(exit).textContent = '$'+sum;
    }

    vaciarCarrito(element){
        if(element.name === "vaciarFooter"){
            document.getElementById('cantidadTotal').textContent = 0;
            document.getElementById('totalEfc').textContent = 0;
            document.getElementById('totalCred').textContent = 0;
            $("#parrafo").show();
            $("#btnFinal").hide();


            const fila = tabla.querySelectorAll('tr');
            fila.forEach(elemento => elemento.remove());
            
        }
    }
}

//boton "agregar carrito"
resultadobusqueda.addEventListener('click', function(e){
    const ui = new UI();
    ui.agregarCarrito(e.target)
    ui.eliminarContainer(e.target);
    ui.sumarCantidades();
    ui.sumarPrecio(".precioEfectivo", "totalEfc");
    ui.sumarPrecio(".precioTarjeta", "totalCred");
    
    
})

//botonos que modifican cantidades en tabla
tabla.addEventListener('click', function(e){
    const ui = new UI();
    ui.modificarCantidad(e.target);
    ui.sumarCantidades();
    ui.sumarPrecio(".precioEfectivo", "totalEfc");
    ui.sumarPrecio(".precioTarjeta", "totalCred");
    
})


//boton vaciar
$("#footerCarrito").click(function(e){
    const ui = new UI();
    ui.vaciarCarrito(e.target)
})


//cambiar estos datos en el formulario
$("#btnFinal").click(function(e){
    let codFinal = tabla.querySelectorAll('th');
    let cantFinal = tabla.querySelectorAll(".cantidad")
    for(let i = 0; i < codFinal.length; i++){
        for(producto of productos){
            if(producto.codigo === codFinal[i].textContent){
                if(producto.stock >= cantFinal[i].textContent){
                    let stockRestante = producto.stock - cantFinal[i].textContent;
                    producto.stock = stockRestante
                    console.log(productos)

                }
            }
        }
    }



    //guardar productos con modificacion
    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
    guardarLocal("listaProductos", JSON.stringify(productos));

    //recargar pag
    location.reload();
})