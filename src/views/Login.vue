<template>
  <div class="pagina-login">
    <NavBar/>
    <div class="login-clean d-flex justify-content-center">
      <form class="align-self-center" @submit="iniciarSesion">
          <div class="illustration"><img class="logo-login" src="@/assets/img/undraw_pair_programming_re_or4x.svg" alt="logo"></div>
          <div class="mb-3"><input v-model="correo" class="form-control" type="email" placeholder="Correo electrónico" /></div>
          <div class="mb-3"><input v-model="contraseña" class="form-control" type="password" placeholder="Contraseña" /></div>
          <div class="mb-3">
            <button class="btn btn-primary d-block w-100">
              Iniciar sesión
            </button>
          </div>
          <a class="forgot" href="#">¿Has olvidado tu contraseña?</a>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { createClient } from '@supabase/supabase-js'
import Swal from 'sweetalert2'

export default {
  name: 'Login',
  components: {
    NavBar
  },
  data() {
    return {
      correo: "",
      contraseña: "",
      supabase: {}
    }
  },
  created() {
    this.supabase = createClient('http://localhost:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI')
  },
  methods: {
    iniciarSesion: async function (e) {
      e.preventDefault();
      const { user, session, error } = await this.supabase.auth.signIn({email: this.correo, password: this.contraseña});
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tus credenciales son incorrectas!'
        })
        console.log(user, session);
      } else {
        this.$router.push("/")
      }
      console.log(user, session, error);
    }
  }
}
</script>

<style scoped>
.logo-login {
  width: 250px;
  margin-top: 30px;
  margin-bottom: 50px;
}

.pagina-login {
  background: #fff;
}

.login-clean {
  height: 100vh;
}

.login-clean form {
  max-width: 400px;
  width: 90%;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 4px;
  color: #505e6c;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
}

.login-clean .illustration {
  text-align: center;
}

.login-clean form .form-control {
  background: #f7f9fc;
  border: none;
  border-bottom: 1px solid #dfe7f1;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
  text-indent: 8px;
  height: 42px;
}

.login-clean form .btn-primary {
  background: #6C63FF;
  border: none;
  border-radius: 4px;
  padding: 11px;
  box-shadow: none;
  margin-top: 26px;
  text-shadow: none;
  outline: none !important;
}

.login-clean form .btn-primary:hover, .login-clean form .btn-primary:active {
  background: #6C63FF;
}

.login-clean form .btn-primary:active {
  transform: translateY(1px);
}

.login-clean form .forgot {
  display: block;
  text-align: center;
  font-size: 12px;
  color: #6f7a85;
  opacity: 0.9;
  text-decoration: none;
}

.login-clean form .forgot:hover, .login-clean form .forgot:active {
  opacity: 1;
  text-decoration: none;
}
</style>