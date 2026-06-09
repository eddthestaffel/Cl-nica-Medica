<template>
  <div>
    <h1>Agenda del día</h1>

    <button @click="cargarAgenda">
      Actualizar
    </button>

    <p>Total turnos: {{ turnos.length }}</p>

    <table border="1">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora Inicio</th>
          <th>Hora Fin</th>
          <th>Paciente ID</th>
          <th>Médico</th>
          <th>Motivo</th>
          <th>Estado</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="t in turnos" :key="t.id">
          <td>{{ t.fecha }}</td>
          <td>{{ t.horaInicio }}</td>
          <td>{{ t.horaFin }}</td>
          <td>{{ t.pacienteId }}</td>
          <td>{{ t.medico }}</td>
          <td>{{ t.motivo }}</td>
          <td>{{ t.estado }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const turnos = ref([])

const cargarAgenda = async () => {
  try {
    const res = await api.get('/turnos')

    console.log("AGENDA:", res.data)

    turnos.value = res.data.data || res.data || []
  } catch (error) {
    console.error("ERROR AGENDA:", error.response?.data || error)
  }
}

onMounted(() => {
  cargarAgenda()
})
</script>