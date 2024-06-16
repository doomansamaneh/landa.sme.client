<template>
  <div v-if="formStore.model?.value?.wageItems?.length === 0">
    <q-btn
      class="q-my-lg primary-gradient primary-shadow"
      :rounded="$q.screen.gt.xs"
      :round="$q.screen.xs"
      :size="$q.screen.gt.xs ? '' : '11px'"
      unelevated
      text-color="white"
      @click="formStore.pushNewRow()"
    >
      <q-icon name="o_add" size="20px" :class="$q.screen.gt.xs ? 'q-mr-xs' : ''" />
      <div v-if="$q.screen.gt.xs">افزودن ردیف</div>
    </q-btn>
  </div>
  <template
    v-else
    v-for="(item, index) in formStore.model.value.wageItems"
    :key="index"
  >
    <wage-item
      class="q-my-md"
      :index="index"
      :item="item"
      :form-store="formStore"
    />
  </template>
</template>

<script setup>
  import WageItem from "./WageItem.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
