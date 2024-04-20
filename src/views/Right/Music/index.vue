<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped>
a {
  padding: 20px;
}

.fade-enter-from,
.fade-leave-to {
  /* 定义进入开始和离开结束的透明度为 0 */
  opacity: 0;
}

.fade-leave-to {
  transform: translatex(20px);
}

.fade-enter-to {
  transform: translatex(-20px);
}

.fade-enter-to,
.fade-leave-from {
  /* 定义进入结束和离开开始的透明度为 1 */
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-enter-to {
  transform: translatey(0);
  opacity: 1;
  transition: all 0.3s ease-out 0.2s;
}
</style>
