<template>
  <div>
    <h1>Pacientes</h1>

    <h2>Nuevo Paciente</h2>

    <input v-model="nuevo.nombre" placeholder="Nombre">
    <input v-model="nuevo.apellido" placeholder="Apellido">
    <input v-model="nuevo.rut" placeholder="RUT">
    <input v-model="nuevo.fechaNacimiento" type="date">
    <input v-model="nuevo.telefono" placeholder="Teléfono">
    <input v-model="nuevo.email" placeholder="Email">

    <button @click="crearPaciente">
      Crear
    </button>

    <hr>

    <h2>Listado</h2>

    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>RUT</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in pacientes" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ p.apellido }}</td>
          <td>{{ p.rut }}</td>

          <td>
            <button @click="editarPaciente(p)">
              Editar
            </button>

            <button @click="eliminarPaciente(p.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="editando">
      <hr>

      <h2>Editar Paciente</h2>

      <input v-model="editando.nombre">
      <input v-model="editando.apellido">
      <input v-model="editando.rut">
      <input v-model="editando.fechaNacimiento" type="date">
      <input v-model="editando.telefono">
      <input v-model="editando.email">

      <button @click="guardarEdicion">
        Guardar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const pacientes = ref([])

const nuevo = ref({
  nombre: '',
  apellido: '',
  rut: '',
  fechaNacimiento: '',
  telefono: '',
  email: ''
})

const editando = ref(null)

const cargarPacientes = async () => {
  const response = await api.get('/pacientes')
  pacientes.value = response.data.data
}

const crearPaciente = async () => {
  await api.post('/pacientes', nuevo.value)
  cargarPacientes()
}

const eliminarPaciente = async (id) => {
  await api.delete(`/pacientes/${id}`)
  cargarPacientes()
}

const editarPaciente = (paciente) => {
  editando.value = { ...paciente }
}

const guardarEdicion = async () => {
  await api.put(`/pacientes/${editando.value.id}`, editando.value)
  editando.value = null
  cargarPacientes()
}

onMounted(() => {
  cargarPacientes()
})
</script>