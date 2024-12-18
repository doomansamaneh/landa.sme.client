<template>
  <div v-if="label" class="q-mb-sm caption-on-dark no-letter-spacing">
    {{ label }}
  </div>

  <q-input
    v-model="modelValue"
    outlined
    dense
    clear-icon="clear"
    :type="type"
  >
    <template #prepend>
      <slot name="prepend" />
    </template>
    <template #append>
      <slot name="append" />
    </template>
  </q-input>
</template>

<script setup>
  import { ref, watch } from "vue";

  // Props
  const props = defineProps({
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text", // Default to 'text' for input type
    },
  });

  // Emit modelValue
  const emit = defineEmits(["update:modelValue"]);
  const modelValue = ref();

  // Watch for changes in modelValue and emit them
  watch(modelValue, (newValue) => {
    emit("update:modelValue", newValue);
  });
</script>

<!-- <template>
  <q-input v-model="model" outlined dense clear-icon="clear">
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup>
  const model = defineModel("value");
</script> -->
