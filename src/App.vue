<template>
  <router-view />
</template>

<script setup>
  import { getCurrentInstance, onMounted } from "vue";
  import { useAuthStore } from "src/stores/auth-store";
  import { vAccess } from "src/directives/vAccess";
  import { useCulture } from "src/composables/useCulture";
  import { useQuasar } from "quasar";
  import { setQuasarInstance } from "src/helpers/fetch-wrapper";

  const authStore = useAuthStore();
  const $q = useQuasar();

  console.log(
    "%cSUPPORT: %cLANDA-SME.IR",
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

      // Register the v-access directive
      app.directive("access", vAccess);
    }

    // Set Quasar instance for fetch wrapper
    setQuasarInstance($q);

    authStore.checkUser();
    useCulture();
  });
</script>
