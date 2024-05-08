<template>
  <q-card class="bordered">
    <q-card-section class="row items-center justify-between">
      <q-toggle
        dense
        size="40px"
        class="text-body2 no-letter-spacing"
        label="نمایش موجودی صفر"
        left-label
        v-model="searchModel.showZeroStock"
        @update:model-value="applySearch"
      />
      <q-btn
        @click="expanded = !expanded"
        padding="6px 12px"
        rounded
        unelevated
        dense
        class="no-pointer-events text-body2 no-letter-spacing"
      >
        <span class="text-body2 no-letter-spacing">
          {{ $t("shared.labels.advancedSearch") }}
        </span>
      </q-btn>
    </q-card-section>

    <q-card-section class="row q-pa-none">
      <q-slide-transition v-show="expanded"></q-slide-transition>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { bus } from "src/helpers";

  const props = defineProps({
    gridStore: Object,
  });

  const expanded = ref(false);

  const searchModel = computed(
    () => props.gridStore.state.searchModel.value
  );

  const applySearch = async () => {
    bus.emit("apply-search");
  };
</script>
