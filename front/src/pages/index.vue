<template>
  <div>{{ val }}</div>
  <button @click="val += 1">Increase</button>
  <test-component />
</template>

<script setup lang="ts">
const val = ref<number>(0)
</script>

<style scoped></style>
