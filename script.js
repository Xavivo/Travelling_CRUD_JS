// Clases, constructores y métodos
class Viaje {
    constructor(codigo, destino, precio, disponibilidad = true) {
        this.codigo = codigo;
        this.destino = destino;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
    }
    getInfo() {
        return `Viaje [${this.codigo}] a ${this.destino}, precio: ${this.precio} euros`;
    }
}

class Vuelo extends Viaje {
    constructor(codigo, destino, precio, aerolinea, duracion) {
        super(codigo, destino, precio);
        this.aerolinea = aerolinea;
        this.duracion = duracion;
    }
    getInfo() {
        return `${super.getInfo()}, Aerolínea: ${this.aerolinea}, Duración: ${this.duracion} horas`;
    }
}

class Hotel extends Viaje {
    constructor(codigo, destino, precio, estrellas, tipoHabitacion) {
        super(codigo, destino, precio);
        this.estrellas = estrellas;
        this.tipoHabitacion = tipoHabitacion;
    }
    getInfo() {
        return `${super.getInfo()}, Hotel ${this.estrellas} estrellas, Habitación: ${this.tipoHabitacion}`;
    }
}

class Paquete extends Viaje {
    constructor(codigo, destino, precio, vuelo, hotel) {
        super(codigo, destino, precio);
        this.vuelo = vuelo;
        this.hotel = hotel;
    }
    getInfo() {
        return `${super.getInfo()}\n - Vuelo: ${this.vuelo.getInfo()}\n - Hotel: ${this.hotel.getInfo()}`;
    }
}

class Cliente {
    constructor(nombre, apellido, email, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }
    getResumen() {
        return `Cliente: ${this.nombre} ${this.apellido}, Email: ${this.email}, Teléfono: ${this.telefono}`;
    }
}

class Reserva {
    constructor(cliente, viaje) {
        this.cliente = cliente;
        this.viaje = viaje;
    }
    getResumen() {
        return `${this.cliente.getResumen()}\nReservó: ${this.viaje.getInfo()}`;
    }
}

// Variables globales
let listaClientes = [];
let listaViajes = [];
let listaReservas = [];

// Anotación: ambas funciones mostrar están definidas aquí ya que, estando dentro de ambas funciones agregar no los encontraba.

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

    // Validación básica
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
        // Para paquetes, usamos la clase Paquete
        nuevoViaje = new Paquete(codigo, destino, precio, null, null);
        nuevoViaje.tipo = "Paquete";
    } else if (tipo === 'sin-paquete') {
        // Para sin paquete, usamos la clase base Viaje
        nuevoViaje = new Viaje(codigo, destino, precio);
        nuevoViaje.tipo = "Sin paquete";
    } else {
        nuevoViaje = new Viaje(codigo, destino, precio);
        nuevoViaje.tipo = "Sin paquete";
    }

    // Guardar con push y llamamos al método que lo muestra
    listaViajes.push(nuevoViaje);
    mostrarTablaViajes();

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
}

// Función para eliminar viaje
function eliminarViaje(index) {
    listaViajes.splice(index, 1);
    mostrarTablaViajes();
}


// RESERVA
function agregarReserva() {
    const clienteReserva = document.getElementById('cliente-nombre').value; // Cliente añadido anteriormente
    const viajeReserva = document.getElementById('viaje-destino').value; // Destino añadido anteriormente
    const fechaReserva = Date.now();
}