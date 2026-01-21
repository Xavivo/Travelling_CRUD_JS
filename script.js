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

// Crear instancias
const cliente1 = new Cliente("Ana", "Pérez", "ana.perez@gmail.com", "123456789");
const vuelo1 = new Vuelo("V001", "París", 200, "Air France", 2.5);
const hotel1 = new Hotel("H001", "París", 100, 4, "Doble");
const paquete1 = new Paquete("P001", "París", 280, vuelo1, hotel1);

// Crear una reserva
const reserva1 = new Reserva(cliente1, paquete1);

console.log(cliente1.getResumen());
console.log(vuelo1.getInfo());
console.log(paquete1.getInfo());
console.log(reserva1.getResumen());

// Variables globales
let listaClientes = [];
let listaViajes = [];
let listaReservas = [];

// Agregar clientes
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

    // Mostrar los clientes agregado
    function mostrarTablaClientes() {
        // Buscamos el tbody por su id
        const cuerpoTabla = document.getElementById('tabla-clientes');

        // Lo vaciamos antes que nada
        cuerpoTabla.innerHTML = "";

        // Creamos las filas
        listaClientes.forEach(cliente => {
            const fila = `
            <tr>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefono}</td>
            </tr>
        `;
            cuerpoTabla.innerHTML += fila;
        });
    }
}

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

    let nuevoViaje; // Aquí guardaremos el objeto

    if (tipo === 'vuelo') {
        const aerolinea = document.getElementById('vuelo-aerolinea').value;
        const duracion = document.getElementById('vuelo-duracion').value;

        if (aerolinea === "" || duracion === "") {
            alert("Completa los datos del vuelo.");
            return;
        }
        nuevoViaje = new Vuelo(codigo, destino, precio, aerolinea, duracion);

    } else if (tipo === 'hotel') {
        const estrellas = document.getElementById('hotel-estrellas').value;
        const habitacion = document.getElementById('hotel-habitacion').value;

        if (estrellas === "" || habitacion === "") {
            alert("Completa los datos del hotel.");
            return;
        }
        nuevoViaje = new Hotel(codigo, destino, precio, estrellas, habitacion);

    } else {
        // Viaje estándar
        nuevoViaje = new Viaje(codigo, destino, precio);
    }

    // Guardar y mostrar
    listaViajes.push(nuevoViaje);
    mostrarTablaViajes();
}

// Mostramos u ocultamos los campos según el select que elija el usuario
function toggleCamposViaje() {
    const tipo = document.getElementById('viaje-tipo').value;

    // Ocultamos ambos primero
    document.getElementById('inputs-vuelo').style.display = 'none';
    document.getElementById('inputs-hotel').style.display = 'none';

    // Mostramos el que corresponda
    if (tipo === 'vuelo') {
        document.getElementById('inputs-vuelo').style.display = 'flex';
    } else if (tipo === 'hotel') {
        document.getElementById('inputs-hotel').style.display = 'flex';
    }
}

// Función para mostrar la tabla
function mostrarTablaViajes() {
    const cuerpoTabla = document.getElementById('tabla-viajes');
    cuerpoTabla.innerHTML = "";

    listaViajes.forEach(viaje => {
        const tipoClase = viaje.constructor.name;

        const fila = `
            <tr>
                <td>${viaje.codigo}</td>
                <td>${viaje.destino}</td>
                <td>${viaje.precio} €</td>
                <td>${tipoClase}</td>
                <td>${viaje.getInfo()}</td> 
            </tr>
        `;
        cuerpoTabla.innerHTML += fila;
    });
}