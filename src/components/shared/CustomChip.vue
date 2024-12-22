<template>
  <div v-if="reviewStore.state.value?.length > 0" class="q-gutter-xs">
    <template v-for="item in reviewStore.state.value" :key="item.id">
      <q-chip
        removable
        @remove="reviewStore.removeItem(item)"
        color="primary"
        text-color="white"
        :icon="icon"
      >
        {{ $t(`shared.accountTreeType.${item.type}`) }}:
        {{ item.title }}
      </q-chip>
    </template>
  </div>
</template>

<script setup>
  import { useAccountReview } from "src/components/areas/acc/_composables/useAccountReview";

  const props = defineProps({
    icon: String,
    reviewStore: useAccountReview,
  });
</script>
