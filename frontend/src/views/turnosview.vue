<template>
  <div class="card">
    <h1>Turnos</h1>

    <h2>Crear turno</h2>

    <input v-model="nuevo.pacienteId" placeholder="Paciente ID" />
    <input v-model="nuevo.medico" placeholder="Médico" />

    <input v-model="nuevo.fecha" type="date" />
    <input v-model="nuevo.horaInicio" type="time" />
    <input v-model="nuevo.horaFin" type="time" />

    <input v-model="nuevo.motivo" placeholder="Motivo" />

    <button @click="crearTurno">Crear</button>

    <hr>

    <h2>Listado</h2>

    <table border="1">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora Inicio</th>
          <th>Hora Fin</th>
          <th>Paciente</th>
          <th>Médico</th>
          <th>Motivo</th>
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const turnos = ref([])

const nuevo = ref({
  pacienteId: '',
  medico: '',
  fecha: '',
  horaInicio: '',
  horaFin: '',
  motivo: ''
})

const cargar = async () => {
  const res = await api.get('/turnos')
  turnos.value = res.data.data || res.data || []
}

const crearTurno = async () => {
  try {
    console.log("CREANDO TURNO:", nuevo.value)

    const res = await api.post('/turnos', nuevo.value)

    console.log("CREADO:", res.data)

    await cargar()

    nuevo.value = {
      pacienteId: '',
      medico: '',
      fecha: '',
      horaInicio: '',
      horaFin: '',
      motivo: ''
    }

  } catch (error) {
    console.error("ERROR CREANDO TURNO:", error.response?.data || error)
  }
} 

onMounted(() => {
  cargar()
})
</script>