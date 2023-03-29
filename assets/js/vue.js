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
            pagina:""
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
                console.log(this.categorias)
                //console.log(this.data)
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
        }
    }
}).mount('#app')