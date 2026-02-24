<template>
  <div id="leaves" aria-hidden="true">
    <i v-for="n in 15" :key="n"></i>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";

  onMounted(() => {
    const leaves = document.querySelectorAll("#leaves i");

    leaves.forEach((leaf) => {
      const left = Math.random() * 100;
      const size = Math.random() * 6 + 10; // 10px – 16px
      const duration = Math.random() * 10 + 10; // 10s – 20s (slow & smooth)
      const delay = Math.random() * 8;

      leaf.style.left = `${left}%`;
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size * 0.7}px`;
      leaf.style.animationDuration = `${duration}s`;
      leaf.style.animationDelay = `${delay}s`;
    });
  });
</script>

<style scoped lang="scss">
  #leaves {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 5;
  }

  #leaves i {
    position: absolute;
    top: -40px;
    background: linear-gradient(to bottom right, #8fae1b, #4a6b0f);
    border-radius: 40% 10% 40% 10%;
    opacity: 0.75;
    animation-name: falling;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    will-change: transform;
  }

  /* variation */
  #leaves i:nth-child(3n) {
    background: linear-gradient(to bottom right, #c29b2e, #7a5b14);
  }

  #leaves i:nth-child(4n) {
    background: linear-gradient(to bottom right, #a65a1e, #6b3410);
    opacity: 0.6;
  }

  /* stem */
  #leaves i::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 60%;
    background: rgba(0, 0, 0, 0.2);
    left: 50%;
    top: 20%;
    transform: translateX(-50%) rotate(20deg);
    border-radius: 50%;
  }

  /* animation */
  @keyframes falling {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
      opacity: 0;
    }

    10% {
      opacity: 0.8;
    }

    100% {
      transform: translateY(120vh) translateX(-60px) rotate(360deg);
      opacity: 0;
    }
  }
</style>
