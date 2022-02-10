<template>
  <div>
    <NavBar :panel="true"/>
    <div v-if="instancias">
      <div v-if="instancias.data.length">
        <div class="contenedor-panel">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div v-for="instancia in instancias.data" :key="instancia.id" class="col">
              <CartaInstancia :instancia="instancia" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="d-flex justify-content-center flex-column align-items-center" style="height: 100vh;">
          <img src="@/assets/img/undraw_void_-3-ggu.svg" class="imagen-vacio"/>
          <h3>¿Mirando al <span class="texto-azul">vacio</span>?</h3>
          <h4>Prueba a <router-link class="texto-azul" to="/instanciar">crear una instancia</router-link></h4>
        </div>
      </div>
    </div>
    <Cargando v-else/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Cargando from "@/components/Cargando.vue";
import CartaInstancia from "@/components/CartaInstancia.vue";
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'Panel',
  components: {
    NavBar,
    Cargando,
    CartaInstancia
  },
  data() {
    return {
      supabase: {},
      instancias: ""
    }
  },
  async created() {
    this.supabase = createClient('http://localhost:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI')
    if (!await this.supabase.auth.user()) {
      this.$router.push({name: "Login"})
    }
    this.instancias = await this.supabase.from("Instancias").select("*, Plantillas:id_plantilla ( nombre, logo ), Versiones:id_version ( nombre )");
    console.log(this.instancias);
  },
  methods: {
  }
}
</script>

<style scoped>
.imagen-vacio {
  width: 15%;
  margin-bottom: 20px;
}

.contenedor-panel {
  padding-top: 120px;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 120px;
}
</style>