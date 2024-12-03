<template>
  <router-view />
</template>

<script setup>
  import { getCurrentInstance, onMounted } from "vue";

  console.log(
    "%cSUPPORT: %cLANDA-SME.COM",
    "color: white; font-family: sans-serif; font-size: 2.5em; font-weight: bolder; text-shadow: #000 1px 1px;",
    "color: #0088ff; font-family: sans-serif; font-size: 2.5em; font-weight: bolder; text-shadow: #000 1px 1px;"
  );

  onMounted(() => {
    const instance = getCurrentInstance();
    if (instance && instance.appContext) {
      const app = instance.appContext.app;
      app.config.warnHandler = (msg, instance, trace) => {
        // Suppress all warnings
        // Uncomment to log specific warnings:
        // console.warn(`Warning: ${msg}\nTrace: ${trace}`);
      };
    }
  });
</script>

<style lang="scss">
  ::-webkit-scrollbar {
    height: 12px;
    width: 14px;
    background: #00000010;
    z-index: 12;
    overflow: visible;
  }

  ::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: var(--q-primary);
    border-radius: 10px;
    z-index: 12;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    transition: background-color 0.32s ease-in-out;
    margin: 8px;
    min-height: 32px;
    min-width: 32px;

    &:hover {
      background: var(--q-primary);
    }
  }
</style>
