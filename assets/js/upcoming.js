function renderPage(){
    datos = arrDatos.filter(evnt => currentDate<=evnt.date)
    renderizarTarjetas(datos, conTarjetas)
    const arrCategorias = obtenerCategorias(arrDatos)
    mostrarCategorias(arrCategorias, check)
}