<script setup>
import * as THREE from 'three'
import Clouds from 'vanta/src/vanta.clouds'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Node from './component/note.vue'

const Area = ref(null)
let vantaEffect = null
//在两个生命周期钩子内创建vantaEffect
onMounted(() => {
  vantaEffect = Clouds({
    el: Area.value,
    THREE: THREE,
    skyColor: 0x139beb,
    cloudColor: 0xa9acc5
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>

<template>
  <div class="plan_cont" ref="Area">
    <div class="plan_box">
      <node></node>
    </div>
  </div>
</template>

<style>
.plan_cont {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url();
}
.plan_box {
  width: 350px;
  height: 600px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  background: rgba(223, 223, 223, 0.4);
  backdrop-filter: blur(1px);
  border-radius: 15px;
}
</style>
