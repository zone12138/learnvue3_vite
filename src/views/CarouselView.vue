<!--
 * @Author: xie 1459547902@qq.com
 * @Date: 2024-07-22 09:41:22
 * @LastEditors: xie 1459547902@qq.com
 * @LastEditTime: 2024-07-25 17:08:04
 * @FilePath: \learnvue3_vite\src\views\CarouselView.vue
 * @Description: CarouselView.vue
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
