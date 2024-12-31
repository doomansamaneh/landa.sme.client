<template>
  <q-card-section class="q-gutter-y-md">
    <div class="row">
      <div class="col-1">
        <span class="text-body3 no-letter-spacing">گروه:</span>
      </div>
      <div class="text-body3 no-letter-spacing">
        {{ item?.productGroupTitle }}
      </div>
    </div>

    <div class="row">
      <div class="col-1">
        <span class="text-body3 no-letter-spacing">کالا:</span>
      </div>
      <div class="text-body2 text-bold no-letter-spacing">
        {{ item?.code }} / {{ item?.title }}
      </div>
    </div>

    <div v-if="item?.taxCode" class="row">
      <div class="col-1">
        <span class="text-body3 no-letter-spacing">
          شناسه مالیاتی:
        </span>
      </div>
      <div class="text-body2 no-letter-spacing">
        {{ item?.taxCode }}
      </div>
    </div>

    <div class="row">
      <div class="col-1">
        <span class="text-body3 no-letter-spacing">
          موجودی اول دوره:
        </span>
      </div>
      <div class="text-body2 text-bold no-letter-spacing">
        {{ item?.openomgStock?.toLocaleString() }}
      </div>
    </div>
  </q-card-section>
</template>

<script setup>
  const props = defineProps({
    item: Object,
  });
</script>
