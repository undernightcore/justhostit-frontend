<template>
  <div class="crear-instancia">
    <NavBar :panel="true"/>
    <div v-if="plantillas" class="contenedor-panel">
      <div class="pagina1" v-if="pagina == 1">
        <h1 class="titulo-crear">Selecciona una <span class="texto-azul">plantilla</span></h1>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div v-for="plantilla in plantillas.data" :key="plantilla.id" class="col">
            <CartaPlantilla :plantilla="plantilla" @seleccionado="seleccionarPlantilla" />
          </div>
        </div>
      </div>
      <div class="pagina2" v-if="pagina == 2">
        <h1 class="titulo-crear">Elige una <span class="texto-azul">versión</span></h1>
        <h4 class="titulo-crear">Plantilla <span class="texto-azul">seleccionada</span></h4>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <CartaPlantilla :plantilla="plantilla" @click="anteriorPagina"/>
        </div>
        <h4 class="titulo-crear subtitulo-crear">Versiones <span class="texto-azul">disponibles</span></h4>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div v-for="version in plantilla.Versiones" :key="version.id" class="col">
            <CartaVersion :version="version" @seleccionado="seleccionarVersion" />
          </div>
        </div>
      </div>
      <div class="pagina3" v-if="pagina == 3">
        <h1 class="titulo-crear">Últimos <span class="texto-azul">detalles</span></h1>
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div class="col">
            <form @submit="instanciar">
              <h3 class="titulo-crear">Nombre de la <span class="texto-azul">instancia</span></h3>
              <input v-model="nombre" class="form-control nombre" type="text" />
              <h3 class="titulo-crear subtitulo-crear">Descripcion de la <span class="texto-azul">instancia</span></h3>
              <textarea v-model="descripcion" class="form-control descripcion"></textarea>
              <button class="btn btn-primary" type="submit">Instanciar</button>
            </form>
          </div>
          <div class="col">
            <CartaPlantilla :plantilla="plantilla" @click="this.pagina = 1"/>
            <CartaVersion class="carta-final" :version="version" @click="anteriorPagina"/>
          </div>
        </div>
      </div>
      
    </div>
    <Cargando v-else/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Cargando from "@/components/Cargando.vue";
import CartaPlantilla from "@/components/CartaPlantilla.vue";
import CartaVersion from "@/components/CartaVersion.vue";

import { createClient } from '@supabase/supabase-js'
import Swal from 'sweetalert2'

export default {
  name: 'Crear',
  components: {
    NavBar,
    Cargando,
    CartaPlantilla,
    CartaVersion
  },
  data() {
    return {
      supabase: {},
      plantillas: "",
      plantilla: "",
      version: "",
      pagina: 1,
      nombre: "",
      descripcion: "",
      instancia: ""
    }
  },
  async created() {
    this.supabase = createClient('http://localhost:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI')
    if (!await this.supabase.auth.user()) {
      this.$router.push({name: "Login"})
    }
    this.plantillas = await this.supabase.from('Plantillas').select('*, Versiones!Instancias(*)');
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
    },
    seleccionarVersion: function (e) {
      this.version = e;
      this.siguientePagina();
    },
    instanciar: async function (e) {
      e.preventDefault();
      this.instancia = await this.supabase.from('Instancias').insert([
        {nombre: this.nombre, descripcion: this.descripcion, id_user: await this.supabase.auth.user().id, id_plantilla: this.plantilla.id, id_version: this.version.id}
      ])
      if (this.instancia) {
        Swal.fire({
            icon: 'success',
            title: 'Has creado una instancia',
            text: 'Un nodo esta completando la operación',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        })
        this.$router.push({name: 'Panel'})
      }
    }
  }
}
</script>

<style scoped>
.contenedor-panel {
  padding-top: 100px;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 100px;
}

.titulo-crear {
  margin-bottom: 30px;
}

.subtitulo-crear {
  margin-top: 30px;
}

.nombre, .descripcion {
  border-color: #6C63FF;
}

.carta-final {
  margin-top: 10px;
}

button {
  background-color: #6C63FF;
  margin-top: 20px;
}

button:hover {
  background-color: #ffffff;
  color: #6C63FF;
}

.descripcion {
  height: 110px;
  resize: none;
}
</style>