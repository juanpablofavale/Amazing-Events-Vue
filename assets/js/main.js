const conTarjetas = document.getElementById("tarjetas")
const check = document.querySelector("#checkbox")
const filtrosChk = document.querySelectorAll("input[type=checkbox]")
let search = document.getElementById("search")
const arrChecked = []
let strSearch = ""
let filtrados = []

function renderizarTarjetas(arrTarjetas, contenedor) {
    let tarjetas = ""
    for (tarjeta of arrTarjetas) {
        tarjetas += `
            <div class="card p-0" style="width: 16em;">
            <img src="${tarjeta.image}"
                class="card-img-top" alt="cinema">
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 class="card-title">${tarjeta.name}</h5>
                    <p class="card-text">${tarjeta.description}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="precio mb-0">$${tarjeta.price}</p>
                    <a href="./details.html?id=${tarjeta._id}" class="btn btn-primary">Details</a>
                </div>
            </div>
            </div>
            `
    }

    if (arrTarjetas.length == 0) {
        contenedor.innerHTML = "<h3>Events not found!</h3>"
    } else {
        contenedor.innerHTML = tarjetas
    }
}

function obtenerCategorias(arr) {
    const arrCategorias = arr.map(evnt => evnt.category)
    return arrCategorias.filter((cat, index, arr) => arr.indexOf(cat) == index)
}

function mostrarCategorias(arr, contenedor) {
    const filtros = arr.reduce((ac, item, indice) => ac + `<label><input type="checkbox" name="${item.replace(" ", "-")}${indice}" id="${item.replace(" ", "-")}${indice}" value="${item}"> ${item}</label>`, "")
    contenedor.innerHTML = filtros
}

function filtrarPorCheck(arr, chk) {
    if (chk.length != 0) {
        chk.forEach(filtro => {
            filtrados = [...arr.filter(evnt => evnt.category == filtro), ...filtrados]
        })
    } else {
        filtrados = arrDatos
    }

}

function filtrarPorSearch(arr, strSearch) {
    filtrados = arr.filter(evnt => evnt.name.toLowerCase().includes(strSearch.toLowerCase()))
}

check.addEventListener("click", (e) => {
    filtrados = []
    if (e.target.value != undefined) {
        if (!arrChecked.includes(e.target.value)) {
            arrChecked.push(e.target.value)
        } else {
            arrChecked.splice(arrChecked.indexOf(e.target.value), 1)
        }
        filtrarPorCheck(datos, arrChecked)
        filtrarPorSearch(filtrados, strSearch)
        renderizarTarjetas(filtrados, conTarjetas)
    }
})

search.addEventListener("keyup", (e) => {
    filtrados = []
    strSearch = search.value
    if (strSearch == "") {
        filtrarPorCheck(datos, arrChecked)
    } else {
        filtrarPorCheck(datos, arrChecked)
        filtrarPorSearch(filtrados, strSearch)
    }
    renderizarTarjetas(filtrados, conTarjetas)
})