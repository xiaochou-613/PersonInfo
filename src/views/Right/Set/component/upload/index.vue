<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'

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

// 处理上传逻辑
const uploadFile = ref()
const userStore = useUserStore()
const upload = () => {
  if (uploadFile.value.files) {
    const reader = new FileReader()
    reader.onload = (event) => {
      // 将文件数据保存在变量中
      let imageData = event.target.result
      if (imageData) {
        // 修改图片
        userStore.updateUserInfo({ image: imageData })
        console.log(imageData)
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
      accept=".jpg, .jpeg, .png"
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
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
