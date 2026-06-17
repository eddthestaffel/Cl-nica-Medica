<template>
  <div>

    <nav
      v-if="
        $route.path !== '/login' &&
        $route.path !== '/register' &&
        $route.path !== '/forgot-password' &&
        $route.path !== '/reset-password'
      "
      class="navbar"
    >
      <router-link to="/agenda">Agenda</router-link>
      <router-link to="/pacientes">Pacientes</router-link>
      <router-link to="/turnos">Turnos</router-link>

      <button @click="logout">
        Cerrar sesión
      </button>
    </nav>

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
  align-items: center;
  gap: 15px;
  background: #1976d2;
  padding: 15px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.navbar a:hover {
  text-decoration: underline;
}

button {
  margin-left: auto;
  background: #d32f2f;
}

button:hover {
  background: #b71c1c;
}
</style>