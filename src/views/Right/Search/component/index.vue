<script setup>
import { ref } from 'vue'
const SearchText = ref('')

const prop = defineProps({
  searchEngine: {
    type: String,
    default: 'baidu'
  }
})
console.log(prop.searchEngine)

const seach = () => {
  if (SearchText.value === '') return
  if (prop.searchEngine === 'baidu') {
    window.open(`https://www.baidu.com/s?wd=${SearchText.value}`)
  } else if (prop.searchEngine === 'google') {
    window.open(`https://www.google.com/search?q=${SearchText.value}`)
  } else if (prop.searchEngine === 'bing') {
    window.open(`https://cn.bing.com/search?q=${SearchText.value}`)
  }
}
</script>

<template>
  <div id="cover">
    <form method="get" action="">
      <div class="tb">
        <div class="td">
          <input
            type="text"
            placeholder="Search"
            required
            v-model="SearchText"
            @keydown.enter="baidu"
          />
        </div>
        <div class="td" id="s-cover">
          <button type="submit" @click="seach">
            <div id="s-circle"></div>
            <span></span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
* {
  outline: none;
}

html,
body {
  height: 100%;
  min-height: 100%;
}

body {
  margin: 0;
  background-color: #ffd8d8;
}

.tb {
  display: table;
  width: 100%;
}

.td {
  display: table-cell;
  vertical-align: middle;
}

input,
button {
  color: #fff;
  font-family: Nunito;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: transparent;
}

#cover {
  /* position: absolute; */
  top: 50%;
  left: 0;
  right: 0;
  width: 903px;
  padding: 35px;
  /* margin: -83px auto 0 auto; */
  background-color: #ff7575;
  border-radius: 20px;
  box-shadow:
    0 10px 40px #ff7c7c,
    0 0 0 20px #ffffffeb;
  transform: scale(0.6);
}

form {
  height: 96px;
}

input[type='text'] {
  width: 100%;
  height: 96px;
  font-size: 60px;
  line-height: 1;
}

input[type='text']::placeholder {
  color: #e16868;
}

#s-cover {
  width: 1px;
  padding-left: 35px;
}

button {
  position: relative;
  display: block;
  width: 84px;
  height: 96px;
  cursor: pointer;
}

#s-circle {
  position: relative;
  top: -6px;
  left: -3px;
  width: 75px;
  height: 75px;
  margin-top: 0;
  border-width: 15px;
  border: 15px solid #fff;
  background-color: transparent;
  border-radius: 50%;
  transition: 0.5s ease all;
}

button span {
  position: absolute;
  top: 68px;
  left: 43px;
  display: block;
  width: 45px;
  height: 15px;
  background-color: transparent;
  border-radius: 10px;
  transform: rotateZ(52deg);
  transition: 0.5s ease all;
}

button span:before,
button span:after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 45px;
  height: 15px;
  background-color: #fff;
  border-radius: 10px;
  transform: rotateZ(0);
  transition: 0.5s ease all;
}

#s-cover:hover #s-circle {
  top: -1px;
  width: 67px;
  height: 15px;
  border-width: 0;
  background-color: #fff;
  border-radius: 20px;
}

#s-cover:hover span {
  top: 50%;
  left: 56px;
  width: 25px;
  margin-top: -9px;
  transform: rotateZ(0);
}

#s-cover:hover button span:before {
  bottom: 11px;
  transform: rotateZ(52deg);
}

#s-cover:hover button span:after {
  bottom: -11px;
  transform: rotateZ(-52deg);
}
#s-cover:hover button span:before,
#s-cover:hover button span:after {
  right: -6px;
  width: 40px;
  background-color: #fff;
}
</style>
