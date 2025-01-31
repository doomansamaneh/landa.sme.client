<template>
  <router-view />
</template>

<script setup>
  import { getCurrentInstance, onMounted } from "vue";
  import { useAuthStore } from "src/stores/auth-store";

  const authStore = useAuthStore();

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
    authStore.checkUser();
  });
</script>
