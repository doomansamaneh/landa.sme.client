<template>
  <menu-button
    icon="o_delete"
    :title="$t('shared.labels.delete')"
    @clik="click"
  >
    <template #append v-if="badgeCount">
      <q-badge floating>
        {{ badgeCount }}
      </q-badge>
    </template>
  </menu-button>
</template>
<script setup>
  import MenuButton from "./MenuButton.vue";

  const props = defineProps({
    badgeCount: Number,
  });

  const emits = defineEmits("click");
  const click = () => {
    emits("click");
  };
</script>
