# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## GEN-12 – Evolución de esquema

Se realizó una migración de tipo AC (Agregar Campo).

### Cambio realizado

Se agregó el campo `direccion` a la tabla `pacientes`.

### Motivo

Permitir almacenar información de contacto más completa de los pacientes registrados en el sistema de Clínica Médica.

### Archivos modificados

* Migración de Sequelize para agregar la columna `direccion`.
* Modelo `Paciente`.
* Formulario de creación de pacientes.
* Formulario de edición de pacientes.

### Resultado

Los pacientes ahora pueden registrar y actualizar su dirección desde la interfaz web.
