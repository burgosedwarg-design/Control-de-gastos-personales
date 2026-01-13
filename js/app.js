/* =====================================================
   MANEJO DE USUARIOS – LOGIN Y REGISTRO
===================================================== */

/* -------- Registrar usuario -------- */
function registrarUsuario(nombre, correo, password) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validar si ya existe
    const existe = usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase());
    if (existe) {
        alert("Este correo ya está registrado.");
        return false;
    }

    usuarios.push({ nombre, correo, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return true;
}

/* -------- Iniciar sesión -------- */
function iniciarSesion() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const correo = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        if (usuarios.length === 0) {
            alert("No hay usuarios registrados. Crea una cuenta primero.");
            return;
        }

        const usuario = usuarios.find(u => u.correo.toLowerCase() === correo.toLowerCase());

        if (!usuario) {
            alert("Usuario no encontrado.");
            return;
        }

        if (usuario.password !== password) {
            alert("Contraseña incorrecta.");
            return;
        }

        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
        window.location.href = "dashboard.html";
    });
}

/* -------- Mostrar / ocultar contraseña -------- */
function activarMostrarPassword() {
    const pwToggle = document.getElementById("pwToggle");
    const password = document.getElementById("password");

    if (!pwToggle || !password) return;

    pwToggle.addEventListener("click", () => {
        if (password.type === "password") {
            password.type = "text";
            pwToggle.textContent = "Ocultar";
        } else {
            password.type = "password";
            pwToggle.textContent = "Mostrar";
        }
    });
}

/* =====================================================
   MOVIMIENTOS Y REPORTE DE SALDO
===================================================== */
function guardarMovimiento(tipo, descripcion, valor) {
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    const fecha = new Date().toLocaleString();

    movimientos.push({ tipo, descripcion, valor: Number(valor), fecha });
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
}

function calcularSaldo() {
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    let saldo = 0;

    movimientos.forEach(m => {
        if (m.tipo === "ingreso") saldo += m.valor;
        else if (m.tipo === "egreso") saldo -= m.valor;
    });

    return saldo;
}

/* =====================================================
   INICIALIZACIÓN GLOBAL
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    iniciarSesion();
    activarMostrarPassword();
});


