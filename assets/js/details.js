function renderPage(){
    const details = document.getElementById("details")
    const search = location.search
    const id = new URLSearchParams(search).get("id")
    const evento = arrDatos.find(evnt => evnt._id == id)
    const tarjeta = `
    <h1 class="mt-3">Details - ${evento.name}</h1>
    <div id="contenedorDetails" class="container d-flex flex-column align-items-center pt-2 mb-4">
        <div>
            <figure>
                <img class="img-details" src="${evento.image}" alt="Image of ${evento.name}">
            </figure>
        </div>
        <div class="descripcion">
            <h4>${evento.name}</h4>
            <p>Date: ${evento.date}</p>
            <p>${evento.description}</p>
            <p>Place: ${evento.place}</p>
            <p>Price: $${evento.price}</p>
        </div>
    </div>
    `
    details.innerHTML = tarjeta
}