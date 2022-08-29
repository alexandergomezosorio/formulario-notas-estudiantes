const formulario = document.querySelector('#enviarNota');

//Botones
const btnCalcular = document.querySelector('#btnCalcular');
const btnLimpiar = document.querySelector('#btnLimpiar');
const btnListar = document.querySelector('#btnListar');
const btnBuscar = document.querySelector('#btnBuscar');
//Inputs
const identificacion = document.querySelector('#identificacion');
const nombre = document.querySelector('#nombre');
const subModulo = document.querySelector('#subModulo');
const nota1 = document.querySelector('#nota1');
const nota2 = document.querySelector('#nota2');

const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

const datosFormulario = {
    identificacion: identificacion.value,
    nombre: nombre.value,
    subModulo: subModulo.value,
    nota1: nota1.value,
    nota2: nota2.value,
    p1: p1.value,
    p2: p2.value
}
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', inicioApp);

    //Inputs 
    identificacion.addEventListener('blur', validarFormulario);
    nombre.addEventListener('blur', validarFormulario);
    subModulo.addEventListener('blur', validarFormulario);
    nota1.addEventListener('blur', validarFormulario);
    nota2.addEventListener('blur', validarFormulario);

    //Enviaar formulario
    btnCalcular.addEventListener('click', enviarNotas);

    btnLimpiar.addEventListener('click', resetearFormulario);
}

function inicioApp() {
    btnCalcular.disabled = true;
    btnBuscar.disabled = true;

    btnCalcular.classList.add('cursor-not-allowed', 'opacity-50');
    btnBuscar.classList.add('cursor-not-allowed', 'opacity-50');

}

function validarFormulario(e) {

    if (e.target.value.length > 0) {
        
        const error = document.querySelector('p.error');
        
        if (error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

        if (nota1.value >= 0 && nota1.value <= 5 && nota2.value >= 0 && nota2.value <= 5) {

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        } else {
            
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mensajeError('Las notas deben de estar entre 0 y 5');
        }
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');


        btnCalcular.disabled = true;
        btnBuscar.disabled = true;

        btnCalcular.classList.add('cursor-not-allowed', 'opacity-50');
        btnBuscar.classList.add('cursor-not-allowed', 'opacity-50');

        mensajeError('Todos los campos son obligatorios');
    }

     if (identificacion.value !== '' && nombre.value !== '' && subModulo.value !== '' && nota1.value !== '' && nota2.value !== '' && nota1.value >= 0 && nota1.value <= 5 && nota2.value >= 0 && nota2.value <= 5) {

        btnCalcular.disabled = false;
        btnBuscar.disabled = false;

        btnCalcular.classList.remove('cursor-not-allowed', 'opacity-50');
        btnBuscar.classList.remove('cursor-not-allowed', 'opacity-50');

    } else {
        if (identificacion.value !== '') {

            btnBuscar.disabled = false;

            btnBuscar.classList.remove('cursor-not-allowed', 'opacity-50');
        }
    }  
}
function mensajeError(mensaje) {
    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('text-center', 'bg-red-500', 'mt-2', 'p-3', 'w-96', 'mx-auto', 'text-white', 'font-bolt', 'uppercase', 'rounded-lg', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}
 function enviarNotas(e) {
    e.preventDefault();
    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex'; 
     
    let promedio = (parseFloat(nota1.value) + parseFloat(nota2.value)) / 2;
    
     
     setTimeout(() => {
         spinner.style.display = 'none';
         console.log(datosFormulario);
         if (promedio >= 3) {
             
             p1.textContent = nombre.value + ': ' +'Su promedio es : ' + promedio;
             p1.classList.add('text-center', 'border','border-green-500', 'mt-2', 'p-2', 'w-auto', 'mx-auto', 'text-green-500', 'font-bolt', 'uppercase', 'rounded-lg');

             p2.textContent = 'Estado : aprobado';
             p2.classList.add('text-center', 'border', 'border-green-500', 'mt-2', 'p-2', 'w-auto', 'mx-auto', 'text-green-500', 'font-bolt', 'uppercase', 'rounded-lg');
            
         } else {
             
             p1.textContent = nombre.value + ': ' + 'Su promedio es : ' + promedio;
             p1.classList.add('text-center', 'border', 'border-red-500', 'mt-2', 'p-2', 'w-auto', 'mx-auto', 'text-red-500', 'font-bolt', 'uppercase', 'rounded-lg');

             p2.textContent = 'Estado : reprobado';
             p2.classList.add('text-center', 'border', 'border-red-500', 'mt-2', 'p-2', 'w-auto', 'mx-auto', 'text-red-500', 'font-bolt', 'uppercase', 'rounded-lg')
            
         } 
         
        
         setTimeout(() => {
            
             p1.remove();
             p2.remove();

         /*     identificacion.classList.remove('border', 'border-green-500');
             nombre.classList.remove('border', 'border-green-500');
             subModulo.classList.remove('border', 'border-green-500');
             nota1.classList.remove('border', 'border-green-500');
             nota2.classList.remove('border', 'border-green-500'); */

             resetearFormulario();
             
        }, 5000);
    }, 3000);
}
function resetearFormulario() {
    formulario.reset();
    inicioApp();
}

// Crear objeto de datos del formulario
