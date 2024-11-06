<script setup>
import { ref } from 'vue'
const btn = ref(null)

const animateButton = () => {
  btn.value.preventDefault
  //reset animation
  btn.value.classList.remove('animate')

  btn.value.classList.add('animate')
  setTimeout(function () {
    btn.value.classList.remove('animate')
  }, 700)

  setTimeout(function () {
    window.location.reload()
  }, 1000)
}
</script>

<template>
  <button ref="btn" class="bubbly-button" @click="animateButton">Submit</button>
</template>

<style lang="scss" scoped>
@import './button.scss';
</style>
