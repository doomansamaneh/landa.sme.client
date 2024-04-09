<template>
<<<<<<< HEAD
  <q-card style="min-height: 250px">
    <template v-if="model.value.id">
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
            <span class="text-body3 q-mx-md">{{
              model.value.marketerName
            }}</span>
          </div>
=======
  <q-card class="bordered" v-if="model.value.id">
    <q-card-section>
      <div class="column q-gutter-y-sm">
        <div class="row">
          <span class="col-1 text-caption text-bold">شماره: </span>
          <span class="text-body3 q-mx-md">{{ model.value.no }}</span>
>>>>>>> dc5af0c7a1406865095125943dbfcaec2778fe91
        </div>
      </q-card-section>

<<<<<<< HEAD
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
=======
        <div class="row items-center">
          <span class="col-1 text-caption text-bold">مشتری:</span>
          <span class="text-body3 q-mx-md">
            <router-link class="no-decoration" :to="`/crm/customer/preview/${model.value.customerId}`">
              <q-icon name="o_description" size="xs" class="q-mr-xs" :class="color()" />
              <span class="decoration-on-hover" :class="color()">{{ model.value.customerName }}</span>
            </router-link>
          </span>
        </div>
>>>>>>> dc5af0c7a1406865095125943dbfcaec2778fe91

        <q-tab-panels v-model="tab" animated keep-alive class="transparent">
          <q-tab-panel name="main-info" class="no-padding">
            <detail-main :model="model" :form-store="formStore" />
          </q-tab-panel>

          <q-tab-panel name="tax" class="no-padding">
            <detail-tax :model="model" :form-store="formStore" />
          </q-tab-panel>

<<<<<<< HEAD
          <q-tab-panel name="log" class="no-padding">
            <detail-log />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </template>
    <template v-else>
      <q-inner-loading showing>
        <q-spinner-orbit size="50px" color="primary" />
      </q-inner-loading>
    </template>
  </q-card>
=======
        <div class="row" v-if="model.value.marketerName">
          <span class="col-1 text-caption text-bold">بازاریاب:</span>
          <span class="text-body3 q-mx-md">{{ model.value.marketerName }}</span>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-tabs v-model="tab" inline-label outside-arrows dense align="left" indicator-color="white"
        class="border-radius-lg bg-primary text-white shadow-2">
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

  <q-card v-else class="bordered row items-center justify-center">
    <q-card-section>
      <q-spinner color="primary" size="3em" />
    </q-card-section>
  </q-card>


>>>>>>> dc5af0c7a1406865095125943dbfcaec2778fe91
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar"

import { useRoute } from "vue-router";

import DetailMain from "./_DetailMain.vue";
import DetailTax from "./_DetailTax.vue";
import DetailLog from "./_DetailLog.vue";

const props = defineProps({
  model: Object,
  formStore: Object,
});

const $q = useQuasar()

const route = useRoute();

const tab = ref("main-info");
const editor = ref("");
const editCommentBtn = ref(false);
const id = computed(() => props.model?.id ?? route.params.id);
const loading = computed(() => {
  return props.model.value.id
})
const color = () => {
  return $q.dark.isActive ? 'text-yellow' : 'text-primary'
}

onMounted(() => {
  //formStore.getById(id.value);
});
</script>
