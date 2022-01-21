<template>
  <nav class="navbar navbar-light navbar-expand-md">
    <div class="container-fluid"><a class="navbar-brand" href="#">JustHostIt</a><button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
        <div id="navcol-1" class="collapse navbar-collapse">
            <ul v-if="usuario" class="navbar-nav ms-auto">
                <li class="nav-item"><router-link to="/" class="nav-link active" href="#">Bienvenido {{nombreUsuario}}</router-link></li>
            </ul>
            <ul v-else class="navbar-nav ms-auto">
                <li class="nav-item"><router-link to="/" class="nav-link active" href="#">Iniciar sesión</router-link></li>
                <li class="nav-item"><router-link to="/about" class="nav-link" href="#">Registrarse</router-link></li>
            </ul>
        </div>
    </div>
  </nav>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'NavBar',
  data() {
    return {
      supabase: {},
      usuario: ""
    }
  },
  async created() {
    this.supabase = createClient('http://localhost:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI')
    this.usuario = await this.supabase.auth.user().email;
  },
  computed: {
    nombreUsuario: function () {
      return this.usuario.split("@")[0]
    }
  }
}
</script>

<style scoped>
</style>
