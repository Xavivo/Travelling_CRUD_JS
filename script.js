// Clases, constructores y métodos
class Viaje {
    constructor(codigo, destino, precio, disponibilidad = true) {
        this.codigo = codigo;
        this.destino = destino;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
    }
}

class Paquete extends Viaje {
    constructor(codigo, destino, precio) {
        super(codigo, destino, precio);
        this.esPaquete = true; // para verlo mejor
    }
}

class Cliente {
    constructor(nombre, apellido, email, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }
}

class Reserva {
    constructor(cliente, viaje) {
        this.cliente = cliente;
        this.viaje = viaje;
        this.fechaReserva = new Date().toLocaleDateString();
    }
}

// Variables globales
let listaClientes = [];
let listaViajes = [];
let listaReservas = [];

// Anotación: las 3 funciones mostrar están definidas aquí ya que, estando dentro de sus respectivas funciones de agregar no los encontraba.

// Mostrar tabla de clientes
function mostrarTablaClientes() {
    // Buscamos el tbody por su id
    const cuerpoTabla = document.getElementById('tabla-clientes');

    // Lo vaciamos antes que nada
    cuerpoTabla.innerHTML = "";

    // Creamos las filas
    listaClientes.forEach((cliente, index) => {
        const fila = `
            <tr>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefono}</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminarCliente(${index})">Eliminar</button></td>
            </tr>
        `;
        cuerpoTabla.innerHTML += fila;
    });
}

// Mostrar tabla de viajes
function mostrarTablaViajes() {
    const cuerpoTabla = document.getElementById('tabla-viajes');
    cuerpoTabla.innerHTML = "";

    listaViajes.forEach((viaje, index) => {
        const fila = `
            <tr>
                <td>${viaje.codigo}</td>
                <td>${viaje.destino}</td>
                <td>${viaje.precio} €</td>
                <td>${viaje.tipo}</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminarViaje(${index})">Eliminar</button></td> 
            </tr>
        `;
        cuerpoTabla.innerHTML += fila;
    });
}

// Mostrar tabla de reservas
function mostrarTablaReservas() {
    const cuerpoTabla = document.getElementById('tabla-reservas');
    cuerpoTabla.innerHTML = "";

    listaReservas.forEach((reserva, index) => {
        const fila = `
            <tr>
                <td>${reserva.cliente.nombre}</td>
                <td>${reserva.viaje.destino}</td>
                <td>${reserva.fechaReserva}</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminarReserva(${index})">Eliminar</button></td> 
            </tr>
        `;
        cuerpoTabla.innerHTML += fila;

    });
}

// CLIENTE
function agregarCliente() {
    // Leemos los valores de los inputs usando los id del HTML
    const nombre = document.getElementById('cliente-nombre').value;
    const apellido = document.getElementById('cliente-apellido').value;
    const email = document.getElementById('cliente-email').value;
    const telefono = document.getElementById('cliente-telefono').value;

    // Validaciones

    // Comprobamos que no estén vacíos
    if (nombre !== "" && apellido !== "") {

        // Creamos el objeto cliente
        const nuevoCliente = new Cliente(nombre, apellido, email, telefono);

        // Lo guardamos en la lista
        listaClientes.push(nuevoCliente);

        mostrarTablaClientes();
        reservaSelects();

        document.getElementById('cliente-nombre').value = "";
        document.getElementById('cliente-apellido').value = "";
        document.getElementById('cliente-email').value = "";
        document.getElementById('cliente-telefono').value = "";

    } else {
        alert("No están todos los campos completos");
        return;
    }

    // Comprobamos si el email tiene arroba
    if (!email.includes('@')) {
        alert("El correo electrónico debe contener una arroba (@).");
        return;
    }

    // Comprobar si el teléfono son solo números
    if (isNaN(telefono)) {
        alert("El teléfono solo puede contener números.");
        return;
    }
}


