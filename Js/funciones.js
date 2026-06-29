

class Servicio {

    constructor(codigo, nombre, descripcion, precio, tipo, tiempo, prioridad, tecnico, zona, estado){

        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = Number(precio);
        this.tipo = tipo;
        this.tiempo = tiempo;
        this.prioridad = prioridad;
        this.tecnico = tecnico;
        this.zona = zona;
        this.estado = estado;

    }

}

let listaServicios = [

    new Servicio(
        "SRV001",
        "Destape de cañería",
        "Destape de cocina",
        35000,
        "Reparación",
        "1 Hora",
        "Alta",
        "Juan Soto",
        "Santiago Centro",
        "Pendiente"
    ),

    new Servicio(
        "SRV002",
        "Instalación de WC",
        "WC One Piece",
        95000,
        "Instalación",
        "3 Horas",
        "Media",
        "Pedro Díaz",
        "Maipú",
        "En Proceso"
    ),

    new Servicio(
        "SRV003",
        "Cambio de Llave",
        "Monomando baño",
        25000,
        "Mantención",
        "45 Minutos",
        "Baja",
        "Luis Pérez",
        "Ñuñoa",
        "Finalizado"
    )

];

function obtenerDatos(){

    return new Servicio(

        document.getElementById("codigo").value.trim(),
        document.getElementById("nombre").value.trim(),
        document.getElementById("descripcion").value.trim(),
        document.getElementById("precio").value,
        document.getElementById("tipo").value,
        document.getElementById("tiempo").value.trim(),
        document.getElementById("prioridad").value,
        document.getElementById("tecnico").value.trim(),
        document.getElementById("zona").value.trim(),
        document.getElementById("estado").value

    );

}



function limpiarFormulario(){

    document.getElementById("codigo").value="";
    document.getElementById("nombre").value="";
    document.getElementById("descripcion").value="";
    document.getElementById("precio").value="";
    document.getElementById("tipo").value="";
    document.getElementById("tiempo").value="";
    document.getElementById("prioridad").value="";
    document.getElementById("tecnico").value="";
    document.getElementById("zona").value="";
    document.getElementById("estado").value="";

}


function mostrarMensaje(texto,tipo){

    let mensaje = document.getElementById("mensaje");

    mensaje.innerHTML = `

        <div class="alert alert-${tipo} alert-dismissible fade show">

            ${texto}

            <button class="btn-close" data-bs-dismiss="alert"></button>

        </div>

    `;

    setTimeout(function(){

        mensaje.innerHTML="";

    },3000);

}


function listar(){

    let cuerpoTabla = document.getElementById("tabla");

    cuerpoTabla.innerHTML = "";

    for(let servicio of listaServicios){

        cuerpoTabla.innerHTML += `

        <tr>

            <td>${servicio.codigo}</td>
            <td>${servicio.nombre}</td>
            <td>${servicio.descripcion}</td>
            <td>$${servicio.precio.toLocaleString("es-CL")}</td>
            <td>${servicio.tipo}</td>
            <td>${servicio.tiempo}</td>
            <td>${servicio.prioridad}</td>
            <td>${servicio.tecnico}</td>
            <td>${servicio.zona}</td>
            <td>${servicio.estado}</td>

        </tr>

        `;

    }

}


function estadisticas(){

    let cantidad = listaServicios.length;

    let suma = 0;

    for(let servicio of listaServicios){

        suma += servicio.precio;

    }

    let promedio = 0;

    if(cantidad > 0){

        promedio = suma / cantidad;

    }

    document.getElementById("cantidad").textContent = cantidad;

    document.getElementById("suma").textContent = suma.toLocaleString("es-CL");

    document.getElementById("promedio").textContent =
    Math.round(promedio).toLocaleString("es-CL");
}


window.onload = function(){

    listar();

    estadisticas();

    limpiarFormulario();

}



function registrar(){

    let servicio = obtenerDatos();



    if(
        servicio.codigo=="" ||
        servicio.nombre=="" ||
        servicio.descripcion=="" ||
        servicio.precio=="" ||
        servicio.tipo=="" ||
        servicio.tiempo=="" ||
        servicio.prioridad=="" ||
        servicio.tecnico=="" ||
        servicio.zona=="" ||
        servicio.estado==""
    ){

        alert("Todos los datos son obligatorios.");

        return;

    }

  
    let existe = listaServicios.find(s => s.codigo === servicio.codigo);

    if(existe){

        alert("El código ya existe.");

        return;

    }


    listaServicios.push(servicio);

    listar();

    estadisticas();

    limpiarFormulario();

    mostrarMensaje("Servicio registrado correctamente.","success");

}


function consultar(){

    let codigo = document.getElementById("codigo").value.trim();

    if(codigo==""){

        alert("Debe ingresar el código.");

        return;

    }

    let servicio = listaServicios.find(s => s.codigo == codigo);

    if(servicio){

        document.getElementById("nombre").value = servicio.nombre;
        document.getElementById("descripcion").value = servicio.descripcion;
        document.getElementById("precio").value = servicio.precio;
        document.getElementById("tipo").value = servicio.tipo;
        document.getElementById("tiempo").value = servicio.tiempo;
        document.getElementById("prioridad").value = servicio.prioridad;
        document.getElementById("tecnico").value = servicio.tecnico;
        document.getElementById("zona").value = servicio.zona;
        document.getElementById("estado").value = servicio.estado;

        mostrarMensaje("Servicio encontrado correctamente.","success");

    }
    else{

        alert("No existe un servicio con ese código.");


    }

}

function modificar(){

    let servicio = obtenerDatos();

    if(servicio.codigo==""){

        alert("Debe ingresar el código.");

        return;

    }

    let posicion = listaServicios.findIndex(s => s.codigo == servicio.codigo);

    if(posicion==-1){

        alert("No existe un servicio con ese código.");

        return;

    }

    listaServicios[posicion] = servicio;

    listar();

    estadisticas();

    limpiarFormulario();

    mostrarMensaje("Servicio modificado correctamente.","warning");

}



function eliminarServicio(){

    let codigo = document.getElementById("codigo").value.trim();

    if(codigo==""){

        alert("Debe ingresar el código.");

        return;

    }

    let posicion = listaServicios.findIndex(s => s.codigo == codigo);

    if(posicion==-1){

        alert("No existe un servicio con ese código.");

        return;

    }

    listaServicios.splice(posicion,1);

    listar();

    estadisticas();

    limpiarFormulario();

    mostrarMensaje("Servicio eliminado correctamente.","danger");

}