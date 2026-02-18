<template>
  <div
    v-if="formStore.model?.value?.wageItems?.length === 0"
    class="text-center_"
  >
    <q-btn
      no-caps
      class="q-my-xl primary-shadow"
      rounded
      unelevated
      color="primary"
      @click="formStore.pushNewRow()"
    >
      <q-icon name="o_add" size="20px" class="q-mr-xs" />
      {{ $t("shared.labels.addPersonnel") }}
    </q-btn>
  </div>
  <template
    v-else
    v-for="(item, index) in formStore.model.value.wageItems"
    :key="index"
  >
    <wage-item :index="index" :item="item" :form-store="formStore" />
  </template>
</template>

<script setup>
  import { useWageModel } from "src/components/areas/prl/_composables/useWageModel";
  import WageItem from "./WageItem.vue";

  const props = defineProps({
    formStore: useWageModel,
  });
</script>
