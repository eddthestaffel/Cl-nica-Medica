<template>
  <div>
    <h1>Restablecer contraseña</h1>

    <input
      v-model="token"
      placeholder="Token de recuperación"
    >

    <input
      v-model="password"
      type="password"
      placeholder="Nueva contraseña"
    >

    <button @click="restablecer">
      Cambiar contraseña
    </button>

    <p v-if="mensaje">
      {{ mensaje }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const route = useRoute()

const token = ref(route.query.token || '')
const password = ref('')
const mensaje = ref('')

const restablecer = async () => {
  try {

    const response = await api.post(
      '/auth/reset-password',
      {
        token: token.value,
        password: password.value
      }
    )

    mensaje.value = response.data.message

    setTimeout(() => {
      router.push('/login')
    }, 2000)

  } catch (error) {

    mensaje.value =
      error.response?.data?.message ||
      'Error al cambiar contraseña'

  }
}
</script>