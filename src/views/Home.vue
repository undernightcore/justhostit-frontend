<template>
  <div class="home">
    <NavBar />
    <div id="seccion1" class="d-flex justify-content-center">
      <div
        class="
          row
          g-0
          row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2
          text-center
          fila-inicio
        "
      >
        <div class="col align-self-center texto-inicio">
          <h3>Dedícate a lo que importa, nosotros nos encargamos del resto</h3>
          <p>
            Programa, desarrolla y lleva a cabo tus proyectos sin preocuparte en
            absoluto en la infraestructura.
          </p>
        </div>
        <div class="col align-self-center">
          <img
            class="img-fluid imagen-inicio"
            src="@/assets/img/undraw_programming_re_kg9v.svg"
          />
        </div>
      </div>
    </div>
    <div id="seccion2">
      <h2 class="titulo-contenedores">Nuestras imagenes</h2>
      <div class="d-flex justify-content-center">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3 fila-inicio">
          <div class="col text-center columna-contenedor">
            <img
              class="img-fluid imagen-contenedor"
              src="@/assets/img/Faenza-start-here-ubuntu-symbolic.svg"
            />
            <h6 class="titulo-contenedor">Ubuntu</h6>
            <p>
              Distribución de Linux basada en Debian, que incluye principalmente
              software libre y de código abierto.<br />
            </p>
          </div>
          <div class="col text-center columna-contenedor">
            <img
              class="img-fluid imagen-contenedor"
              src="@/assets/img/Faenza-start-here-debian-symbolic.svg"
            />
            <h6 class="titulo-contenedor">Debian</h6>
            <p>
              Sistema operativo libre, desarrollado por miles de voluntarios de
              todo el mundo, que colaboran a través de Internet.
            </p>
          </div>
          <div class="col text-center columna-contenedor">
            <img
              class="img-fluid imagen-contenedor"
              src="@/assets/img/wordpress-svgrepo-com.svg"
            />
            <h6 class="titulo-contenedor">Wordpress</h6>
            <p>
              Sistema de gestión de contenidos lanzado el 27 de mayo de 2003,
              enfocado a la creación de cualquier tipo de página web.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="seccion3" class="d-flex justify-content-center">
    <div
      class="
        row
        g-0
        row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2
        text-center
        fila-inicio
      "
    >
      <div class="col align-self-center">
        <img
          class="img-fluid imagen-inicio"
          src="@/assets/img/undraw_hacker_mind_-6-y85.svg"
        />
      </div>
      <div class="col align-self-center texto-inicio">
        <h3>Alta disponibilidad y escabilidad sin complicaciones</h3>
        <p>
          Todo nuestros servicios están autogestionados. Ya no tendrás que
          preocuparte más en distribución de carga, DNS, firewalls, puertos...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";

export default {
  name: "Home",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.texto-inicio {
  padding-left: 22px;
  padding-bottom: 155px;
  padding-right: 22px;
  padding-top: 155px;
}

.imagen-inicio {
  width: 400px;
}

.fila-inicio {
  width: 80%;
}

.imagen-contenedor {
  width: 114px;
}

.titulo-contenedores {
  text-align: center;
  margin-bottom: 44px;
}

.titulo-contenedor {
  margin-top: 22px;
}

.columna-contenedor {
  padding-right: 40px;
  padding-left: 40px;
}

#seccion1, #seccion2, #seccion3 {
  padding: 50px 0;
}
</style>