<template>
  <sheet-item icon="o_delete" :title="$t('shared.labels.delete')">
    <template #avatar>
      <q-avatar text-color="red-8" class="bg-on-dark">
        <q-icon name="o_delete" />
      </q-avatar>
    </template>
  </sheet-item>
</template>
<script setup>
  import SheetItem from "./MenuItem.vue";
</script>
