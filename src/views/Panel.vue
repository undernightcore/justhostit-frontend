<template>
  <div>
    <NavBar/>
  </div>
</template>

<script>
//undraw_void_-3-ggu.svg
import NavBar from "@/components/NavBar.vue";
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'Panel',
  components: {
    NavBar
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
    this.instancias = await this.supabase.from('Instancias').select();
    console.log(this.plantillas)
  },
  methods: {
  }
}
</script>

<style scoped>
</style>