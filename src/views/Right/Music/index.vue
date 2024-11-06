<script setup>
import Music_col from './components/music_col.vue'
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <div v-if="true" class="comp" :key="Component">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
  <Music_col class="col"></Music_col>
</template>

<style scoped>
@media screen and (min-width: 1500px) {
  .col {
    height: 91px;
  }
  .comp {
    height: calc(100% - 91px);
  }
}

@media screen and (max-width: 1500px) {
  .col {
    height: 50px;
  }
  .comp {
    height: calc(100% - 50px);
  }
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
