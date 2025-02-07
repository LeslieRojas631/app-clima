let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = '40c4cf1eb005d252326fe622be4415a7'
let difKelvin = 273.15
let ciudad = 'Quito'

document.getElementById('botonBusqueda').addEventListener('click', () => {  //Cuando se haga clic
    const ciudad = document.getElementById('ciudadEntrada').value
    if (ciudad) {
        fetchDatosClima(ciudad)
    }
})

function fetchDatosClima(ciudad) {
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}&lang=es`)
        .then(data => data.json())
        .then(data => {
            console.log(data);  // Muestra el JSON en la consola
            mostrarDatosClima(data);
        })
        .catch(err => console.error("Error fetching data:", err));
}

function mostrarDatosClima(data) {
    const divDatosClima = document.getElementById('datosClima');
    divDatosClima.innerHTML = ''; // Limpiar datos anteriores

    const ciudadNombre = data.name;
    const paisNombre = data.sys.country;
    const temperatura = data.main.temp;
    const icono = data.weather[0].icon;

    const divDatosTemperatura = document.getElementById('datosTemperatura');
    divDatosTemperatura.innerHTML = ''; // Limpiar datos anteriores
    const temperaturaMinima = data.main.temp_min;
    const temperaturaMaxima = data.main.temp_max;

    const divDatosHumedad = document.getElementById('datosHumedad');
    divDatosHumedad.innerHTML = ''; // Limpiar datos anteriores
    const humedad = data.main.humidity;
    const descripcion = data.weather[0].description;

    // Elementos de clima
    const ciudadTitulo = document.createElement('h2');
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`;

    const temperaturaInfo = document.createElement('p');
    temperaturaInfo.textContent = `La temperatura actual es: ${Math.floor(temperatura - difKelvin)}°C`;

    const temperaturaMinInfo = document.createElement('p');
    temperaturaMinInfo.textContent = `La temperatura mínima es: ${Math.floor(temperaturaMinima - difKelvin)}°C`;

    const temperaturaMaxInfo = document.createElement('p');
    temperaturaMaxInfo.textContent = `La temperatura máxima es: ${Math.floor(temperaturaMaxima - difKelvin)}°C`;

    const descripcionInfo = document.createElement('p');
    descripcionInfo.textContent = `Descripción: ${descripcion}`;

    const iconoInfo = document.createElement('img');
    iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;

    const humedadInfo = document.createElement('p');
    humedadInfo.textContent = `La humedad es: ${humedad}%`;

    // Append en el orden solicitado
    divDatosClima.appendChild(ciudadTitulo);
    divDatosClima.appendChild(iconoInfo);
    divDatosClima.appendChild(temperaturaInfo);
    divDatosClima.appendChild(temperaturaMinInfo);
    divDatosClima.appendChild(temperaturaMaxInfo);
    divDatosTemperatura.appendChild(descripcionInfo);
    divDatosHumedad.appendChild(humedadInfo);
}
