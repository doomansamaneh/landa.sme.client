<template>
  <Teleport to="body">
    <div class="snow-container" aria-hidden="true">
      <div
        v-for="(snowflake, index) in snowflakes"
        :key="`snow-${index}`"
        class="snowflake"
        :style="snowflake.style"
      >
        ❄
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from "vue";

  const snowflakes = ref([]);
  let animationFrameId = null;

  const createSnowflake = () => {
    const left = Math.random() * 100;
    const size = Math.random() * 10 + 5;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    const opacity = Math.random() * 0.5 + 0.5;
    const swayAmount = Math.random() * 30 + 10;

    return {
      style: {
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity: opacity,
        "--sway": `${swayAmount}px`,
        "--fall-duration": `${duration}s`,
      },
    };
  };

  const generateSnowflakes = () => {
    const count = 50; // Number of snowflakes
    snowflakes.value = Array.from({ length: count }, () =>
      createSnowflake()
    );
  };

  const animate = () => {
    // Regenerate snowflakes periodically for continuous effect
    if (Math.random() < 0.01) {
      const index = Math.floor(
        Math.random() * snowflakes.value.length
      );
      snowflakes.value[index] = createSnowflake();
    }
    animationFrameId = requestAnimationFrame(animate);
  };

  onMounted(() => {
    generateSnowflakes();
    animate();
  });

  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
</script>

<style scoped>
  .snow-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 2147483647;
    overflow: hidden;
  }

  .snowflake {
    position: absolute;
    top: -20px;
    color: #ffffff;
    user-select: none;
    animation-name: snowfall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.9),
      0 0 6px rgba(255, 255, 255, 0.6);
    will-change: transform;
    line-height: 1;
    display: inline-block;
  }

  @keyframes snowfall {
    0% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(25vh)
        translateX(calc(var(--sway, 20px) * 0.5));
    }
    50% {
      transform: translateY(50vh) translateX(var(--sway, 20px));
    }
    75% {
      transform: translateY(75vh)
        translateX(calc(var(--sway, 20px) * 0.5));
    }
    100% {
      transform: translateY(100vh) translateX(0);
    }
  }
</style>
