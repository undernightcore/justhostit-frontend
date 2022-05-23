<template>
    <NavBar :panel="true" :opaque="true"/>
      <div v-if="instancia"
        class="
          row
          g-0
          row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2
          text-center
          fila-inicio
        "
      >
        <div class="col align-self-center texto-inicio">
          <h3><span class="texto-azul">Nombre</span> {{instancia.nombre}}</h3>
          <h6><span class="texto-azul">Descripcion</span> {{instancia.descripcion}}</h6>
          <button @click="mostrarContraseña()" class="btn btn-primary" type="submit">Mostrar contraseña</button>
        </div>
        <div class="col align-self-center">
          <iframe class="terminal" :src="`http://localhost:8008/?hostname=localhost&port=${this.instancia.port}&username=admin&password=${this.btoaPassword}`" frameborder="0"></iframe>
        </div>
      </div>
    <Cargando v-else/>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Cargando from "@/components/Cargando.vue";
import { createClient } from '@supabase/supabase-js'
import Swal from 'sweetalert2'


export default {
    name: 'Usar',
    data() {
      return {
        instanciaId: '',
        instancia: '',
        btoaPassword: ''
      }
    },
    components: {
      NavBar,
      Cargando
    },
    async created() {
      this.instanciaId = this.$route.params.id;

      this.supabase = createClient('https://bebykmrsmcbqvusyizps.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlYnlrbXJzbWNicXZ1c3lpenBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMyMjgxNjAsImV4cCI6MTk2ODgwNDE2MH0.uiu7j8itRQZP3zxn8JcuZuiQYC168eGptHup28axAhQ')
      if (!await this.supabase.auth.user()) {
        this.$router.push({name: "Login"})
      } else if (!this.instanciaId) {
        this.$router.push({name: "Panel"})
      }
      let instancia = await this.supabase.from("Instancias").select("*, Plantillas:id_plantilla ( nombre, logo ), Versiones:id_version ( nombre )").eq('id', this.instanciaId);
      this.instancia = instancia.data[0];
      if (!this.instancia) {
        this.$router.push({name: "Panel"})
      }
      this.btoaPassword = btoa(this.instancia.password)
    },
    methods: {
      mostrarContraseña() {
        let timerInterval
        Swal.fire({
          title: 'Tu contaseña es',
          html: `${this.instancia.password}<br><br>Este mensaje se va a cerrar en <b></b> milisegundos.`,
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        })
      }
    }
}
</script>

<style scoped>
.texto-azul {
  color: #6C63FF;
}

.imagen-inicio {
  width: 400px;
}

.fila-inicio {
  width: 100%;
}

.terminal {
  width: 100%;
  height: 100%;
}

.col {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

button {
  background-color: #6C63FF;
  margin-top: 20px;
  margin-left: 20%;
  margin-right: 20%;
}

button:hover {
  background-color: #ffffff;
  color: #6C63FF;
}
</style>