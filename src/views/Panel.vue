<template>
  <div>
    <NavBar :panel="true"/>
    <div v-if="instancias">
      <div v-if="instancias.data.length">
        <div class="contenedor-panel">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div v-for="instancia in instancias.data" :key="instancia.id" class="col">
              <CartaInstancia @seleccionar="usarInstancia($event)" @eliminar="eliminarInstancia($event)" :instancia="instancia" />
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
import Swal from 'sweetalert2'

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
    this.supabase = createClient('https://bebykmrsmcbqvusyizps.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlYnlrbXJzbWNicXZ1c3lpenBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMyMjgxNjAsImV4cCI6MTk2ODgwNDE2MH0.uiu7j8itRQZP3zxn8JcuZuiQYC168eGptHup28axAhQ')
    if (!await this.supabase.auth.user()) {
      this.$router.push({name: "Login"})
    }
    this.instancias = await this.supabase.from("Instancias").select("*, Plantillas:id_plantilla ( nombre, logo ), Versiones:id_version ( nombre )");
    console.log(this.instancias);
  },
  methods: {
    eliminarInstancia(token) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertirlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, eliminalo!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetch("http://localhost:3000/contenedor/eliminar", {
            method: 'DELETE',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
              idContenedor: token
            })
          });
          setTimeout(async () => {
            this.instancias = await this.supabase.from("Instancias").select("*, Plantillas:id_plantilla ( nombre, logo ), Versiones:id_version ( nombre )");
          }, 1000)
        }
      })
    },
    usarInstancia(id) {
      this.$router.push({name: "UsarInstancia", params: {id}})
    }
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