<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, nextTick } from "vue";

  const canvas = ref(null);
  let ctx;
  let stack = [];
  let headerEl;
  let w, h;
  let animationFrameId;

  const randomColor = () => {
    const c = (l = 0, u = 255) =>
      Math.round(Math.random() * (u - l) + l);
    return `rgb(${c(60, 70)}, ${c(201, 250)}, ${c(120, 170)})`;
  };

  const anim = () => {
    let x = 0;
    // کمترین ارتفاع ممکن اما با رشد کامل
    const maxTall = Math.random() * 10 + 5; // ارتفاع نهایی خیلی کم (5-15px)
    const maxSize = Math.random() * 2.5 + 1; // عرض کم (1-3.5px)
    const speed = Math.random() * 1.5 + 0.8; // سرعت متوسط برای دیدن رشد
    const position = Math.random() * w - w / 2;
    const color = randomColor();

    return function drawSpring() {
      // رشد کامل از 0 تا maxTall
      const tall = Math.min(x / 1.5, maxTall); // رشد سریعتر برای رسیدن به maxTall
      const deviation = Math.cos(x / 20) * Math.min(tall / 4, 8); // انحراف متناسب با ارتفاع
      const size = Math.min(x / 30, maxSize); // رشد عرض
      x += speed;

      ctx.save();
      ctx.translate(w / 2 + position, h);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.quadraticCurveTo(-size, -tall / 2, deviation, -tall);
      ctx.quadraticCurveTo(size, -tall / 2, size, 0);
      ctx.fill();
      ctx.restore();
    };
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    stack.forEach((el) => el());
    animationFrameId = requestAnimationFrame(draw);
  };

  const resizeCanvas = () => {
    if (!headerEl) return;
    w = headerEl.clientWidth;
    h = headerEl.clientHeight;
    canvas.value.width = w;
    canvas.value.height = h;

    if (w > 0 && h > 0) {
      regenerateSprings();
    }
  };

  const regenerateSprings = () => {
    // تعداد مناسب برای هدر
    const springCount = Math.floor((w * h) / 600);
    stack = [];
    for (let i = 0; i < springCount; i++) {
      stack.push(anim());
    }
  };

  onMounted(async () => {
    await nextTick();
    headerEl = canvas.value.parentElement;
    ctx = canvas.value.getContext("2d");

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);
  });

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resizeCanvas);
  });
</script>

<style scoped>
  canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.8;
  }
</style>
