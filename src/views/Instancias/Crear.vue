<template>
  <div class="crear-instancia">
    <NavBar/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { createClient } from '@supabase/supabase-js'
//import Swal from 'sweetalert2'

export default {
  name: 'Crear',
  components: {
    NavBar
  },
  data() {
    return {
      supabase: {}
    }
  },
  async created() {
    this.supabase = createClient('http://localhost:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI')
    if (!await this.supabase.auth.user()) {
      this.$router.push("/")
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>