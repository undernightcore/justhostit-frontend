<template>
  <div class="crear-instancia">
    <NavBar/>
    <div v-if="plantillas" class="contenedor-panel">
      <div class="pagina1" v-if="pagina == 1">
        <h1 class="titulo-crear">Crear nueva <span class="texto-azul">instancia</span></h1>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div v-for="plantilla in plantillas.data" :key="plantilla.id" class="col">
            <CartaPlantilla :plantilla="plantilla" @seleccionado="seleccionarPlantilla"/>
          </div>
        </div>
      </div>
      <div class="pagina2" v-if="pagina == 2">
        <h1 class="titulo-crear">Crear nueva <span class="texto-azul">instancia 2</span></h1>
      </div>
      <div class="pagina3" v-if="pagina == 3">
        <h1 class="titulo-crear">Crear nueva <span class="texto-azul">instancia 3</span></h1>
      </div>
      
    </div>
    <Cargando v-else/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Cargando from "@/components/Cargando.vue";
import CartaPlantilla from "@/components/CartaPlantilla.vue";
import { createClient } from '@supabase/supabase-js'
//import Swal from 'sweetalert2'

export default {
  name: 'Crear',
  components: {
    NavBar,
    Cargando,
    CartaPlantilla
  },
  data() {
    return {
      supabase: {},
      plantillas: "",
      plantilla: "",
      pagina: 1
    }
  },
  async created() {
    this.supabase = createClient('http://localhost:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI')
    if (!await this.supabase.auth.user()) {
      this.$router.push({name: "Login"})
    }
    this.plantillas = await this.supabase.from('Plantillas').select();
  },
  methods: {
    siguientePagina: function () {
      if (this.pagina < 3) {
        this.pagina++
      }
    },
    anteriorPagina: function () {
      if (this.pagina > 1) {
        this.pagina--
      }
    },
    seleccionarPlantilla: function (e) {
      this.plantilla = e;
      this.siguientePagina();
    }
  }
}
</script>

<style scoped>
.contenedor-panel {
  padding-top: 80px;
  padding-left: 5%;
  padding-right: 5%;
}

.titulo-crear {
  margin-bottom: 30px;
}
</style>