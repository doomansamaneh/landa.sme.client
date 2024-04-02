<template>
  <q-card>
    <q-card-section>
      <div class="column q-gutter-y-sm">
        <div class="column q-gutter-y-xs">
          <span class="text-caption text-bold">خریدار</span>
          <a href="#" class="link text-body3"> نام مشتری </a>
        </div>

        <div class="column q-gutter-y-xs" v-if="item?.contractTitle">
          <span class="text-caption text-bold">قرارداد</span>
          <span class="text-body3"> قرارداد </span>
        </div>

        <div class="column q-gutter-y-xs">
          <span class="text-caption text-bold">بازاریاب</span>
          <span class="text-body3">مهندس ملکی</span>
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
        indicator-color="primary"
        class="text-on-dark"
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
        <q-tab name="history" class="q-py-sm">
          <template #default>
            <q-icon name="o_history" size="xs" class="q-mr-sm" />
            <div class="text-body3 text-bold">تاریخچه</div>
          </template>
        </q-tab>
      </q-tabs>

      <q-tab-panels v-model="tab" animated keep-alive class="transparent">
        <q-tab-panel name="main-info" class="no-padding">
          <detail-main />
        </q-tab-panel>

        <q-tab-panel name="tax" class="no-padding">
          <detail-tax />
        </q-tab-panel>

        <q-tab-panel name="history" class="no-padding">
          <detail-log />
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import DetailMain from "./_DetailMain.vue";
import DetailTax from "./_DetailTax.vue";
import DetailLog from "./_DetailLog.vue";

const props = defineProps({
  item: Object,
  formStore: Object,
});

const route = useRoute();

const tab = ref("main-info");
const editor = ref("");
const editCommentBtn = ref(false);
const id = computed(() => props.item?.id ?? route.params.id);

onMounted(() => {
  //formStore.getById(id.value);
});
</script>
