<!--
 * @Author: xie 1459547902@qq.com
 * @Date: 2024-07-22 09:41:22
 * @LastEditors: xie 1459547902@qq.com
 * @LastEditTime: 2024-07-23 11:49:14
 * @FilePath: \learnvue3_vite\src\views\About.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <Carousel :initialIndex="1">
      <CarouselItem>
        <div style="background-color: red; height: 100%; width: 100%"></div>
      </CarouselItem>
      <CarouselItem>
        <div style="background-color: green; height: 100%; width: 100%"></div>
      </CarouselItem>
      <CarouselItem>
        <div style="background-color: yellow; height: 100%; width: 100%"></div>
      </CarouselItem>
      <CarouselItem>
        <div style="background-color: purple; height: 100%; width: 100%"></div>
      </CarouselItem>
      <CarouselItem>
        <div style="background-color: pink; height: 100%; width: 100%"></div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import Carousel from "../components/Carousel.vue";
import CarouselItem from "../components/CarouselItem.vue";
</script>

<style lang="scss" scoped></style>
