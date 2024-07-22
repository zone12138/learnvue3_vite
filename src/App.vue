<!--
 * @Author: xie 1459547902@qq.com
 * @Date: 2024-07-22 09:41:22
 * @LastEditors: xie 1459547902@qq.com
 * @LastEditTime: 2024-07-22 14:40:19
 * @FilePath: \learnvue3_vite\src\App.vue
 * @Description: App.vue
-->
<template>
  <div class="app-views">
    <div class="header-views">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        router
        class="flex-grow"
      >
        <el-sub-menu index="1">
          <template #title> 首页 </template>
          <el-menu-item index="/">Home</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/About">About</el-menu-item>
      </el-menu>
      <div class="flex-box-center switch-change-theme" ref="switchRef">
        <el-switch
          @change="updateView"
          v-model="theme"
          :active-action-icon="Sunny"
          :inactive-action-icon="Moon"
        />
      </div>
    </div>
    <el-watermark class="content-views" content="Vue3 & Vite">
      <router-view v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </router-view>
    </el-watermark>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
      tab-position="bottom"
    >
      <el-tab-pane
        v-for="{ path, meta } in routerArr"
        :key="path"
        :label="meta.title"
        :name="path"
        :closable="path != '/'"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { Sunny, Moon } from "@element-plus/icons-vue";
const theme = ref(true);
const activeIndex = ref("1");
const switchRef = ref();
const activeName = ref("");
const router = useRouter();
const routerArr = ref(router.getRoutes().filter((v) => v.path == "/"));

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const flag = routerArr.value.some((v) => v.path === to.path);
  if (!flag) routerArr.value.push(to);
  activeName.value = to.path;
  next();
});

const handleTabClick = (tab: any) => {
  router.push(tab.paneName);
};

const handleTabRemove = (tab: any) => {
  const index = routerArr.value.findIndex((v) => v.path === tab);
  routerArr.value.splice(index, 1);
  if (tab === activeName.value) router.push(routerArr.value[index - 1].path);
};

const changeTheme = (isDark: boolean) => {
  const classList = document.documentElement.classList;
  classList.remove(isDark ? "dark" : "light");
  classList.add(isDark ? "light" : "dark");
};
const updateView = (isDark: boolean) => {
  if (!document.startViewTransition) {
    changeTheme(isDark);
    return;
  }
  const transition = document.startViewTransition(() => {
    changeTheme(isDark);
  });
  transition.ready.then(() => {
    if (!switchRef.value) return;
    const { width, height, top, left } =
      switchRef.value.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: "ease-in",
        pseudoElement: isDark
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  });
};
</script>

<style scoped>
.app-views {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.header-views {
  display: flex;
  width: 100%;
}

.switch-change-theme {
  padding: 0 16px;
  border-bottom: 1px solid var(--el-menu-border-color);
  /* margin-left: auto; */
}
.content-views {
  flex: 1;
  overflow: hidden;
  padding: 16px;
}
</style>
