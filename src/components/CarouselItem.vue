<template>
  <div
    ref="carouselItem"
    v-show="ready"
    class="xie-carousel__item xie-carousel__item--card"
    :class="{
      'is-in-stage': inStage,
      'is-animating': animating,
      'is-in-stage-Sibling': isStageSibling,
      'is-in-stage-Sibling-dir': isStageSiblingDir,
      'is-duration-zero': isDurationZero,
      'is-active': active,
    }"
    :style="{
      ...itemStyle,
      '--width': itemsLength < 3 ? '50%' : '33.333%',
    }"
  >
    <div v-show="!active"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
interface Style {
  [key: string]: string;
}

interface CarouselData {
  $el: HTMLElement;
  items: Array<any>;
  column: number;
  loop: boolean;
  operationInRight: boolean;
  collectChildComp: Function;
}

defineOptions({ name: "ElCarouselItem" });

const carouselData: CarouselData = inject<CarouselData>(
  "carouselData",
  {} as CarouselData
);

let Transform_Scale = 1;
let carouseItemComp:any

const carouselItem = ref();
const translate = ref(0);
const active = ref(false);
const ready = ref(false);
const inStage = ref(false);
const animating = ref(false);
const isStageSibling = ref(false);
const isStageSiblingDir = ref(false);
const isDurationZero = ref(false);
const isRight = ref(true);


const itemStyle = computed(() => {
  const value = `translateX(${translate.value}%) scale(${Transform_Scale})`;
  const style = {
    transform: value,
  };
  return autoprefixer(style);
});

const itemsLength = computed(() => {
  return carouselData.items.length;
});

watch(itemsLength, (val) => {
  if (val == carouselData.column + 1) {
    carouselItem.value.addEventListener(
      "transitionstart",
      handleTransitionStart
    );
    carouselItem.value.addEventListener("transitionend", handleTransitionEnd);
  } else {
    carouselItem.value.removeEventListener(
      "transitionstart",
      handleTransitionStart
    );
    carouselItem.value.removeEventListener(
      "transitionend",
      handleTransitionEnd
    );
  }
});

const processIndex = (index: number, activeIndex: number, length: number) => {
  if (activeIndex === 0 && index === length - 1) {
    return -1;
  } else if (activeIndex === length - 1 && index === 0) {
    return length;
  } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
    return length + 1;
  } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
    return -2;
  }
  return index;
};

const calcCardTranslate = (index: number, activeIndex: number) => {
  // const parentWidth = carouselData.$el.offsetWidth;
  if (inStage.value) {
    return (index - activeIndex + 1) * 100;
    // return (parentWidth * (index - activeIndex + 1)) / 3
  } else if (index < activeIndex) {
    return -100;
    // return parentWidth / -3
    // return -(1 + CARD_SCALE) * parentWidth / 4;
  } else {
    return carouselData.column * 100;
    // return parentWidth
    // return -(1 + CARD_SCALE) * parentWidth / 4;
  }
};

const translateItem = (
  index: number,
  activeIndex: number,
  oldIndex: number
) => {
  const length = carouselData.items.length;
  judgeDirection(activeIndex, oldIndex, length);

  if (index !== activeIndex && length > 2 && carouselData.loop) {
    index = processIndex(index, activeIndex, length);
  }
  inStage.value = Math.round(Math.abs(index - activeIndex)) <= 1;
  active.value = index === activeIndex;
  calcStageSibling(activeIndex);
  if (itemsLength.value == carouselData.column + 1 && !inStage.value) {
    translate.value = !carouselData.operationInRight
      ? carouselData.column * 100
      : -100;
  } else if (itemsLength.value == 1) {
    translate.value = 50;
  } else {
    translate.value = calcCardTranslate(index, activeIndex);
  }
  // this.scale = this.active ? 1 : CARD_SCALE
  Transform_Scale = 1;
  ready.value = true;
};

const handleTransitionStart = () => {
  const isRight = carouselData.operationInRight;
  if (!inStage.value) {
    const translateValue = !isRight ? carouselData.column * 100 : -100;
    if (translateValue == translate.value) return;
    translate.value = translateValue;
  }
};
const handleTransitionEnd = () => {
  const isRight = carouselData.operationInRight;
  setFourthCardPosition(isRight);
};

const calcStageSibling = (activeIndex: number) => {
  const length = carouselData.items.length;
  if (length === 0) return;
  let index = 0;
  carouselData.items.forEach((item, i) => {
    console.log(toRaw(item).uid, carouseItemComp.uid);
    if (toRaw(item).uid == carouseItemComp.uid) index = i;
  });
  isStageSibling.value =
    index === (activeIndex + 2) % length ||
    (activeIndex - 2 + length) % length === index;
  if (length == carouselData.column + 2 || length == carouselData.column + 3) {
    if (!isRight.value && index === (activeIndex + 2) % length) {
      isStageSiblingDir.value = true;
    } else if (isRight.value && index === (activeIndex - 2 + length) % length) {
      isStageSiblingDir.value = true;
    } else {
      isStageSiblingDir.value = false;
    }
  }
};

const judgeDirection = (activeIndex: number, oldIndex = 0, length: number) => {
  isRight.value =
    activeIndex == oldIndex + 1 || activeIndex == oldIndex + 1 - length;
};

const setFourthCardPosition = (isRight: boolean) => {
  if (!inStage.value) {
    isDurationZero.value = true;
    translate.value = isRight ? carouselData.column * 100 : -100;
    window.setTimeout(() => {
      isDurationZero.value = false;
    }, 100);
  }
};
const autoprefixer = (style: Style) => {
  if (typeof style !== "object") return style;
  const rules = ["transform", "transition", "animation"];
  const prefixes = ["ms-", "webkit-"];
  rules.forEach((rule) => {
    const value = style[rule];
    if (rule && value) {
      prefixes.forEach((prefix) => {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};

onMounted(() => {
  carouseItemComp = getCurrentInstance();
  carouselData.collectChildComp(carouseItemComp)
});

onBeforeUnmount(() => {
  if (!carouselItem.value) return;
  carouselItem.value.removeEventListener(
    "transitionstart",
    handleTransitionStart
  );
  carouselItem.value.removeEventListener("transitionend", handleTransitionEnd);
});

defineExpose({
  name: 'ElCarouselItem',
  translateItem,
  setFourthCardPosition,
});
</script>

<style scoped>
.xie-carousel__item {
  /* background: black; */
}

.xie-carousel__item--card {
  /* width: 33.33%; */
  width: var(--width);
  padding: 0 5px;
  transition: transform 0.5s ease-in-out;
  /* transition: transform 5s ease-in-out; */
}

.xie-carousel__item--card.is-in-stage {
  z-index: 8;
}
.xie-carousel__item--card.is-in-stage-Sibling {
  z-index: 1;
}
.xie-carousel__item--card.is-in-stage-Sibling.is-in-stage-Sibling-dir {
  z-index: 2;
}

.xie-carousel__item--card.is-duration-zero {
  /* visibility: hidden; */
  transition-duration: 0s !important;
}

.xie-carousel__item {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
}
.xie-carousel__item {
  display: inline-block;
  overflow: hidden;
  z-index: 0;
}
/* .xie-carousel__item.is-active {
  z-index: 2;
} */
</style>
