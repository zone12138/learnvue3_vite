<template>
  <div class="app-views">
    <el-menu :default-active="activeIndex" mode="horizontal" router>
      <el-sub-menu index="1">
        <template #title> 首页 </template>
        <el-menu-item index="/">Home</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/About">About</el-menu-item>

      <div class="flex-box-center flex-grow">
        <el-switch
          v-model="theme"
          :active-action-icon="Sunny"
          :inactive-action-icon="Moon"
        />
      </div>
    </el-menu>
    <el-watermark class="content-views" content="Vue3 & Vite">
      <router-view v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </router-view>
    </el-watermark>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Sunny, Moon } from "@element-plus/icons-vue";
const theme = ref(true);
const activeIndex = ref("1");

watch(
  theme,
  (val) => {
    const classList = document.documentElement.classList;
    classList.remove(val ? "dark" : "light");
    classList.add(val ? "light" : "dark");
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.app-views {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.content-views {
  flex: 1;
  overflow: hidden;
}
</style>
