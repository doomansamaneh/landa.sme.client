<template>
  <q-tooltip
    :model-value="showTooltip"
    class="tooltip bg-transparent q-pa-none"
    :class="`tooltip-arrow-${arrowClass}`"
    no-parent-event
    ref="tooltipRef"
    @show="onShow"
  >
    <div
      class="tooltip-text text-body2 relative-position"
      :class="`bg-${bgColor} text-${color}`"
    >
      <div class="flex no-wrap">
        <div class="q-mr-xs" style="font-size: 16px; margin-top: 2px">
          💡
        </div>
        <slot />
      </div>
      <q-icon
        v-if="closeable"
        @click="closeTooltip"
        class="tooltip-close absolute-top-right q-pa-xs cursor-pointer q-field__focusable-action"
        name="close"
        size="14px"
        flat
        round
        dense
      />
    </div>
    <div class="tooltip-arrow absolute" :class="`bg-${bgColor}`" />
  </q-tooltip>
</template>

<script setup>
  import { computed, ref, onMounted, onUnmounted } from "vue";

  /*
    props
  */
  const props = defineProps({
    arrow: {
      type: String,
      default: "top",
    },
    duration: {
      type: Number,
      default: null,
    },
    delay: {
      type: Number,
      default: 1000,
    },
    closeable: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: "primary",
    },
    color: {
      type: String,
      default: "white",
    },
  });

  /*
    reusables
  */
  const tooltipRef = ref(null);
  const showTooltip = ref(false);

  /*
    handle delay
  */
  if (props.delay > 0) {
    setTimeout(() => {
      showTooltip.value = true;
    }, props.delay);
  } else {
    showTooltip.value = true;
  }

  /*
    arrow class
  */
  const arrowClass = computed(() => {
    let arrowClassCorrected = props.arrow.replace(" ", "-");
    let allowedClasses = [
      "top",
      "top-left",
      "top-right",
      "bottom",
      "bottom-left",
      "bottom-right",
      "left",
      "left-top",
      "left-bottom",
      "right",
      "right-top",
      "right-bottom",
    ];
    if (!allowedClasses.includes(arrowClassCorrected)) {
      console.error(
        `Value "${arrowClassCorrected}" not allowed for "arrow" prop. Use one of these: `,
        allowedClasses
      );
      return "top";
    }

    return props.arrow.replace(" ", "-");
  });

  /*
    event - onShow
  */
  const onShow = () => {
    if (props.duration) {
      setTimeout(() => {
        tooltipRef.value.hide();
      }, props.duration);
    }
  };

  /*
    close tooltip
  */
  const closeTooltip = () => {
    tooltipRef.value.hide();
  };

  /*
    handle scroll events to hide tooltip
  */
  const handleScroll = () => {
    if (showTooltip.value) {
      closeTooltip();
    }
  };

  /*
    handle wheel events to hide tooltip
  */
  const handleWheel = () => {
    if (showTooltip.value) {
      closeTooltip();
    }
  };

  /*
    handle click events on parent to hide tooltip
  */
  const handleParentClick = (event) => {
    if (showTooltip.value) {
      closeTooltip();
    }
  };

  /*
    update position
  */
  const updatePosition = () => {
    tooltipRef.value?.updatePosition();
  };

  onMounted(() => {
    updatePosition();
    // Add scroll and wheel event listeners to hide tooltip on any scroll action
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    document.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("wheel", handleWheel, {
      passive: true,
      capture: true,
    });
    document.addEventListener("wheel", handleWheel, {
      passive: true,
      capture: true,
    });

    // Add click event listener to parent element to hide tooltip
    const parentElement = tooltipRef.value?.$el?.parentElement;
    if (parentElement) {
      parentElement.addEventListener("click", handleParentClick, {
        passive: true,
        capture: true,
      });
    }

    // Also listen to scroll events on common scrollable containers
    const scrollableElements = document.querySelectorAll(
      '.q-scrollarea, .scroll, .scrollable, [style*="overflow"]'
    );
    scrollableElements.forEach((element) => {
      element.addEventListener("scroll", handleScroll, {
        passive: true,
        capture: true,
      });
    });
  });

  onUnmounted(() => {
    // Clean up scroll and wheel event listeners
    window.removeEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    document.removeEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    window.removeEventListener("wheel", handleWheel, {
      passive: true,
      capture: true,
    });
    document.removeEventListener("wheel", handleWheel, {
      passive: true,
      capture: true,
    });

    // Clean up parent click event listener
    const parentElement = tooltipRef.value?.$el?.parentElement;
    if (parentElement) {
      parentElement.removeEventListener("click", handleParentClick, {
        passive: true,
        capture: true,
      });
    }

    // Clean up scrollable elements listeners
    const scrollableElements = document.querySelectorAll(
      '.q-scrollarea, .scroll, .scrollable, [style*="overflow"]'
    );
    scrollableElements.forEach((element) => {
      element.removeEventListener("scroll", handleScroll, {
        passive: true,
        capture: true,
      });
    });
  });

  /*
    expose methods
  */
  defineExpose({
    updatePosition,
    closeTooltip,
  });
</script>

<style lang="scss">
  .tooltip {
    overflow: visible;
    border-radius: 10px;
    &-text {
      z-index: 10;
      padding: 16px 24px 16px 10px;
      border-radius: 4px;
      margin-top: -3px;
    }
    &-arrow {
      z-index: 1;
      width: 30px;
      height: 30px;
      transform: translateX(-50%) rotate(-45deg) skew(-20deg, -20deg);

      // top arrows
      [class*="tooltip-arrow-top"] & {
        top: 0px;
      }
      .tooltip-arrow-top & {
        left: 50%;
      }
      .tooltip-arrow-top-left & {
        left: 30px;
      }
      .tooltip-arrow-top-right & {
        right: 0px;
      }

      // bottom arrows
      [class*="tooltip-arrow-bottom"] & {
        bottom: 0px;
      }
      .tooltip-arrow-bottom & {
        left: 50%;
      }
      .tooltip-arrow-bottom-left & {
        left: 30px;
      }
      .tooltip-arrow-bottom-right & {
        right: 0px;
      }

      // left arrows
      [class*="tooltip-arrow-left"] & {
        transform: translateY(-50%) rotate(45deg) skew(-20deg, -20deg);
        left: 0px;
      }
      .tooltip-arrow-left & {
        top: 50%;
      }
      .tooltip-arrow-left-top & {
        top: 20px;
      }
      .tooltip-arrow-left-bottom & {
        bottom: -10px;
      }

      // right arrows
      [class*="tooltip-arrow-right"] & {
        transform: translateY(-50%) rotate(45deg) skew(-20deg, -20deg);
        right: 0px;
      }
      .tooltip-arrow-right & {
        top: 50%;
      }
      .tooltip-arrow-right-top & {
        top: 20px;
      }
      .tooltip-arrow-right-bottom & {
        bottom: -10px;
      }
    }

    // close button
    &-close {
      pointer-events: all !important;
    }
  }
</style>
