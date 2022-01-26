<template>
  <nav class="navbar navbar-light navbar-expand-md fixed-top">
    <div class="container-fluid"><router-link class="navbar-brand" to="/">JustHostIt</router-link><button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
        <div id="navcol-1" class="collapse navbar-collapse">
            <ul v-if="usuario" class="navbar-nav ms-auto">
                <li class="nav-item dropdown"><router-link to="/" class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" >Bienvenido {{nombreUsuario}}</router-link>
                    <div class="dropdown-menu"><a class="dropdown-item">Panel de control</a><a class="dropdown-item" v-on:click="cerrarSesion">Cerrar sesión</a></div>
                </li>
            </ul>
            <ul v-else class="navbar-nav ms-auto">
                <li class="nav-item"><router-link to="/login" class="nav-link active">Iniciar sesión</router-link></li>
                <li class="nav-item"><router-link to="/register" class="nav-link">Registrarse</router-link></li>
            </ul>
        </div>
    </div>
  </nav>
</template>

<script>
import { createClient } from '@supabase/supabase-js'
import Swal from 'sweetalert2'

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
    this.usuario = await this.supabase.auth.user();
  },
  computed: {
    nombreUsuario: function () {
      if (this.usuario) {
        return this.usuario.email.split("@")[0]
      } else {
        return "cargando..."
      }
    }
  },
  methods: {
    cerrarSesion: function () {
      Swal.fire({
        title: '¿Estas seguro que quieres cerrar sesión?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: `Cancelar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.supabase.auth.signOut();
          this.$router.go();
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
