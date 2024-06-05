<template>
  <q-card flat bordered>
    <q-card-section :class="`bg-${item.color} text-white`">
      <h6>{{ item.header }}</h6>
    </q-card-section>
    <q-separator />
    <q-card-section></q-card-section>
  </q-card>
</template>

<script setup>
  import { helper } from "src/helpers";

  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    item: Object,
  });
</script>
