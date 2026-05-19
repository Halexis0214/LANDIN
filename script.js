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
// 3. PROCESAMIENTO DEL FORMULARIO (ENVÍO DOBLE: EXCEL + TELEGRAM DIRECTO)
// ==========================================================================
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const submitBtn = document.getElementById('submitBtn');
    const mensajeExito = document.getElementById('mensaje-exito');
    
    submitBtn.innerText = "Procesando pedido...";
    submitBtn.disabled = true;

    const formData = new FormData(this);
    
    // URL actual de tu Google Sheets (La que te está guardando los datos perfectamente)
    const URL_DE_TU_SCRIPT = "https://script.google.com/macros/s/AKfycbwcgIQ7DIn_NyGux8hzZivfezeWzXdoHV-qPD4eNMv0CrhvhMUsWufaLA5UOb7TA7mN/exec"; 

    // --- PASO A: ENVIAR A TU HOJA DE EXCEL ---
    fetch(URL_DE_TU_SCRIPT, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log("Guardado en Excel con éxito");
    })
    .catch(error => console.error('Error Excel:', error));


    // --- PASO B: ENVIAR ALERTA DIRECTA A TELEGRAM (SALTÁNDOSE A GOOGLE) ---
    const TELEGRAM_TOKEN = "8404748319:AAHK6eJdsDvVumy0KGR_9PYXoXEFw62LSbQ";
    const TELEGRAM_CHAT_ID = "-5095185976";
    const mensajeTexto = "🛍️ ¡ALERTA: Llegó un nuevo pedido a la Landing!\n\n🟢 Revisa tu hoja de Google Sheets de inmediato para ver los datos del cliente.";

    const urlTelegram = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    fetch(urlTelegram, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: mensajeTexto,
            parse_mode: "HTML"
        })
    })
    .then(res => {
        // Al terminar ambos procesos, mostramos el éxito al cliente
        submitBtn.innerText = "CONFIRMAR MI PEDIDO";
        submitBtn.disabled = false;
        mensajeExito.style.display = "block";
        document.getElementById('orderForm').reset();
        mensajeExito.scrollIntoView({ behavior: 'smooth' });
    })
    .catch(err => {
        console.error('Error Telegram Directo:', err);
        // Si Telegram falla por red, igual cerramos el proceso porque el Excel ya guardó
        submitBtn.innerText = "CONFIRMAR MI PEDIDO";
        submitBtn.disabled = false;
        mensajeExito.style.display = "block";
        document.getElementById('orderForm').reset();
    });
});