<template>
  <div class="row q-py-lg q-gutter-sm">
    <q-btn color="primary" padding="4px 12px" unelevated>
      <q-icon name="o_add" size="xs" class="q-mr-xs" />
      <span>دریافت</span>
    </q-btn>

    <q-btn color="primary" padding="4px 12px" unelevated>
      <q-icon name="o_check" size="xs" class="q-mr-xs" />
      <span>تسویه حساب</span>
    </q-btn>

    <q-btn color="primary" padding="4px 12px" unelevated flat>
      <q-icon name="o_description" size="xs" class="q-mr-xs" />
      <span>سند حسابداری</span>
    </q-btn>
  </div>

  <div class="row text-body3 q-gutter-x-sm">
    <div class="col-7 flex">جمع کل:</div>
    <div class="col text-bold">3,000,000</div>
  </div>

  <div class="row items-center q-gutter-x-xs q-my-md">
    <q-icon name="o_arrow_downward" color="primary" size="xs" />
    <span class="text-body3 text-bold">دریافتها</span>
  </div>

  <div class="row text-body3 q-gutter-x-sm q-mt-md">
    <div class="col-7 row items-center">
      <q-btn
        size="sm"
        dense
        round
        unelevated
        flat
        color="red"
        icon="o_delete"
        class="q-mr-xs"
      />
      <span class="text-body3">دریافت - تسویه حساب:</span>
    </div>
    <div class="col text-body3">27,000,000</div>
  </div>

  <div class="row text-body3 q-gutter-x-sm q-mt-md">
    <div class="col-7 flex">
      <a href="#" class="link">دریافت - 27/09/1402:</a>
    </div>
    <div class="col">3,000,000</div>
  </div>

  <q-separator color="positive" size="2px" class="q-mt-md" />

  <div class="row text-body3 q-gutter-x-sm q-mt-md">
    <div class="col-7 row items-center">
      <span class="text-body3 text-bold">جمع دریافتی:</span>
    </div>
    <div class="col text-body3 text-bold">30,000,000</div>
  </div>

  <q-separator color="red" size="2px" class="q-mt-md" />

  <div class="row text-body3 q-gutter-x-sm q-mt-md">
    <div class="col-7 row items-center">
      <span class="text-body3 text-bold">مانده:</span>
    </div>
    <div class="col text-body3 text-bold">0</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  item: Object,
  formStore: Object,
});

const route = useRoute();

const id = computed(() => props.item?.id ?? route.params.id);

onMounted(() => {
  //formStore.getById(id.value);
});
</script>
