<template>
  <q-card v-if="model.value.id">
    <q-card-section>
      <div class="column q-gutter-y-sm">
        <div class="row">
          <span class="col-1 text-caption text-bold">شماره: </span>
          <span class="text-body3 q-mx-md">{{ model.value.no }}</span>
        </div>

        <div class="row">
          <span class="col-1 text-caption text-bold q-pt-sm">مشتری:</span>
          <span class="text-body3 q-mx-md">
            <q-btn
              color="primary"
              unelevated
              flat
              :to="`/crm/customer/preview/${model.value.customerId}`"
            >
              <q-icon name="o_description" size="xs" class="q-mr-xs" />
              <span>{{ model.value.customerName }}</span>
            </q-btn>
          </span>
        </div>

        <div class="row" v-if="model.value.inventoryTitle">
          <span class="col-1 text-caption text-bold">انبار:</span>
          <span class="text-body3 q-mx-md">{{
            model.value.inventoryTitle
          }}</span>
        </div>

        <div class="row" v-if="model.value.contractTitle">
          <span class="col-1 text-caption text-bold">قرارداد:</span>
          <span class="text-body3 q-mx-md">
            {{ model.value.contractTitle }}
          </span>
        </div>

        <div class="row" v-if="model.value.marketerName">
          <span class="col-1 text-caption text-bold">بازاریاب:</span>
          <span class="text-body3 q-mx-md">{{ model.value.marketerName }}</span>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-tabs
        v-model="tab"
        inline-label
        outside-arrows
        dense
        align="left"
        indicator-color_="white"
        class="text-on-dark_ bg-blue text-white shadow-2"
      >
        <q-tab name="main-info" class="q-py-sm">
          <template #default>
            <q-icon name="o_description" size="xs" class="q-mr-sm" />
            <div class="text-body3 text-bold">اطلاعات اصلی</div>
          </template>
        </q-tab>
        <q-tab name="tax" class="q-py-sm">
          <template #default>
            <q-icon name="o_paid" size="xs" class="q-mr-sm" />
            <div class="text-body3 text-bold">مالیات</div>
          </template>
        </q-tab>
        <q-tab name="log" class="q-py-sm">
          <template #default>
            <q-icon name="o_history" size="xs" class="q-mr-sm" />
            <div class="text-body3 text-bold">تاریخچه</div>
          </template>
        </q-tab>
      </q-tabs>

      <q-tab-panels v-model="tab" animated keep-alive class="transparent">
        <q-tab-panel name="main-info" class="no-padding">
          <detail-main :model="model" :form-store="formStore" />
        </q-tab-panel>

        <q-tab-panel name="tax" class="no-padding">
          <detail-tax :model="model" :form-store="formStore" />
        </q-tab-panel>

        <q-tab-panel name="log" class="no-padding">
          <detail-log />
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
  <q-card v-else>
    <q-card-section> loading ... </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import DetailMain from "./_DetailMain.vue";
import DetailTax from "./_DetailTax.vue";
import DetailLog from "./_DetailLog.vue";

const props = defineProps({
  model: Object,
  formStore: Object,
});

const route = useRoute();

const tab = ref("main-info");
const editor = ref("");
const editCommentBtn = ref(false);
const id = computed(() => props.model?.id ?? route.params.id);

onMounted(() => {
  //formStore.getById(id.value);
});
</script>
