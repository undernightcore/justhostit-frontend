<template>
    <div class="card" @click="seleccionar()">
        <div class="card-body">
            <h5 class="card-title">Versión <span class="texto-azul">{{version.nombre}}</span></h5>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CartaVersion',
    props: {
        version: Object
    },
    methods: {
        seleccionar: function () {
            this.$emit('seleccionado', this.version);
        }
    }
}
</script>

<style scoped>
.card:hover {
    border-color: #6C63FF;
}
</style>