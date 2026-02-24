<template>
  <div ref="wrapper" class="rain-wrapper">
    <canvas ref="rainCanvas" class="rain-canvas"></canvas>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
  import { useQuasar } from "quasar";

  const $q = useQuasar();

  const rainCanvas = ref(null);
  const wrapper = ref(null);
  let animationId;

  const dropCount = 100;
  const drops = [];
  const splashes = [];

  const getDropColor = () =>
    $q.dark.isActive ? "255,255,255" : "180,200,255";
  const getDropOpacity = () => ($q.dark.isActive ? 0.15 : 0.45);

  const getSplashColor = () =>
    $q.dark.isActive ? "255,255,255" : "180,200,255";
  const getSplashOpacity = () => ($q.dark.isActive ? 0.3 : 0.45);

  const initDrops = (width, height) => {
    drops.length = 0;
    splashes.length = 0;
    for (let i = 0; i < dropCount; i++) {
      const speed = 2 + Math.random();
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 15 + Math.random() * 5,
        speed,
        angle: (Math.random() - 0.5) * 0.05,
        color: getDropColor(),
        opacity: getDropOpacity() + Math.random() * 0.1,
      });
    }
  };

  const draw = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";

    for (let drop of drops) {
      ctx.strokeStyle = `rgba(${drop.color},${drop.opacity})`;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(
        drop.x + drop.length * drop.angle,
        drop.y + drop.length,
      );
      ctx.stroke();

      drop.y += drop.speed;
      drop.x += drop.speed * drop.angle;

      if (drop.y > height) {
        splashes.push({
          x: drop.x,
          y: height,
          radius: Math.random() * 4 + 2,
          alpha: getSplashOpacity() + Math.random() * 0.05,
          decay: 0.05 + Math.random() * 0.05,
          color: getSplashColor(),
        });

        drop.y = -drop.length;
        drop.x = Math.random() * width;
        drop.angle = (Math.random() - 0.5) * 0.05;
        drop.speed = 2 + Math.random();
        drop.length = 15 + Math.random() * 5;
        drop.opacity = getDropOpacity() + Math.random() * 0.1;
        drop.color = getDropColor();
      }
    }

    for (let i = splashes.length - 1; i >= 0; i--) {
      const s = splashes[i];
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${s.color},${s.alpha})`;
      ctx.moveTo(s.x - s.radius, s.y);
      ctx.lineTo(s.x + s.radius, s.y);
      ctx.stroke();

      s.alpha -= s.decay;
      if (s.alpha <= 0) splashes.splice(i, 1);
    }
  };

  const animate = () => {
    const canvas = rainCanvas.value;
    const wrap = wrapper.value;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    const width = (canvas.width = wrap.offsetWidth);
    const height = (canvas.height = wrap.offsetHeight);

    draw(ctx, width, height);
    animationId = requestAnimationFrame(animate);
  };

  onMounted(() => {
    nextTick(() => {
      const wrap = wrapper.value;
      if (!wrap) return;
      initDrops(wrap.offsetWidth, wrap.offsetHeight);
      animate();

      window.addEventListener("resize", () => {
        if (!wrap) return;
        initDrops(wrap.offsetWidth, wrap.offsetHeight);
      });
    });
  });

  onUnmounted(() => {
    cancelAnimationFrame(animationId);
  });

  watch(
    () => $q.dark.isActive,
    () => {
      for (let drop of drops) {
        drop.color = getDropColor();
        drop.opacity = getDropOpacity() + Math.random() * 0.1;
      }
      for (let s of splashes) {
        s.color = getSplashColor();
        s.alpha = getSplashOpacity() + Math.random() * 0.05;
      }
    },
  );
</script>

<style scoped>
  .rain-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 5;
  }

  .rain-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
