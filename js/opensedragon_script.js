// Obtener el parámetro de la URL
const urlParams = new URLSearchParams(window.location.search);
let imagenDZI = urlParams.get('imagen', 'id');
let idDZI = urlParams.get('id');

// Verificar si se proporcionó una imagen DZI en la URL
if (imagenDZI) {
    // Crear la URL completa para acceder a la imagen DZI en el servidor
    const urlCompleta = `http://127.0.0.1:3001/dzi/${imagenDZI}`; // Esta URL apunta a tu backend

    // Crear el visor OpenSeadragon con la imagen DZI
    const viewer = OpenSeadragon({
        id: 'openseadragon1',
        prefixUrl: './openseadragon/openseadragon-bin-4.1.0/images/',
        tileSources: urlCompleta,
        showNavigator: true
    });

    // Iniciar el visor con anotaciones (si lo necesitas)
    viewer.initializeAnnotations();

    // Llamar a la API para obtener el título y la descripción
    fetch(`http://127.0.0.1:3001/api/samples/${idDZI}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener el título y la descripción desde la API");
            }
            return response.json(); // Parsear la respuesta como JSON
        })
        .then(data => {
            // Asignar el título y la descripción obtenidos de la API
            console.log(idDZI)
            document.getElementById('titulo').textContent = data.description;
            document.getElementById('cuerpo').textContent = data.code;
        })
        .catch(error => {
            console.log(idDZI)
            console.error("Error al obtener los datos desde la API:", error);
            document.getElementById('titulo').textContent = "Error";
            document.getElementById('cuerpo').textContent = "No se pudo cargar la información de la imagen.";
        });
} else {
    console.error("No se proporcionó una imagen DZI en la URL.");
}
