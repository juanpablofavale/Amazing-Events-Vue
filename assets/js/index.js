function renderPage(){
    datos = arrDatos
    renderizarTarjetas(datos, conTarjetas)
    const arrCategorias = obtenerCategorias(arrDatos)
    mostrarCategorias(arrCategorias, check)
}