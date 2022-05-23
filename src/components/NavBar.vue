<template>
  <nav class="navbar navbar-light navbar-expand-md" :class="{'fixed-top': !opaque}">
    <div class="container-fluid"><router-link class="navbar-brand" to="/">JustHostIt</router-link><button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
        <div id="navcol-1" class="collapse navbar-collapse">
            <ul v-if="panel" class="navbar-nav">
              <li class="nav-item"><router-link to="/panel" class="nav-link active">Lista de instancias</router-link></li>
              <li class="nav-item"><router-link to="/instanciar" class="nav-link">Crear nueva instancia</router-link></li>
            </ul>
            <ul v-if="usuario" class="navbar-nav ms-auto">
                <li class="nav-item dropdown"><router-link to="/" class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" >Bienvenido <span class="texto-azul">{{nombreUsuario}}</span></router-link>
                    <div class="dropdown-menu"><router-link to="/panel" class="dropdown-item">Panel de control</router-link><a class="dropdown-item" v-on:click="cerrarSesion">Cerrar sesión</a></div>
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
  props: {
    panel: Boolean,
    opaque: Boolean
  },
  async created() {
    this.supabase = createClient('https://bebykmrsmcbqvusyizps.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlYnlrbXJzbWNicXZ1c3lpenBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMyMjgxNjAsImV4cCI6MTk2ODgwNDE2MH0.uiu7j8itRQZP3zxn8JcuZuiQYC168eGptHup28axAhQ')
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
