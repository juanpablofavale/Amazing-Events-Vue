const contenedor = document.getElementById("table-container")

function renderPage(arr) {
    const arrPast = arr.filter(evnt => evnt.date < currentDate)
    const arrUpcoming = arr.filter(evnt => evnt.date >= currentDate)

    tablaGral = crearPrimerTabla(arrPast)
    tablaGral += crearTablaCategorias(arrUpcoming, "estimate")
    tablaGral += crearTablaCategorias(arrPast, "assistance")
    contenedor.innerHTML = tablaGral
}

function crearPrimerTabla(arr) {
    const mayorE = mayor(arr)
    const menorE = menor(arr)
    const mayCap = mayorCapacidad(arr)
    tabla = `
    <table>
    <thead>
        <tr>
            <th colspan="3">Event statics</th>
        </tr>
        <tr>
            <th>Events with highest percentage of attendance	</th>
            <th>Events with lowest percentage of attendance</th>
            <th>Event with larger capacity</th>
        </tr>
    </thead>
    <tbody>
        <tr class="items">
            <td>${mayorE.name} (${mayorE.porc}%)</td>
            <td>${menorE.name} (${menorE.porc}%)</td>
            <td>${mayCap.name} (${mayCap.capacity})</td>
        </tr>
    </tbody>
    </table>
    `
    return tabla
}

function crearTablaCategorias(arr, prop) {
    categorias = obtenerCategorias(arr)
    let [gan, asis] = obtGanYAsis(arr, categorias, prop)

    inicio = `
    <table>
    <thead>
        <tr>
            <th colspan="3">Upcoming events Statistics by Category</th>
        </tr>
        <tr>
            <th>Categories</th>
            <th>Revenues</th>
            <th>Percentage of Attendance</th>
        </tr>
    </thead>
    <tbody>`

    contenido = ""
    for (let i = 0; i < gan.length; i++) {
        contenido +=
            `
        <tr class="items">
            <td>${categorias[i]}</td>
            <td>$${gan[i]}</td>
            <td>${asis[i]}%</td>
        </tr>
        `
    }

    final =
        `
    </tbody>
    </table>
        `
    return inicio + contenido + final
}

function obtenerCategorias(arr) {
    const cate = arr.map(evnt => evnt.category)
    return cate.filter((cat, index, arr) => arr.indexOf(cat) == index)
}

function obtGanYAsis(arr, categorias, prop) {
    let revenue = []
    let asis = []
    categorias.forEach(categoria => {
        const arrCat = arr.filter(evnt => evnt.category == categoria)
        revenue.push((arrCat.reduce((acc, act) => acc + (+act.price * +act[prop]), 0)).toFixed(2))
        estimate = arrCat.map(evnt => evnt[prop] / (evnt.capacity / 100))
        estimado2 = estimate.reduce((acc, act) => acc + act)
        asis.push((estimado2 / estimate.length).toFixed(2))
    })
    return [revenue, asis]
}

function mayorCapacidad(arr) {
    let mayor = arr[0]
    arr.forEach(evnt => {
        if (evnt.capacity > mayor.capacity) {
            mayor = evnt
        }
    })
    return mayor
}

function mayor(arr) {
    let porcMayor = arr[0].assistance / (arr[0].capacity / 100)
    let mayor = arr[0]
    arr.forEach(evnt => {
        porc = evnt.assistance / (evnt.capacity / 100)
        if (porc > porcMayor) {
            porcMayor = porc
            mayor = evnt
        }
    });
    mayor.porc = porcMayor.toFixed(2)
    return mayor
}

function menor(arr) {
    let porcMenor = arr[0].assistance / (arr[0].capacity / 100)
    let menor = arr[0]
    arr.forEach(evnt => {
        porc = evnt.assistance / (evnt.capacity / 100)
        if (porc < porcMenor) {
            porcMenor = porc
            menor = evnt
        }
    });
    menor.porc = porcMenor.toFixed(2)
    return menor
}