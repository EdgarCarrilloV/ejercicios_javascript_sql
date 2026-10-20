//1.Validación de formulario 

function validarUsuario() {
    var name = document.getElementById("nameText").value;
    var age = document.getElementById("ageText").value;
    var email = document.getElementById("emailText").value;

    if (name === "" || age === "" || email === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (isNaN(age) || age < 18) {
        alert("Por favor, ingrese una edad válida, debe ser mayor de 18 años. " + age);
        return;
    }

    if (!validateEmail(email) ) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    alert("Formulario enviado correctamente:\nNombre: " + name + "\nEdad: " + age + "\nCorreo electrónico: " + email);
}

function validateEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

//caso de prueba 
function probarValidacion() {
    document.getElementById("nameText").value = "Edgar";
    document.getElementById("ageText").value = "25";
    document.getElementById("emailText").value = "edgar@example.com";
    validarUsuario();

    document.getElementById("nameText").value = "Brandom";
    document.getElementById("ageText").value = "17";
    document.getElementById("emailText").value = "brandom@example.com";
    validarUsuario();
}

//2.Filtrado de productos 

const productos = [{id:1,nombre:"Mouse",precio:350,disponible:true},{id:2,nombre:"Teclado",precio:650,disponible:true},{id:3,nombre:"Cable",precio:120,disponible:false},{id:4,nombre:"Base",precio:280,disponible:true}];

function mostrarProductosDisponibles() {
    var productosDisponibles = productos.filter(function(producto) {
        return producto.disponible;
    });

    var listaProductos = "Productos disponibles:\n";
    for (var i = 0; i < productosDisponibles.length; i++) {
        listaProductos += "- " + productosDisponibles[i].nombre + " - $ " + productosDisponibles[i].precio + "\n";
    }

    //Filtrado precios
    var productosFiltrados = productosDisponibles.filter(function(producto) {
        return producto.precio < 500;
    });

    //Ordenar de forma ascendente por precio
    productosFiltrados.sort(function(a, b) {
        return a.precio - b.precio;
    });

    alert(listaProductos + "\nProductos con precio menor a $500:\n" + productosFiltrados.map(function(producto) {
        return "- " + producto.nombre + " - $ " + producto.precio;
    }).join("\n"));
}

//3.Carrito de compras
const carrito = [{precio:400,cantidad:2},{precio:150,cantidad:3}];

function mostrarProductosCarrito() {
    var listaCarrito = "Productos en el carrito:\n";
    for (var i = 0; i < carrito.length; i++) {
        listaCarrito += "- " + carrito[i].precio + " - Cantidad: " + carrito[i].cantidad + "\n";
    }
    alert(listaCarrito);
}

function calcularTotalCarrito() {
    var total = carrito.reduce(function(acumulador, producto) {
        return acumulador + (producto.precio * producto.cantidad);
    }, 0);

    alert("El total del carrito es: $ " + total);
}

function aplicarDescuento() {
    var total = carrito.reduce(function(acumulador, producto) {
        return acumulador + (producto.precio * producto.cantidad);
    }, 0);
    var totalConDescuento = total - (total * 0.1); // Aplicar un descuento del 10%
    alert("El total del carrito con descuento es: $ " + totalConDescuento);
}

// 4.Manipulacion del DOM

function aumentarLista() {
            const lista = document.getElementById("lista");
            const input = document.getElementById("listaInput");
            const contenido = input.value.trim();

            if (contenido !== "") {
                const nuevoElemento = document.createElement("li");
                nuevoElemento.textContent = contenido;
                lista.appendChild(nuevoElemento);
                input.value = "";
            } else {
                alert("Por favor, ingrese un valor para agregar a la lista.");
            } 
}

function disminuirLista() {
            const lista = document.getElementById("lista");
            if (lista.children.length > 0) {
                lista.removeChild(lista.lastElementChild);
            } else {
                alert("No hay elementos para eliminar.");
            } 

}

//5.Consumo de API

function consumirAPI() {
    const respuesta = document.getElementById("apiResponse");
    const lista = document.getElementById("apiList");

    respuesta.textContent = "Cargando . . .";
    lista.textContent= "";


    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => { 
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const apiList = document.getElementById("apiList");
            apiList.innerHTML = ""; //limpiamos lista

            data.forEach(user => {
                const li = document.createElement("li");
                li.textContent = `${user.name} - ${user.email}`;
                apiList.appendChild(li);
            });
            respuesta.textContent = "Datos obtenidos correctamente.";
        })
        .catch(error => {
            respuesta.textContent = "Error al consumir la API: " + error.message;
        });
        
}
