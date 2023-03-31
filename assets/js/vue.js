const { createApp } = Vue

const app = createApp({
    data(){
        return {
            URLAPI: "https://mindhub-xj03.onrender.com/api/amazing",
            currentDate: "",
            datos: [],
            datosFiltrados:[],
            categorias: [],
            categoriasSeleccionadas:[],
            textoBusqueda:"",
            pagina:"",
            detalles:[]
        }
    },
    created(){
        this.obtenerData()
    },
    mounted(){

    },
    methods:{
        obtenerData(){
            fetch(this.URLAPI)
            .then(res => res.json())
            .then(data => {
                this.datos = data.events
                this.currentDate = data.currentDate
                this.datosFiltrados = this.datos
                this.obtenerCategorias(this.datos)
            })
        },
        obtenerCategorias(arr){
            arr.forEach(evnt => {
                if(!this.categorias.includes(evnt.category)){
                    this.categorias.push(evnt.category)
                }
            });
        }
    },
    computed:{
        past(){
            this.datos = this.datos.filter(evnt => this.currentDate>evnt.date)
        },
        upcoming(){
            this.datos = this.datos.filter(evnt => this.currentDate<evnt.date)
        },
        filtroDoble(){
            let filtroTexto = this.datos.filter(evnt => evnt.name.toLowerCase().includes(this.textoBusqueda.toLowerCase()))
            if(!this.categoriasSeleccionadas.length){
                this.datosFiltrados = filtroTexto
            }else{
                this.datosFiltrados = filtroTexto.filter(evnt => this.categoriasSeleccionadas.includes(evnt.category))
            }
        },
        buscarPorID(){
            const search = location.search
            const id = new URLSearchParams(search).get("id")
            this.detalles = this.datos.find(evnt => evnt._id == id)
        }
    }
}).mount('#app')