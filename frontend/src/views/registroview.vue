<template>
  <div class="card">
    <h1>Registro</h1>

    <input v-model="nombre" placeholder="Nombre" />
    <br><br>

    <input v-model="email" placeholder="Email" />
    <br><br>

    <input
      v-model="password"
      type="password"
      placeholder="Contraseña"
    />
    <br><br>

    <button @click="registrar">
      Registrar
    </button>
    <p>{{ mensaje }}</p>

    <br><br>

    <router-link to="/">
      Ya tengo cuenta
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const nombre = ref('')
const email = ref('')
const password = ref('')
const mensaje = ref('')

const registrar = async () => {
  try {
    await api.post('/auth/register', {
      nombre: nombre.value,
      email: email.value,
      password: password.value
    })

    mensaje.value = 'Usuario creado'

    router.push('/')
  } catch (error) {
    mensaje.value = error.response?.data?.message || 'Error'
  }
}
</script>