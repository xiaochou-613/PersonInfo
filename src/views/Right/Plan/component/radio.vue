<script setup>
import { ref, watch } from 'vue'
import { nextTick } from 'vue'

defineOptions({
  name: 'radioComponent'
})
const props = defineProps({
  isDone: {
    required: true
  }
})

const checked = ref(false)
const radio = ref(null)
checked.value = props.isDone

const emit = defineEmits(['update_isDone'])
const done = () => {
  checked.value = !checked.value

  emit('update_isDone', checked.value ? 1 : 0)
}

watch(
  checked,
  async () => {
    await nextTick()
    radio.value.style.backgroundColor = checked.value ? 'rgb(62, 150, 328)' : ''
    radio.value.style.border = checked.value ? 'none' : '1px solid #fff'
    radio.value.style.filter = checked.value
      ? 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.2))'
      : 'none'
  },
  { immediate: true }
)
</script>

<template>
  <div ref="radio" class="circle" @click="done">
    <!-- <div class="little" ref="little"></div> -->
  </div>
</template>

<style scoped>
.circle {
  display: inline-block;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid #fff;
  /* padding: 3px; */
  /* position: absolute; */
  transition: all 0.4s;
  /* .circle:active {
    transform: scale(0.9);
  } */
}
.circle:hover {
  transform: scale(1.15);
}
</style>
