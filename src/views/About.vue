<template>
  <div>
    <span>{{ count }}</span>
    <el-button type="primary" @click="handleClick" v-permission="true">
      测试
    </el-button>
  </div>
</template>

<script lang="ts" setup>
const count = ref(0);
const handleClick = () => {
  // ElMessage.success("测试成功");
  count.value++;
};

onBeforeMount(() => {
  console.log("onBeforeMount");
})

onMounted(() => {
  console.log("onMounted");
})

onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
})

onUpdated(() => {
  console.log("onUpdated");
})

onBeforeUnmount(() => {
  console.log("onBeforeUnmount");
})

onUnmounted(() => {
  console.log("onUnmounted");
})

const vPermission = {
  mounted(el: HTMLButtonElement, binding: any) {
    if (!binding.value) {
      el.disabled = true;
      el.classList.add("is-disabled");
    }
  },
};
</script>

<style lang="scss" scoped></style>
