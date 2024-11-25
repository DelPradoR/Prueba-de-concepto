// Función para guardar una alerta en el localStorage
function saveAlert(message) {
    // Obtener las alertas existentes del localStorage
    const alerts = getAlerts();
    // Agregar la nueva alerta al array
    const newAlert = { message, createdAt: new Date() };
    alerts.push(newAlert);
    // Guardar el array actualizado en localStorage
    localStorage.setItem('alerts', JSON.stringify(alerts));
    
    // Llamar a displayAlerts para actualizar la visualización
    displayAlerts();

    // Desplegar la alerta después de 30 segundos
    setTimeout(() => {
        alert(`Alerta: ${message}`);
    }, 30000); // 30000 milisegundos = 30 segundos
}

// Función para obtener las alertas del localStorage
function getAlerts() {
    const alerts = localStorage.getItem('alerts');
    return alerts ? JSON.parse(alerts) : []; // Retornar un array vacío si no hay alertas
}

// Función para mostrar las alertas en la página
function displayAlerts() {
    const alerts = getAlerts();
    const alertList = document.getElementById('alertList');
    alertList.innerHTML = ''; // Limpiar la lista antes de añadir nuevas alertas

    alerts.forEach((alert, index) => {
        const li = document.createElement('li');
        li.textContent = `${alert.message} (Creado en: ${new Date(alert.createdAt).toLocaleString()})`;

        // Crear un botón para eliminar la alerta
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => eliminarAlerta(index); // Llamar a eliminarAlerta con el índice

        li.appendChild(deleteButton); // Añadir el botón al elemento de lista
        alertList.appendChild(li); // Añadir el elemento de lista al contenedor
    });
}

// Función para eliminar una alerta
function eliminarAlerta(index) {
    const alerts = getAlerts();
    alerts.splice(index, 1); // Eliminar la alerta del array
    localStorage.setItem('alerts', JSON.stringify(alerts)); // Actualizar el localStorage
    displayAlerts(); // Actualizar la visualización de alertas
}

// Evento para manejar la creación de una nueva alerta
document.getElementById('alertForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const messageInput = document.getElementById('alertMessage');
    const message = messageInput.value;

    saveAlert(message); // Guardar la alerta
    messageInput.value = ''; // Limpiar el campo de entrada
});

// Cargar las alertas al iniciar la página
document.addEventListener('DOMContentLoaded', displayAlerts);