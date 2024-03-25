<script setup>
import { ref, onMounted } from 'vue'

const file = ref(null)
onMounted(() => {
  file.value.addEventListener('dragover', function () {
    file.value.classList.add('drag')
    file.value.classList.remove('drop', 'done')
  })

  file.value.addEventListener('dragleave', function () {
    file.value.classList.remove('drag')
  })

  file.value.addEventListener('drop', start, false)
  file.value.addEventListener('change', start, false)

  function start() {
    file.value.classList.remove('drag')
    file.value.classList.add('drop')
    setTimeout(() => file.value.classList.add('done'), 3000)
  }
})

//将上传的文件保存在本地
const uploadFile = ref(null)

const upload = () => {
  if (uploadFile.value.files) {
    const reader = new FileReader()
    reader.onload = (event) => {
      // 将文件数据保存在变量中
      let imageData = event.target.result
      if (imageData) {
        // 将图片数据保存到 localStorage
        localStorage.setItem('uploadedImage', imageData)
      }
    }
    reader.readAsDataURL(uploadFile.value.files[0])
  }
}
</script>

<template>
  <div class="upload" ref="file">
    <input
      type="file"
      title=""
      class="drop-here"
      ref="uploadFile"
      @change="upload"
    />
    <div class="text text-drop">+</div>
    <div class="text text-upload">...</div>
    <!-- <svg class="progress-wrapper" width="300" height="300">
      <circle class="progress" r="115" cx="150" cy="150"></circle>
    </svg> -->
    <svg class="check-wrapper" width="50" height="50">
      <polyline class="check" points="40.2,20.2 25.5,44.8 13.8,33.5 " />
    </svg>
    <div class="shadow"></div>
  </div>

  <!--- ## DRIBBBLE + TWITTER ############# -->
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
