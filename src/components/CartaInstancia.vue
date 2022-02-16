<template>
    <div class="card" @click="seleccionar()">
        <div class="card-body">
            <img :src="instancia.Plantillas.logo" class="card-img-top" alt="..." style="width: 10%; margin-bottom: 10px; filter: grayscale(100%);">
            <h6 class="card-title"><span class="texto-azul">Nombre:</span> {{instancia.nombre}}</h6>
            <h6 class="card-title"><span class="texto-azul">Descripcion:</span> {{instancia.descripcion}}</h6>
            <h6 class="card-title"><span class="texto-azul">Estado: </span> 
                <span v-if="instancia.creada" class="creado">Creado</span>
                <span v-else-if="instancia.creandose" class="creandose">Creandose</span>
                <span v-else class="pendiente">Pendiente</span>
            </h6>
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
.creado {
    color: #65db7e;
}

.creandose {
    color: #0553b9;
}

.pendiente {
color: #aaaaaa;
}

.card:hover {
    border-color: #6C63FF;
}
.card-title {
    margin-top: 10px;
}
</style>