<template>
  <q-card class="bordered">
    <q-card-section>
      <div class="column q-gutter-y-sm">
        <div class="row">
          <span class="col-2 text-caption text-bold">شماره:</span>
          <span class="text-body3 q-mx-md">{{ model.value.no }}</span>
        </div>

        <div class="row items-center">
          <span class="col-2 text-caption text-bold">
            سند حسابداری:
          </span>
          <span class="text-body3 q-mx-md">
            <router-link
              class="no-decoration"
              :to="`/acc/voucher/preview/${model.value.voucherId}`"
            >
              <q-icon
                name="o_description"
                size="xs"
                class="q-mr-xs"
                :class="color()"
              />
              <span class="decoration-on-hover" :class="color()">
                {{ model.value.voucherNo }}
              </span>
            </router-link>
          </span>
        </div>

        <div class="row items-center">
          <span class="col-2 text-caption text-bold">مشتری:</span>
          <span class="text-body3 q-mx-md">
            <router-link
              class="no-decoration"
              :to="`/crm/customer/preview/${model.value.customerId}`"
            >
              <q-icon
                name="o_description"
                size="xs"
                class="q-mr-xs"
                :class="color()"
              />
              <span class="decoration-on-hover" :class="color()">
                {{ model.value.customerName }}
              </span>
            </router-link>
          </span>
        </div>

        <div class="row" v-if="model.value.marketerName">
          <span class="col-1 text-caption text-bold">بازاریاب:</span>
          <span class="text-body3 q-mx-md">
            {{ model.value.marketerName }}
          </span>
        </div>
      </div>
    </q-card-section>

    <q-card-section v-if="model.value.id">
      <q-tabs
        v-model="tab"
        inline-label
        outside-arrows
        dense
        align="left"
        indicator-color="white"
        class="border-radius-lg text-white primary-tabs shadow-2"
      >
        <q-tab name="main-info" class="q-py-sm">
          <template #default>
            <q-icon
              name="o_arrow_downward"
              size="xs"
              class="q-mr-sm"
            />
            <div class="text-body3 text-bold">دریافت و پرداخت</div>
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

      <q-tab-panels
        v-model="tab"
        animated
        keep-alive
        class="transparent"
      >
        <q-tab-panel name="main-info" class="no-padding">
          <detail-payments :model="model" :form-store="formStore" />
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

  <!-- <q-card v-else class="bordered row items-center justify-center">
    <q-card-section>
      <q-spinner color="primary" size="3em" />
    </q-card-section>
  </q-card> -->
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useQuasar } from "quasar";

  import { useRoute } from "vue-router";

  import DetailPayments from "./_DetailPayments.vue";
  import DetailTax from "./_DetailTax.vue";
  import DetailLog from "./_DetailLog.vue";

  const props = defineProps({
    model: Object,
    formStore: Object,
  });

  const $q = useQuasar();

  const route = useRoute();

  const tab = ref("main-info");
  const editor = ref("");
  const editCommentBtn = ref(false);
  const id = computed(() => props.model?.id ?? route.params.id);
  const loading = computed(() => {
    return props.model.value.id;
  });
  const color = () => {
    return $q.dark.isActive ? "text-yellow" : "text-primary";
  };

  onMounted(() => {
    //formStore.getById(id.value);
  });
</script>
