<template>
  <div class="flex flex-col gap-5 relative">
    <a target="_blank"></a>
    <button class="text-[30px] border-b-2">绑定推特</button>
    <button class="text-[30px] border-b-2">绑定discord</button>
    <button class="text-[30px] border-b-2" @click="methods.guanzhu">关注用户</button>
    <button class="text-[30px] border-b-2" @click="methods.fatui">发送推文</button>
    <button class="text-[30px] border-b-2" @click="methods.xihuan">点赞推文</button>
    <button class="text-[30px] border-b-2" @click="methods.fenxiang">分享推文</button>
    <button class="text-[30px] border-b-2" @click="methods.pinglun">评论推文</button>
    <button class="text-[30px] border-b-2" @click="methods.zhuanfa">转推</button>
    <button class="text-[30px] border-b-2" @click="methods.zhuanfapinglun">带评论转发推文</button>
  </div>
</template>

<script setup>
const methods = {
  guanzhu() {
    window.open('https://twitter.com/intent/follow?screen_name=username', '_blank');
  },
  xihuan() {
    window.open('https://twitter.com/intent/like?tweet_id=1763778041824805023', '_blank')
  },
  fenxiang() {
    const url = 'https://twitter.com/cb_doge/status/1763778041824805023';
    window.open(`https://twitter.com/intent/tweet?text=text&url=${encodeURIComponent(url)}`, '_blank')
  },
  pinglun() {
    window.open('https://twitter.com/intent/tweet?in_reply_to=[1763911418716557374]&text=your_comment', '_blank')
  },
  zhuanfapinglun() {
    const username = "oneness";
    const text = `@${username} #${username} Twitter Web Intent https://pbs.twimg.com/media/GHofVllboAAGZJt?format=jpg&name=large`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&in_reply_to=1762502940961722677`, '_blank')
  },
  zhuanfa() {
    window.open('https://twitter.com/intent/retweet?tweet_id=1762502940961722677', '_blank')
  },
  fatui() {
    // const username = "oneness";
    // 最多280个字符
    // const text = `@${username} #${username} Twitter Web Intent https://pbs.twimg.com/media/GHofVllboAAGZJt?format=jpg&name=large`;
    // const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    const url = `https://twitter.com/intent/post?text=test%20%40oneness%20%23oneness%20Twitter%20Web%20Intent%20https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FGHofVllboAAGZJt%3Fformat%3Djpg%26name%3Dlarge`
    window.open(url, '_blank');
  },
}
</script>