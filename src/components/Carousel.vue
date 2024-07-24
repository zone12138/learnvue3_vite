<template>
  <div
    class="xie-carousel xie-carousel--horizontal xie-carousel--card"
    @mouseleave.stop="handleMouseLeave"
    @mousemove.stop="throttledMouseMove"
    ref="carousel"
  >
    <div class="xie-carousel__container">
      <transition name="carousel-arrow-left">
        <button
          type="button"
          v-show="hover && (props.loop || activeIndex > 0) && showArrow"
          @click.stop="throttledArrowClick(activeIndex - 1)"
          class="xie-carousel__arrow xie-carousel__arrow--left"
        >
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>
      <transition name="carousel-arrow-right">
        <button
          type="button"
          v-show="
            hover && (props.loop || activeIndex < items.length - 1) && showArrow
          "
          @click.stop="throttledArrowClick(activeIndex + 1)"
          class="xie-carousel__arrow xie-carousel__arrow--right"
        >
          <i class="el-icon-arrow-right"></i>
        </button>
      </transition>
      <slot ref="slotContent"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import throttle from "lodash-es/throttle";

interface CompExposedFn {
  setFourthCardPosition: Function;
  translateItem: Function;
}

interface CarouselItemComp {
  exposed: CompExposedFn;
}

const props = defineProps({
  initialIndex: {
    type: Number,
    default: 0,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Number,
    default: 3000,
  },
  loop: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["change"]);

const Carousel_Column = 3;
let Carousel_Left = 0;
let Carousel_Right = 0;
let timer: number | null;

const carousel = ref<HTMLElement>();
const items = ref<CarouselItemComp[]>([]);
const activeIndex = ref(-1);
const hover = ref(false);
const operationInRight = ref(false);

const showArrow = computed(() => {
  return items.value.length > Carousel_Column;
});

watch(items, (val) => {
  if (val.length > 0) setActiveItem(props.initialIndex);
});

watch(activeIndex, (val, oldVal) => {
  resetItemPosition(oldVal);
  if (oldVal > -1) emit("change", val, oldVal);
});

watch(
  () => props.autoplay,
  (val) => {
    val ? startTimer() : pauseTimer();
  }
);

watch(
  () => props.loop,
  () => {
    setActiveItem(activeIndex.value);
  }
);

watch(
  () => props.interval,
  () => {
    pauseTimer();
    startTimer();
  }
);

watch(operationInRight, (val) => {
  if (items.value.length === Carousel_Column + 1) {
    items.value.forEach((v) => {
      v.exposed.setFourthCardPosition(val);
    });
  }
});

const handleMouseLeave = () => {
  hover.value = false;
  startTimer();
};

const resetItemPosition = (oldIndex: number) => {
  items.value.forEach((item, index) => {
    item.exposed.translateItem(index, activeIndex.value, oldIndex);
  });
};

const playSlides = () => {
  if (activeIndex.value < items.value.length - 1) {
    activeIndex.value++;
  } else if (props.loop) {
    activeIndex.value = 0;
  }
};

const pauseTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const startTimer = () => {
  if (props.interval <= 0 || !props.autoplay || timer) return;
  timer = window.setInterval(playSlides, props.interval);
};

const resetTimer = () => {
  pauseTimer();
  startTimer();
};

const setActiveItem = (index: number) => {
  // if (typeof index === "string") {
  //   const filteredItems = items.value.filter((item) => item.name === index);
  //   if (filteredItems.length > 0) {
  //     index = items.value.indexOf(filteredItems[0]);
  //   }
  // }
  index = Number(index);
  if (isNaN(index) || index !== Math.floor(index)) {
    console.warn("[Element Warn][Carousel]index must be an integer.");
    return;
  }
  let length = items.value.length;
  const oldIndex = activeIndex.value;
  if (index < 0) {
    activeIndex.value = props.loop ? length - 1 : 0;
  } else if (index >= length) {
    activeIndex.value = props.loop ? 0 : length - 1;
  } else {
    activeIndex.value = index;
  }
  if (oldIndex === activeIndex.value) {
    resetItemPosition(oldIndex);
  }
  resetTimer();
};

const calcElemPosition = () => {
  if (!carousel.value) return;
  const { left, right } = carousel.value.getBoundingClientRect();
  Carousel_Left = left;
  Carousel_Right = right;
};

const throttledArrowClick = throttle((index) => {
  setActiveItem(index);
}, 500);

const throttledMouseMove = throttle((e) => {
  const distance = 40;
  calcElemPosition();
  if (e.clientX < distance + Carousel_Left && e.clientX >= Carousel_Left) {
    hover.value = true;
    pauseTimer();
    operationInRight.value = false;
  } else if (
    e.clientX > Carousel_Right - distance &&
    e.clientX <= Carousel_Right
  ) {
    hover.value = true;
    operationInRight.value = true;
    pauseTimer();
  } else {
    hover.value = false;
  }
}, 500);
const collectChildComp = (comp: any) => {
  items.value.push(comp)
}

onMounted(() => {
  nextTick(() => {
    if (props.initialIndex < items.value.length && props.initialIndex >= 0) {
      activeIndex.value = props.initialIndex;
    }
    startTimer();
  });
});
onBeforeUnmount(pauseTimer);

provide("carouselData", {
  $el: carousel.value,
  items: items.value,
  column: Carousel_Column,
  loop: props.loop,
  operationInRight: operationInRight.value,
  collectChildComp
});
</script>

<style scoped>
.xie-carousel {
  position: relative;
  height: 100%;
  width: 100%;
}

.xie-carousel__container {
  position: relative;
  height: 100%;
  width: 100%;
}

.xie-carousel__arrow--left {
  left: 5px;
}
.xie-carousel__arrow--right {
  right: 5px;
}
.xie-carousel--horizontal {
  overflow-x: hidden;
}
.xie-carousel--vertical {
  overflow-y: hidden;
}

.xie-carousel__arrow {
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  height: 36px;
  width: 36px;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 50%;
  background-color: rgba(31, 45, 61, 0.11);
  color: #fff;
  position: absolute;
  top: 50%;
  z-index: 10;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
  font-size: 12px;
}

.xie-carousel__arrow:hover {
  background-color: rgba(31, 45, 61, 0.23);
}
.xie-carousel__arrow i {
  cursor: pointer;
}

.carousel-arrow-left-enter,
.carousel-arrow-left-leave-active {
  -webkit-transform: translateY(-50%) translateX(-10px);
  transform: translateY(-50%) translateX(-10px);
  opacity: 0;
}
.carousel-arrow-right-enter,
.carousel-arrow-right-leave-active {
  -webkit-transform: translateY(-50%) translateX(10px);
  transform: translateY(-50%) translateX(10px);
  opacity: 0;
}
</style>
