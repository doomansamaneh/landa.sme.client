<template>
  <div v-if="store.state.value?.length > 0" class="q-gutter-xs">
    <template v-for="item in store.state.value" :key="item.id">
      <q-chip
        removable
        @remove="store.removeItem(item)"
        color="primary"
        text-color="white"
        :icon="icon"
      >
        {{ $t(`shared.${keyType}.${item.type}`) }}:
        {{ item.title }}
      </q-chip>
    </template>
  </div>
</template>

<script setup>

  const props = defineProps({
    icon: String,
    store: Object,
    keyType: String
  });
</script>
