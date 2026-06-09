<template>
  <div>
    <h1>Login</h1>

    <input v-model="email" placeholder="Email" />
    <br><br>

    <input
      v-model="password"
      type="password"
      placeholder="Contraseña"
    />
    <br><br>

    <button @click="login">
      Ingresar
    </button>

    <br><br>

    <router-link to="/registro">
      ¿No tienes cuenta? Regístrate
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const mensaje = ref('')

const login = async () => {
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    localStorage.setItem(
      'token',
      response.data.data.accessToken
    )
    
    mensaje.value = 'Login exitoso'
    router.push('/agenda')
  } catch (error) {
    mensaje.value = error.response?.data?.message || 'Error'
  }
}
</script>