<template>
  <div>
    <nav>
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Registro</router-link> |
      <router-link to="/pacientes">Pacientes</router-link> |
      <router-link to="/agenda">Agenda</router-link>
    </nav>

    <hr>

    <router-view />
  </div>
</template>