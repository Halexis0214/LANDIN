// ==========================================================================
// 1. LÓGICA DEL CARRUSEL DE IMÁGENES INTERACTIVO (6 IMÁGENES)
// ==========================================================================
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[currentSlideIndex]) slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
}

function moveSlide(step) {
    showSlide(currentSlideIndex + step);
}

function currentSlide(index) {
    showSlide(index);
}

document.addEventListener("DOMContentLoaded", function() {
    showSlide(currentSlideIndex);
});

// ==========================================================================
// 2. LÓGICA DE PREGUNTAS FRECUENTES (ACORDEÓN)
// ==========================================================================
function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// ==========================================================================
// PROCESAMIENTO DEL FORMULARIO - ENVÍO SEGURO VÍA INTERMEDIARIO GOOGLE
// ==========================================================================
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const submitBtn = document.getElementById('submitBtn');
    const mensajeExito = document.getElementById('mensaje-exito');
    
    submitBtn.innerText = "Procesando pedido...";
    submitBtn.disabled = true;

    const formData = new FormData(this);
    
    // ⚠️ PEGA AQUÍ TU URL ACTUAL DE GOOGLE APPS SCRIPT (La que termina en /exec)
    const URL_DE_TU_SCRIPT = "https://script.google.com/macros/s/AKfycbyQd06KD8jPQ9HuJwp-9UN4F2GVHP8zL-itegxzH3vDGE7X-vAb8OEVmrPcrDfOGnaL/exec"; 

    fetch(URL_DE_TU_SCRIPT, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Redirige automáticamente al cliente a la página de gracias al terminar el envío
        window.location.href = "gracias.html"; 
    })
    .catch(error => {
        console.error('Error de conexión:', error);
        // Si hay un error de red, igual lo mandamos a gracias para no dañar su experiencia
        window.location.href = "gracias.html";
    });
});