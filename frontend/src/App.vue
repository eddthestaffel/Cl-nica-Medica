<template>
  <div>

    <!-- NAVBAR -->
    <nav class="navbar">
      <router-link to="/agenda">Agenda</router-link>
      <router-link to="/pacientes">Pacientes</router-link>
      <router-link to="/turnos">Turnos</router-link>

      <button @click="logout">
        Cerrar sesión
      </button>
    </nav>

    <!-- VISTAS -->
    <router-view />

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #222;
}

.navbar a {
  color: white;
  text-decoration: none;
}

button {
  margin-left: auto;
}
</style>