<template>
  <div class="card">
    <h1>Recuperar contraseña</h1>

    <input
      v-model="email"
      type="email"
      placeholder="Correo electrónico"
    >

    <button @click="solicitarToken">
      Solicitar recuperación
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const token = ref('')

const solicitarToken = async () => {
  try {

    const response = await api.post(
      '/auth/forgot-password',
      {
        email: email.value
      }
    )
    
    token.value = response.data.token || ''
    
    setTimeout(() => {
    router.push(`/reset-password?token=${token.value}`)
    }, 1000)

  } catch (error) {

    console.error(
      error.response?.data || error
    )

  }
}
</script>