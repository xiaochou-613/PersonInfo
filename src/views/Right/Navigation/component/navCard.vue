<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
const box = ref()
const props = defineProps({
  webInfo: {
    type: Object,
    require: true
  },
  color: {
    type: Object,
    require: true
    //   textColor: '#000',
    //   backColor: '#7CFC00',
    //   tagColor: '#FFF44F',
    //   tagTextColor: '#000'
  },
  tag: {
    type: String,
    require: true
  }
})

//跳转网页
const gotoWeb = () => {
  window.open(props.webInfo.url)
}

const hoverIn = () => {
  box.value.style.backgroundColor = props.color.backColor
  box.value.querySelectorAll('.re-color')[0].style.color = props.color.textColor
  box.value.querySelectorAll('.re-color')[1].style.color = props.color.textColor
}
const hoverOut = () => {
  //还原
  box.value.style.backgroundColor = 'rgb(247, 249, 254)'
  box.value.querySelectorAll('.re-color')[0].style.color = '#000'
  box.value.querySelectorAll('.re-color')[1].style.color = '#000'
}

const tagRef = ref()
onMounted(() => {
  tagRef.value.style.backgroundColor = props.color.tagColor
  tagRef.value.style.color = props.color.tagTextColor
})
</script>

<template>
  <div
    class="box"
    @mouseover="hoverIn"
    @mouseout="hoverOut"
    @click="gotoWeb"
    ref="box"
  >
    <img :src="webInfo.image" alt="" />
    <div class="navtext">
      <h3 class="re-color">{{ webInfo.title }}</h3>
      <span class="re-color">{{ webInfo.xtitle }}</span>
    </div>
    <span class="site-card-tag-right3" ref="tagRef">{{ tag }}</span>
  </div>
</template>

<style>
.box {
  width: 30%;
  height: 90px;
  overflow: hidden;
  /* background-color: aqua; */
  margin-left: 15px;
  border-radius: 10px;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  transition: all 0.4s ease-in-out; /* 添加默认过渡效果 */
  img {
    position: relative;
    left: 0px;
    top: 0px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    transition: all 0.4s ease-in-out; /* 添加默认过渡效果 */
  }
  .site-card-tag-right3 {
    /* width: 50px; */
    height: 20px;
    position: relative;
    top: -34px;
    right: -7px;
    padding: 3px 14px;
    background-color: #27a13d;
    box-shadow: #28a63f;
    color: #fff;
    /* z-index: 1; */
    border-radius: 0 10px 0 10px;
    transition: all 0.4s ease-in-out; /* 添加默认过渡效果 */
    font-size: 0.6rem;
  }
}
.navtext {
  max-width: 136px;
  overflow: hidden;
  transition: all 0.4s ease-in-out; /* 添加默认过渡效果 */
  white-space: nowrap;
  text-overflow: ellipsis;
  span {
    display: inline;
    white-space: nowrap;
    padding: 5px 10px 16px 0;
    text-align: left;
    height: 40px;
    text-overflow: ellipsis;
    opacity: 0.7;
    transition: all 0.4s ease-in-out; /* 添加默认过渡效果 */
  }
}

.box:hover {
  background-color: rgb(68, 94, 232);
}

.box:hover img {
  transform: scale(0);
  left: -45px;
  top: -35px;
}

.box:hover .site-card-tag-right3 {
  right: -88px;
}

.box:hover .navtext {
  white-space: unset;
  margin-left: -132px;
  overflow: visible;
  h3,
  span {
    color: #fff;
  }
}
.box:active {
  transform: scale(0.9);
}
</style>
