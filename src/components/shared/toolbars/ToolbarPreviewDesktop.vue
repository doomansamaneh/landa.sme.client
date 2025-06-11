<template>
  <div :style="toolbarMargin">
    <q-page-sticky
      class="bg-main z-1"
      :style="inside"
      position="top"
      expand
      :class="isAtTop || inside ? '' : 'toolbar-glass-effect_'"
    >
      <q-toolbar
        :style="[
          inside ? '' : 'margin-top: 6px; margin-bottom: 6px;',
          xPadding,
        ]"
      >
        <back-button v-if="backButton" class="q-ml-md" />
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useQuasar } from "quasar";

  import BackButton from "src/components/shared/buttons/GoBackLink.vue";

  const $q = useQuasar();

  const isAtTop = ref(true);
  const itemsNumber = ref(false);

  const props = defineProps({
    title: String,
    backButton: Boolean,
    inside: Boolean,
    margin: Boolean,
    menuteItem: { type: Array, default: [] },
  });

  const toolbarMargin = computed(() => {
    const baseMargin = $q.screen.lt.md
      ? "margin-bottom: 56px;"
      : "margin-bottom: 34px;";
    const margin = $q.screen.lt.sm ? "margin-bottom: 34px;" : "";
    return props.margin ? baseMargin : margin;
  });

  const xPadding = computed(() => {
    return props.inside
      ? "padding: 0 0 16px 0"
      : $q.screen.gt.sm
      ? "padding-left: 38px; padding-right: 38px;"
      : "padding-left: 20px; padding-right: 20px;";
  });

  const inside = computed(() => {
    if (props.inside) {
      return "background: transparent; transform: 0px; z-index: 0; right: 0; position: relative;";
    } else {
      return "";
    }
  });

  const handleScroll = () => {
    const currentPosition =
      window.scrollY || document.documentElement.scrollTop;
    isAtTop.value = currentPosition === 0;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>
