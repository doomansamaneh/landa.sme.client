<template>
  <q-input
    :model-value="formatNumber(modelValue)"
    outlined
    dense
    clear-icon="clear"
    input-class="text-right"
    @update:model-value="updateModel"
  >
    <!-- <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template> -->
    <template #append>
      <slot name="append"> </slot>
    </template>
  </q-input>
</template>

<script setup>
import { helper } from "src/helpers";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const formatNumber = (number) => {
  if (!number && number !== 0) return "0";
  return helper.parseNumber(number).toLocaleString();
};

const updateModel = (value) => {
  const sanitizedValue = value.toString().replace(/[^\d.]/g, "");
  emit("update:modelValue", helper.parseNumber(sanitizedValue));
};
</script>
