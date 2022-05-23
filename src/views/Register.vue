<template>
  <div class="pagina-login">
    <NavBar/>
    <div class="login-clean d-flex justify-content-center">
      <form class="align-self-center" @submit="registrarse">
          <div class="illustration"><img class="logo-login" src="@/assets/img/undraw_pair_programming_re_or4x.svg" alt="logo"></div>
          <div class="mb-3"><input v-model="correo" class="form-control" type="email" placeholder="Correo electrónico" /></div>
          <div class="mb-3"><input v-model="contraseña" class="form-control" type="password" placeholder="Contraseña" /></div>
          <div class="mb-3"><input v-model="contraseña2" class="form-control" type="password" placeholder="Repetir contraseña" /></div>
          <div class="mb-3">
            <button class="btn btn-primary d-block w-100">
              Registrarse
            </button>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { createClient } from '@supabase/supabase-js'
import Swal from 'sweetalert2'

export default {
  name: 'Register',
  components: {
    NavBar
  },
  data() {
    return {
      correo: "",
      contraseña: "",
      contraseña2: "",
      supabase: {}
    }
  },
  created() {
    this.supabase = createClient('https://bebykmrsmcbqvusyizps.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlYnlrbXJzbWNicXZ1c3lpenBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMyMjgxNjAsImV4cCI6MTk2ODgwNDE2MH0.uiu7j8itRQZP3zxn8JcuZuiQYC168eGptHup28axAhQ')
  },
  methods: {
    registrarse: async function (e) {
      e.preventDefault();
      if (this.contraseña == this.contraseña2) {
        const { user, session, error } = await this.supabase.auth.signUp({email: this.correo, password: this.contraseña});
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡No ha sido posible registrar su cuenta!'
          })
          console.log(user, session);
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Verifica tu cuenta',
            text: 'Por favor, verifica tu cuenta de correo electrónico haciendo click en el enlace que se te ha enviado a tu correo electrónico'
          }).then(() => {
            this.$router.push({name: "Home"})
          })
        }
        console.log(user, session, error);
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Las contraseñas no coinciden',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        })
      } 
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