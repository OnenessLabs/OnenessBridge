<template>
  <img class="w-[8.33vw] max-lg:w-[98px] max-w-[160px] mt-[2.0vw] 2lx:mt-[40px;]
max-sm:my-[20px]"
       :src="logo" alt="">
  <div class="relative font-[LemonMilk] text-[#ffffff] flex items-center
max-sm:mb-[8vw]">
    <div>
      <p style="line-height: 1.2"
         class="text-transform: uppercase text-[3.75vw] 2xl:text-[72px] max-sm:text-[7.46vw]">
        Oneness SparkFest
      </p>
      <p class="relative opacity-60 mt-[24px] sm:text-[12px] lg:text-[14px] xl:text-[16px] 3xl:text-[18px]
max-sm:mt-[10px]">
        Embark on the Oneness SparkFest journey, where each task you complete ignites a spark towards unlocking exclusive rewards and uncovering the hidden treasures of the Oneness community
      </p>
    </div>

    <img class="w-[25vw] z-[-1]
    max-sm:absolute right-0 max-sm:top-[50%] max-sm:translate-y-[-50%] max-sm:w-[46.6vw]" src="./img/banner.png" alt="">
  </div>
</template>

<script setup>
const logo = new URL("@/assets/img/logo.png", import.meta.url).href;
</script>
