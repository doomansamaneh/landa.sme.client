<template>
  <div
    class="snow-container"
    :class="{ 'snow-container--dark': isDark }"
    aria-hidden="true"
  >
    <div
      v-for="(snowflake, index) in snowflakes"
      :key="`snow-${index}`"
      class="snowflake"
      :style="snowflake.style"
    >
      ❄
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted, watch } from "vue";
  import { useQuasar } from "quasar";

  const $q = useQuasar();
  const snowflakes = ref([]);
  let animationFrameId = null;

  const isDark = computed(() => $q.dark.isActive);

  const getSnowColor = () =>
    isDark.value
      ? "rgba(255,255,255,0.85)"
      : "rgba(180,200,255,0.8)";

  const createSnowflake = () => {
    const left = Math.random() * 100;
    const size = Math.random() * 8 + 8;
    const duration = Math.random() * 8 + 8;
    const delay = Math.random() * 5;
    const swayAmount = Math.random() * 40 + 20;

    return {
      style: {
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        color: getSnowColor(),
        "--sway": `${swayAmount}px`,
        textShadow: isDark.value
          ? "0 0 3px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.3)"
          : "0 0 3px rgba(180,200,255,0.5), 0 0 5px rgba(180,200,255,0.3)",
      },
    };
  };

  const generateSnowflakes = () => {
    const count = 50;
    snowflakes.value = Array.from({ length: count }, () =>
      createSnowflake(),
    );
  };

  const animate = () => {
    if (Math.random() < 0.01) {
      const index = Math.floor(
        Math.random() * snowflakes.value.length,
      );
      snowflakes.value[index] = createSnowflake();
    }
    animationFrameId = requestAnimationFrame(animate);
  };

  watch(isDark, () => {
    generateSnowflakes();
  });

  onMounted(() => {
    generateSnowflakes();
    animate();
  });

  onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  });
</script>

<style scoped>
  .snow-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 1;
  }

  .snowflake {
    position: absolute;
    top: -20px;
    user-select: none;
    animation-name: snowfall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
    line-height: 1;
    display: inline-block;
  }

  @keyframes snowfall {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(50vh) translateX(calc(var(--sway) * 0.7));
    }
    100% {
      transform: translateY(100vh) translateX(var(--sway));
    }
  }
</style>
