<template>
  <q-card-section class="q-gutter-y-md">
    <div class="row">
      <div class="col-auto q-mr-sm">
        <span class="text-body3">گروه:</span>
      </div>
      <div class="text-body3">
        {{ item?.productGroupTitle }}
      </div>
    </div>

    <div class="row">
      <div class="col-auto q-mr-sm">
        <span class="text-body3">کالا:</span>
      </div>
      <div class="text-body2 text-bold">
        {{ item?.code }} / {{ item?.title }}
      </div>
    </div>

    <div v-if="item?.taxCode" class="row">
      <div class="col-auto q-mr-sm">
        <span class="text-body3">شناسه مالیاتی:</span>
      </div>
      <div class="text-body2">
        {{ item?.taxCode }}
      </div>
    </div>

    <div class="row">
      <div class="col-auto q-mr-sm">
        <span class="text-body3">موجودی اول دوره:</span>
      </div>
      <div class="text-body2 text-bold">
        {{ item?.openingStock?.toLocaleString() }}
      </div>
    </div>
  </q-card-section>
</template>

<script setup>
  const props = defineProps({
    item: Object,
  });
</script>
