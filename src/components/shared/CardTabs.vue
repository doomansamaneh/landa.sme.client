<template>
  <div class="row justify-between overflow-hidden primary-gradient-1">
    <q-tabs
      v-model="currentTab"
      :indicator-color="indicatorColor"
      :active-color="activeColor"
      align="left"
      inline-label
      narrow-indicator
      @update:model-value="onTabChanged"
      :content-class="contentClass"
    >
      <slot></slot>
    </q-tabs>
  </div>

  <q-separator size="1px" />
</template>

<script setup>
  import { ref, watch } from "vue";

  const props = defineProps({
    modelValue: {
      type: String,
      default: null,
    },
    indicatorColor: {
      type: String,
      default: "primary",
    },
    activeColor: {
      type: String,
      default: "primary",
    },
    contentClass: {
      type: String,
      default: "text-on-dark",
    },
  });

  const emit = defineEmits(["update:model-value", "tabChanged"]);

  const currentTab = ref(props.modelValue);

  watch(
    () => props.modelValue,
    (newVal) => {
      currentTab.value = newVal;
    }
  );

  watch(
    () => currentTab.value,
    (newVal) => {
      emit("update:model-value", newVal);
      emit("tabChanged", newVal);
    }
  );

  function onTabChanged(val) {
    currentTab.value = val;
  }
</script>
