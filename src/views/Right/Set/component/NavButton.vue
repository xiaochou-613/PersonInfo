<script setup>
import { ref } from 'vue'

// var animateButton = function (e) {
//   e.preventDefault
//   //reset animation
//   e.target.classList.remove('animate')

//   e.target.classList.add('animate')
//   setTimeout(function () {
//     e.target.classList.remove('animate')
//   }, 700)
// }

// var bubblyButtons = document.getElementsByClassName('bubbly-button')

// for (var i = 0; i < bubblyButtons.length; i++) {
//   bubblyButtons[i].addEventListener('click', animateButton, false)
// }
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
