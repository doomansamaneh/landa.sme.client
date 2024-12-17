<template>
  <div
    v-if="$q.screen.gt.xs"
    class="row items-center justify-between q-mb-md"
  >
    <div class="text-h6 text-weight-700 no-letter-spacing">
      {{ title }}
    </div>
    <back-button />
  </div>

  <mobile v-else :title="title" back-button />
</template>

<script setup>
  import { ref } from "vue";

  import Mobile from "src/components/shared/FormToolBarMobile.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";

  const props = defineProps({
    title: String,
  });
</script>
