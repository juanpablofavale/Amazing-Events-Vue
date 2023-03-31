const { createApp } = Vue

const app = createApp({
    data() {
        return {
            URLAPI: "https://mindhub-xj03.onrender.com/api/amazing",
            currentDate: "",
            datos: [],
            datosFiltrados: [],
            categorias: [],
            categoriasSeleccionadas: [],
            textoBusqueda: "",
            pagina: "",
            detalles: [],
            mayorC: {},
            menorC: {},
            mayCap: {},
            categoriasPast:[],
            gananciasPast: [],
            asistenciasPast: [],
            categoriasUpcoming:[],
            gananciasUpcoming: [],
            asistenciasUpcoming: []
        }
    },
    created() {
        this.obtenerData()
    },
    mounted() {

    },
    methods: {
        obtenerData() {
            fetch(this.URLAPI)
                .then(res => res.json())
                .then(data => {
                    this.datos = data.events
                    this.currentDate = data.currentDate
                    this.datosFiltrados = this.datos
                    this.categorias = this.obtenerCategorias(this.datos)
                    this.armarTablas()
                })
        },
        obtenerCategorias(arr) {
            let cat = []
            arr.forEach(evnt => {
                if (!cat.includes(evnt.category)) {
                    cat.push(evnt.category)
                }
            });
            return cat
        },
        obtGanYAsis(arr, prop, cate) {
            let revenue = []
            let asis = []
            cate.forEach(categoria => {
                const arrCat = arr.filter(evnt => evnt.category == categoria)
                revenue.push((arrCat.reduce((acc, act) => acc + (+act.price * +act[prop]), 0)).toFixed(2))
                estimate = arrCat.map(evnt => evnt[prop] / (evnt.capacity / 100))
                estimado2 = estimate.reduce((acc, act) => acc + act, 0)
                asis.push((estimado2 / estimate.length).toFixed(2))
            })
            return [revenue, asis]
        },
        armarTablas() {
            const arrPast = this.datos.filter(evnt => evnt.date < this.currentDate)
            const arrUpcoming = this.datos.filter(evnt => evnt.date >= this.currentDate);
            this.categoriasPast = this.obtenerCategorias(arrPast);
            this.categoriasUpcoming = this.obtenerCategorias(arrUpcoming);

            [this.gananciasUpcoming, this.asistenciasUpcoming] = this.obtGanYAsis(arrUpcoming, "estimate", this.categoriasUpcoming);
            [this.gananciasPast, this.asistenciasPast] = this.obtGanYAsis(arrPast, "assistance", this.categoriasPast);
        },
    },
    computed: {
        past() {
            this.datos = this.datos.filter(evnt => this.currentDate > evnt.date)
        },
        upcoming() {
            this.datos = this.datos.filter(evnt => this.currentDate < evnt.date)
        },
        filtroDoble() {
            let filtroTexto = this.datos.filter(evnt => evnt.name.toLowerCase().includes(this.textoBusqueda.toLowerCase()))
            if (!this.categoriasSeleccionadas.length) {
                this.datosFiltrados = filtroTexto
            } else {
                this.datosFiltrados = filtroTexto.filter(evnt => this.categoriasSeleccionadas.includes(evnt.category))
            }
        },
        buscarPorID() {
            const search = location.search
            const id = new URLSearchParams(search).get("id")
            this.detalles = this.datos.find(evnt => evnt._id == id)
        },
        mayorCapacidad() {
            let arr = this.datos
            let mayor = arr[0]
            arr.forEach(evnt => {
                if (evnt.capacity > mayor.capacity) {
                    mayor = evnt
                }
            })
            this.mayCap = mayor
        },
        mayor() {
            let arr = this.datos
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
            this.mayorC = mayor
        },
        menor() {
            let arr = this.datos
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
            this.menorC = menor
        },
    }
}).mount('#app')