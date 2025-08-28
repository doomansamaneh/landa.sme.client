<template>
  <q-card-section class="q-gutter-y-md">
    <div class="row">
      <div class="col-auto q-mr-sm">
        <span class="text-body3">
          {{ $t("shared.labels.group") }}:
        </span>
      </div>
      <div class="text-body3">
        {{ item?.productGroupTitle }}
      </div>
    </div>

    <div class="row">
      <div class="col-auto q-mr-sm">
        <span class="text-body3">
          {{ $t("shared.labels.productTitle") }}:
        </span>
      </div>
      <div class="text-body2 text-bold">
        {{ item?.code }} / {{ item?.title }}
      </div>
    </div>

    <div v-if="item?.taxCode" class="row">
      <div class="col-auto q-mr-sm">
        <span class="text-body3">
          {{ $t("shared.labels.taxCode") }}:
        </span>
      </div>
      <div class="text-body2">
        {{ item?.taxCode }}
      </div>
    </div>

    <div class="row">
      <div class="col-auto q-mr-sm">
        <span class="text-body3">
          {{ $t("shared.columns.openingQuantity") }}:
        </span>
      </div>
      <div class="text-body2 text-bold">
        {{ item?.openingQuantity?.toLocaleString() }}
      </div>
    </div>
  </q-card-section>
</template>

<script setup>
  const props = defineProps({
    item: Object,
  });
</script>
