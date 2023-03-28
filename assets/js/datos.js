const URLAPI = "https://mindhub-xj03.onrender.com/api/amazing"
let arrDatos
let currentDate
let datos

async function obtenerDatos() {
    try {
        const res = await fetch(URLAPI)
        const data = await res.json()
        arrDatos = data.events
        currentDate = data.currentDate
        renderPage(arrDatos)
    } catch (error) {
        console.log(error)
        try {
            const res = await fetch("./assets/data/amazing.json")
            const data = await res.json()
            arrDatos = data.events
            currentDate = data.currentDate
            renderPage(arrDatos)
        } catch (error) {
            console.log(error)
        }
    }
}
obtenerDatos()