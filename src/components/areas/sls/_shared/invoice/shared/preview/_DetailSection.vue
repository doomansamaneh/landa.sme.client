<template>
  <q-card
    class="bordered"
    :class="$q.screen.xs ? 'form-container' : ''"
    style="margin-top: 0"
  >
    <q-card-section>
      <slot name="header">
        <div class="column q-gutter-y-sm">
          <div class="row items-center">
            <span class="col-2 text-caption text-bold">شماره:</span>
            <span class="text-body3 q-mx-md">
              {{ model.value.no }}
            </span>
          </div>

          <div
            v-if="model?.value?.voucherId"
            class="row items-center"
          >
            <span class="col-2 text-caption text-bold">
              سند حسابداری:
            </span>
            <span class="text-body3 q-mx-md">
              <custom-link
                :to="`/acc/voucher/preview/${model.value.voucherId}`"
                :title="model.value.voucherNo"
              />
            </span>
          </div>

          <div class="row items-center">
            <span class="col-2 text-caption text-bold">مشتری:</span>
            <span class="text-body3 q-mx-md">
              <custom-link
                :to="`/crm/customer/preview/${model.value.customerId}`"
                :title="model.value.customerName"
              />
            </span>
          </div>

          <div
            v-if="model?.value?.invoiceId"
            class="row items-center"
          >
            <span class="col-2 text-caption text-bold">فاکتور:</span>
            <span class="text-body3 q-mx-md">
              <custom-link
                :to="`/sls/invoice/preview/${model.value.invoiceId}`"
                :title="model.value.invoiceNo"
              />
            </span>
          </div>

          <div
            v-if="model.value.marketerName"
            class="row items-center"
          >
            <span class="col-2 text-caption text-bold">
              بازاریاب:
            </span>
            <span class="text-body3 q-mx-md">
              {{ model.value.marketerName }}
            </span>
          </div>

          <div
            v-if="model.value.contractTitle"
            class="row items-center"
          >
            <span class="col-2 text-caption text-bold">قرارداد:</span>
            <span class="text-body3 q-mx-md">
              {{ model.value.contractTitle }}
            </span>
          </div>

          <div
            v-if="model.value.inventoryTitle"
            class="row items-center"
          >
            <span class="col-2 text-caption text-bold">انبار:</span>
            <span class="text-body3 q-mx-md">
              {{ model.value.inventoryTitle }}
            </span>
          </div>
        </div>
      </slot>
    </q-card-section>

    <q-separator v-if="separator" />

    <template v-if="model.value.id">
      <slot name="body">
        <q-card-section class="q-pb-none">
          <q-tabs
            v-model="tab"
            inline-label
            align="left"
            :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
            :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
            class="primary-tabs"
            narrow-indicator
            :class="$q.screen.gt.xs ? '' : 'q-mt-lg'"
          >
            <q-tab name="main-info" class="q-mr-xs">
              <template #default>
                <q-icon
                  name="o_arrow_downward"
                  size="xs"
                  class="q-mr-sm"
                />
                <div class="text-body3 text-bold">
                  دریافت و پرداخت
                </div>
              </template>
            </q-tab>
            <q-tab name="tax" v-if="taxApi" class="q-mr-xs">
              <template #default>
                <q-icon name="o_paid" size="xs" class="q-mr-sm" />
                <div class="text-body3 text-bold">مالیات</div>
              </template>
            </q-tab>
            <q-tab name="log" class="q-mr-xs">
              <template #default>
                <q-icon name="o_history" size="xs" class="q-mr-sm" />
                <div class="text-body3 text-bold">تاریخچه</div>
              </template>
            </q-tab>
          </q-tabs>
        </q-card-section>
        <q-separator size="1px" />

        <q-card-section>
          <q-tab-panels
            v-model="tab"
            animated
            keep-alive
            class="transparent"
          >
            <q-tab-panel name="main-info" class="no-padding">
              <detail-payments
                :model="model"
                :detail-url="detailUrl"
              />
            </q-tab-panel>

            <q-tab-panel v-if="taxApi" name="tax" class="no-padding">
              <detail-tax :model="model" />
            </q-tab-panel>

            <q-tab-panel name="log" class="no-padding">
              <detail-log
                v-if="model?.value?.id"
                :entity-id="model.value.id"
                entity-name="Sls.[Invoice]"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </slot>
    </template>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";

  import DetailPayments from "./_DetailPayments.vue";
  import DetailTax from "./_DetailTax.vue";
  import DetailLog from "src/components/areas/_shared/log/PreviewLog.vue";
  import CustomLink from "src/components/shared/buttons/CustomLink.vue";

  const props = defineProps({
    model: Object,
    separator: Boolean,
    taxApi: Boolean,
    detailUrl: String,
  });

  const $q = useQuasar();
  const tab = ref("main-info");
</script>
