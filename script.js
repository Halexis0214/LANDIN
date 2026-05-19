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
// 3. PROCESAMIENTO DEL FORMULARIO Y ENVÍO A GOOGLE SHEETS
// ==========================================================================
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const submitBtn = document.getElementById('submitBtn');
    const mensajeExito = document.getElementById('mensaje-exito');
    
    submitBtn.innerText = "Procesando pedido...";
    submitBtn.disabled = true;

    const formData = new FormData(this);
    const URL_DE_TU_SCRIPT = "https://script.google.com/macros/s/AKfycbwbYTec7gGVD-aDkvrLTjrzOJoJSL1gSjAZxvbR5SbcGPzh4JXVGcIHZ99rC8y9-D0C/exec"; 

    fetch(URL_DE_TU_SCRIPT, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        submitBtn.innerText = "CONFIRMAR MI PEDIDO";
        submitBtn.disabled = false;
        
        mensajeExito.style.display = "block";
        document.getElementById('orderForm').reset();
        
        mensajeExito.scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el pedido, por favor intenta de nuevo.');
        submitBtn.innerText = "CONFIRMAR MI PEDIDO";
        submitBtn.disabled = false;
    });
});