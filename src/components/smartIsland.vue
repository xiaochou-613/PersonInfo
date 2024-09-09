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
    <img class="image" draggable="false" src="@/image/smart.jpg" />
    <p>{{ message }}</p>
  </div>
</template>

<style lang="scss" scoped>
.land {
  width: 220px;
  height: 60px;
  border-radius: 50px;
  /* background-color: black; */
  background-color: white;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
  color: black;
  position: absolute;
  top: 7%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  display: flex;
  justify-content: center;
  animation:
    inShow 0.5s ease-in forwards,
    OUT 0.5s ease-out forwards 3s;
  .image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 5px 5px 0px 5px;
    opacity: 0;
    transition: all 0.2s ease-in;
    animation: contentin 0.5s ease-in forwards;
  }
  p {
    flex: 1;
    text-align: center;
    align-self: center;
    transition: all 0.2s ease-in;
    animation: pin 0.5s ease-in forwards;
  }
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

@keyframes pin {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    /* font-size: 5px; */
    transform: scale(0.3);
    opacity: 0.5;
  }
  75% {
    /* font-size: 10px; */
    transform: scale(0.8);
    opacity: 0.6;
  }
  100% {
    /* font-size: 16px; */
    transform: scale(1);
    opacity: 1;
  }
}
</style>
