<template>
    <div class="card" @click="seleccionar()">
        <div class="card-body">
            <img :src="instancia.Plantillas.logo" class="card-img-top" alt="..." style="width: 10%; margin-bottom: 10px; filter: grayscale(100%);">
            <h5 class="card-title"><span class="texto-azul">Nombre:</span> {{instancia.nombre}}</h5>
            <h5 class="card-title"><span class="texto-azul">Descripcion:</span> {{instancia.descripcion}}</h5>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CartaInstancia',
    props: {
        instancia: Object
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
.card-title {
    margin-top: 10px;
}
</style>