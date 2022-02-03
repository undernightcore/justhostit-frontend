<template>
    <div class="card" @click="seleccionar()">
        <div class="card-body">
            <img :src="plantilla.logo" class="card-img-top" alt="..." style="width: 10%; margin-bottom: 10px; filter: grayscale(100%);">
            <h5 class="card-title">{{plantilla.nombre}}</h5>
            <p class="card-text">{{descripcion}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Carta',
    props: {
        plantilla: Object
    },
    computed: {
        descripcion: function () {
            return this.plantilla.descripcion.substr(0, 200) + "..."
        }
    },
    methods: {
        seleccionar: function () {
            this.$emit('seleccionado', this.plantilla.id);
        }
    }
}
</script>

<style scoped>
.card:hover {
    border-color: #6C63FF;
}
</style>