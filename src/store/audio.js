//关于audio

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  const audio = ref(null)

  //播放时间 - 字符串
  const currentTime = ref(0)

  //总时长 - 字符串
  const totalTime = ref(0)

  //进度条的百分参数
  const schedule = ref()

  //歌词数据
  const lyric = ref([])

  //当前歌词的索引
  const lyricIndex = ref(0)

  // 点击播放
  const play = () => {
    audio.value.play()
  }

  // 点击暂停
  const pause = () => {
    audio.value.pause()
  }

  //播放暂停
  const transState = () => {
    if (audio.value.paused) audio.value.play()
    else audio.value.pause()
  }

  //将秒转换成分秒
  const formatTime = (time) => {
    // 将时间转换为分钟
    const minutes = Math.floor(time / 60)
    // 计算剩余秒数
    const remainingSeconds = Math.floor(time % 60)
    // 补零
    const formattedMinutes = minutes.toString() //.padStart(2, '0')
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0')
    // 返回格式化后的时间
    return `${formattedMinutes}:${formattedSeconds}`
  }

  //----歌词

  //添加歌词数据
  const transWords = (words) => {
    const rewords = words.split('\n')
    for (let item in rewords) {
      const words = rewords[item].split(']')
      const obj = {
        time: transSec(words[0]),
        word: words[1]
      }
      lyric.value.push(obj)
    }
  }

  //返回歌名
  const lyricName = () => {
    for (let i = 0; i < lyric.value.length; i++) {
      if (lyric.value[i].word) {
        // console.log('当前播放时间', time, 'word：', lyric.value[i - 1].word)
        return lyric.value[i].word
      }
    }
  }

  //找到歌词的位置
  const findIndex = (time) => {
    let i = 0
    for (i = 0; i < lyric.value.length; i++) {
      if (lyric.value[i].time > time) {
        // console.log('当前播放时间', time, 'word：', lyric.value[i - 1].word)
        return i - 1
      }
    }
    //最后一个歌词
    return i - 1
  }

  //设置歌词偏移量
  const setOffset = () => {
    return (
      window.lyricLiHeight * lyricIndex.value +
      window.lyricLiHeight / 2 -
      window.lyricUlHeight / 2
    )
  }

  //更新播放时长
  const timeChange = () => {
    //格式化正在播放的时间
    currentTime.value = formatTime(audio.value?.currentTime)
    //实时更新进度条
    schedule.value = (audio.value?.currentTime / audio.value?.duration) * 100
    //实时找到当前播放的歌词索引
    lyricIndex.value = findIndex(audio.value.currentTime)
    //设置歌词的偏移量
    if (window.contRef)
      window.contRef.children[0].style.transform = `translateY(-${setOffset()}px)`
  }

  // 导出
  return {
    //属性
    audio,
    totalTime,
    currentTime,
    schedule,
    lyric,
    lyricIndex,
    //方法
    play,
    pause,
    transState,
    formatTime,
    timeChange,
    transWords,
    lyricName,
    setOffset
  }
})

/**
 * 将时间转换成秒,歌词解析专用
 */
const transSec = (time) => {
  const newtime = time.substring(1).split(':')
  //   console.log(time.substring(1).split(':'))
  const minutes = parseInt(newtime[0])
  return 60 * minutes + parseFloat(time.split(':')[1])
}
