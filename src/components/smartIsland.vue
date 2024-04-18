<script setup>
/**
 * 自己封装的 smart-Island
 * params: message String    toast消息
 * params: duration Number   默认 3s  - 没做
 * */
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <!-- 设计一个灵动岛 -->
  <div class="land">
    <img
      class="image"
      draggable="false"
      src="https://c4.wallpaperflare.com/wallpaper/224/466/325/%E5%8A%A8%E6%BC%AB%E5%9B%BE%E7%89%87-%E9%B2%9C%E8%89%B3%E8%89%B2%E5%BD%A9-hd-wallpaper-preview.jpg"
    />

    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.land {
  width: 220px;
  height: 60px;
  border-radius: 50px;
  /* background-color: black; */
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  color: black;
  text-align: center;
  /* line-height: 60px; */
  /* font-size: ; */
  position: absolute;
  top: 7%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  animation:
    inShow 0.5s ease-in forwards,
    OUT 0.5s ease-out forwards 3s;
  .image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
    margin: 5px 5px 0px 5px;
    opacity: 0;
    transition: all 0.2s ease-in;
    animation: contentin 0.5s ease-in forwards;
  }
}
p {
  width: 150px;
  line-height: 60px;
  margin: 0px;
  float: left;
}

@keyframes inShow {
  0% {
    width: 0px;
    height: 0px;
  }
  50% {
    width: 220px;
    height: 60px;
  }
  75% {
    width: 230px;
    height: 70px;
  }
  100% {
    width: 220px;
  }
}

@keyframes contentin {
  0% {
    width: 0px;
    height: 0px;
  }
  50% {
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
  75% {
    width: 50px;
    height: 50px;
    opacity: 0.6;
  }
  100% {
    width: 50px;
    height: 50px;
    opacity: 1;
  }
}

@keyframes OUT {
  0% {
    /* Use "from" instead of 0% for clarity */
    top: 6%; /* Maintain final position from inShow */
  }
  50% {
    top: 8%; /* Move up slightly */
  }
  100% {
    /* Use "to" instead of 100% for clarity */
    top: -3%;
  }
}
</style>
