<!--
 * @Author: xie 1459547902@qq.com
 * @Date: 2024-07-22 09:41:22
 * @LastEditors: xie 1459547902@qq.com
 * @LastEditTime: 2024-07-26 14:40:43
 * @FilePath: \learnvue3_vite\src\views\About.vue
 * @Description: About.vue
-->
<template>
  <div ref="container">
    <div class="relative">
      <span class="label">故事：</span>
      <span>
        这一年，村里遭遇了罕见的旱灾，庄稼收成极差。主人家的日子过得愈发艰难，到了播种的季节，却没有足够的钱购买新的耕犁。
        老牛看着主人忧愁的面容，心中暗暗做了一个决定。它拖着那副略显疲惫的身躯，套上了破旧的犁具，准备独自去开垦那片干旱坚硬的土地。
        一开始，老牛每前进一步都十分艰难，它喘着粗气，汗水不断地流淌。但它没有放弃，一步一步，艰难地向前。
        村里的其他动物看到老牛如此辛苦，都劝它：“别白费力气了，这片地太干太硬，你是做不到的。”老牛只是摇摇头，继续埋头苦干。
        经过几天的努力，老牛终于开垦出了一片可以播种的土地。主人惊喜不已，赶忙播下了种子。
        在老牛的坚持下，最终迎来了丰收。老牛看着满仓的粮食，疲惫的脸上露出了欣慰的笑容。
        老牛用它的坚持，为这个家带来了希望和幸福，也让所有人都对它充满了敬佩。
      </span>
    </div>
    <br />
    <div class="relative">
      <span class="label">故事再说一次：</span>
      <span>
        这一年，村里遭遇了罕见的旱灾，庄稼收成极差。主人家的日子过得愈发艰难，到了播种的季节，却没有足够的钱购买新的耕犁。
        老牛看着主人忧愁的面容，心中暗暗做了一个决定。它拖着那副略显疲惫的身躯，套上了破旧的犁具，准备独自去开垦那片干旱坚硬的土地。
        一开始，老牛每前进一步都十分艰难，它喘着粗气，汗水不断地流淌。但它没有放弃，一步一步，艰难地向前。
        村里的其他动物看到老牛如此辛苦，都劝它：“别白费力气了，这片地太干太硬，你是做不到的。”老牛只是摇摇头，继续埋头苦干。
        经过几天的努力，老牛终于开垦出了一片可以播种的土地。主人惊喜不已，赶忙播下了种子。
        在老牛的坚持下，最终迎来了丰收。老牛看着满仓的粮食，疲惫的脸上露出了欣慰的笑容。
        老牛用它的坚持，为这个家带来了希望和幸福，也让所有人都对它充满了敬佩。
      </span>
    </div>
    <div ref="yyyyy">yyyyyy</div>

    <input v-model="input" placeholder="" />

    <el-button type="primary" @click="handleEditClass">修改class</el-button>
    <el-button type="primary" @click="handleAddAttr">添加Attr</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useSupported, useMounted, useMutationObserver } from "@vueuse/core";
const container = ref();
const input = ref("input");
const yyyyy = ref();
const isSupported = useSupported(() => container.value);
const isMounted = useMounted();

let aaa = 'ppppp'

console.log("==========  Setup  ==========");
console.log("isSupported: ", isSupported.value);
console.log("isMounted: ", isMounted.value);

onScopeDispose(() => {
  console.log("==========  onScopeDispose  ==========");
});

onUnmounted(() => {
  console.log("==========  onUnmounted  ==========");
});

const watchYYYYY = watch(() => [toValue(input), aaa], ([val, aVal]) => {
  console.log(aaa, aVal, "watchYYYYY");
  console.log(input.value, val, "watchYYYYY");
});

const handleEditClass = () => {
  if (!container.value) return;
  container.value.children[0].classList.add("dark");
  watchYYYYY();
};


const handleAddAttr = () => {
  if (!container.value) return;
  container.value.children[0].setAttribute("data-wwww", "11");
  yyyyy.value.innerText = "iiii";

  aaa = 'OOOOOO'
};

onMounted(() => {
  console.log("==========  Mounted  ==========");
  console.log("isSupported: ", isSupported.value);
  console.log("isMounted: ", isMounted.value);

  console.log(toValue(container).$el);
  console.log(toValue(input))
  console.log(toValue(input))

  if (!container.value) return;
  useMutationObserver(
    container.value,
    (mutations) => {
      console.log(mutations);
    },
    {
      childList: true,
      characterData: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true,
      attributeFilter: ["class"],
    }
  );
});
</script>

<style lang="scss" scoped>
.relative {
  position: relative;

  .label {
    display: inline-block;
    width: 130px;
  }
}
</style>
