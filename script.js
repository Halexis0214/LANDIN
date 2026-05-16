// ==========================================================================
// 1. LÓGICA DEL CARRUSEL DE IMÁGENES INTERACTIVO (6 IMÁGENES)
// ==========================================================================
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Si se pasa del límite superior (imagen 6), vuelve al principio
    if (index >= slides.length) currentSlideIndex = 0;
    // Si baja de cero, salta automáticamente a la última imagen
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    // Remover la clase activa de todas las imágenes y los puntos indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Activar únicamente la imagen y el punto correspondiente a la posición actual
    if (slides[currentSlideIndex]) slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
}

function moveSlide(step) {
    showSlide(currentSlideIndex + step);
}

function currentSlide(index) {
    showSlide(index);
}

// Inicializar el carrusel de fotos apenas cargue la página en el navegador
document.addEventListener("DOMContentLoaded", function() {
    showSlide(currentSlideIndex);
});


// ==========================================================================
// 2. PROCESAMIENTO DEL FORMULARIO Y ENVÍO A GOOGLE SHEETS
// ==========================================================================
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue automáticamente

    const submitBtn = document.getElementById('submitBtn');
    const mensajeExito = document.getElementById('mensaje-exito');
    
    // Deshabilitar botón para evitar múltiples clics accidentales mientras procesa
    submitBtn.innerText = "Procesando pedido...";
    submitBtn.disabled = true;

    // Captura todos los campos del formulario de forma inteligente
    const formData = new FormData(this);
    
    // URL de tu Google Apps Script integrada con éxito
    const URL_DE_TU_SCRIPT = "https://script.google.com/macros/s/AKfycbwcgIQ7DIn_NyGux8hzZivfezeWzXdoHV-qPD4eNMv0CrhvhMUsWufaLA5UOb7TA7mN/exec"; 

    // Enviar datos mediante método POST a tu hoja de cálculo en línea
    fetch(URL_DE_TU_SCRIPT, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        submitBtn.innerText = "CONFIRMAR MI PEDIDO";
        submitBtn.disabled = false;
        
        // Muestra el aviso verde de éxito y vacía las cajas de texto del formulario
        mensajeExito.style.display = "block";
        document.getElementById('orderForm').reset();
        
        // Desplaza la pantalla suavemente hacia el mensaje de éxito
        mensajeExito.scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el pedido, por favor intenta de nuevo.');
        submitBtn.innerText = "CONFIRMAR MI PEDIDO";
        submitBtn.disabled = false;
    });
});