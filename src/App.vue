<script setup>
import { ref, provide } from 'vue'
const device = ref()

// watchEffect(() => {
//   device.value = window.matchMedia('(min-width: 1500px)')
// }, []) // 空依赖数组用于连续监控

if (window.matchMedia('(min-width: 1500px)').matches) {
  device.value = true
} else {
  device.value = false
}

window.addEventListener('resize', () => {
  device.value = window.matchMedia('(min-width: 1500px)').matches
})

provide('device', device)
</script>

<template>
  <RouterView></RouterView>
</template>