// VIAJE
function agregarViaje() {
    const codigo = document.getElementById('viaje-codigo').value;
    const destino = document.getElementById('viaje-destino').value;
    const precio = document.getElementById('viaje-precio').value;
    const tipo = document.getElementById('viaje-tipo').value;

    // Validaciones

    // Comprobamos que no estén vacíos
    if (codigo === "" || destino === "" || precio === "") {
        alert("Faltan datos básicos del viaje.");
        return;
    }

    // Validar que se haya seleccionado un tipo de viaje
    if (tipo === "base") {
        alert("Debes seleccionar un tipo de viaje (Paquete o Sin paquete).");
        return;
    }

    let nuevoViaje; // Aquí guardaremos el viaje que se añada

    if (tipo === 'paquete') {
        // Para paquetes, usamos la clase paquete
        nuevoViaje = new Paquete(codigo, destino, precio);
        nuevoViaje.tipo = "Paquete";
    } else if (tipo === 'sin-paquete') {
        // Para sin paquete, usamos la clase base viaje
        nuevoViaje = new Viaje(codigo, destino, precio);
        nuevoViaje.tipo = "Sin paquete";
    } else {
        // por defecto usamos sin paquete
        nuevoViaje = new Viaje(codigo, destino, precio);
        nuevoViaje.tipo = "Sin paquete";
    }

    // Guardar con push y llamamos al método que lo muestra
    listaViajes.push(nuevoViaje);
    mostrarTablaViajes();
    reservaSelects(); // importante

    // Limpiar los inputs
    document.getElementById('viaje-codigo').value = "";
    document.getElementById('viaje-destino').value = "";
    document.getElementById('viaje-precio').value = "";
    document.getElementById('viaje-tipo').value = "base";
}

// Función para eliminar cliente
function eliminarCliente(index) {
    listaClientes.splice(index, 1);
    mostrarTablaClientes();
    reservaSelects(); // Actualizar selects antes de borrar
}

// Función para eliminar viaje
function eliminarViaje(index) {
    listaViajes.splice(index, 1);
    mostrarTablaViajes();
    reservaSelects(); // Actualizar selects antes de borrar
}

// Función para eliminar reserva
function eliminarReserva(index) {
    listaReservas.splice(index, 1);
    mostrarTablaReservas();

}


// RESERVA
function reservaSelects() {
    const selectCliente = document.getElementById('seleccionar-cliente');
    const selectViaje = document.getElementById('seleccionar-viaje');

    // Limpiamos y dejamos la opción por defecto
    selectCliente.innerHTML = '<option value="">Seleccionar cliente</option>';
    selectViaje.innerHTML = '<option value="">Seleccionar viaje</option>';

    // Rellenamos con los clientes reales
    listaClientes.forEach((cliente, index) => {
        selectCliente.innerHTML += `<option value="${index}">${cliente.nombre} ${cliente.apellido}</option>`;
    });

    // Rellenamos con los viajes reales
    listaViajes.forEach((viaje, index) => {
        selectViaje.innerHTML += `<option value="${index}">${viaje.destino} (${viaje.precio}€)</option>`;
    });
}

function agregarReserva() {
    // pillamos el índice de cada cliente y viaje para identificarlos luego en el desplegable
    const clienteReserva = document.getElementById('seleccionar-cliente').value; // Cliente añadido anteriormente
    const viajeReserva = document.getElementById('seleccionar-viaje').value; // Destino añadido anteriormente


    const objetoCliente = listaClientes[clienteReserva];
    const objetoViaje = listaViajes[viajeReserva];

    // Validaciones

    // Comprobamos que no estén vacíos
    if (clienteReserva === "" || viajeReserva === "") {
        alert("Faltan datos básicos de la reserva.");
        return;
    }

    const nuevoReserva = new Reserva (objetoCliente, objetoViaje);

    listaReservas.push(nuevoReserva);
    mostrarTablaReservas();

}

// Nota: arreglar bootstrap para cuando se añaden demasiadas tablas (no se puede subir a ver clientes)