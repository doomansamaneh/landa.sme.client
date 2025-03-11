<template>
  <q-card bordered>
    <q-card-section
      v-if="$q.screen.gt.xs"
      :class="$q.screen.xs ? 'q-pt-none' : ''"
    >
      <slot name="header">
        <div class="column q-gutter-y-md">
          <div class="text-body1 text-weight-700">
            #{{ model.no }}
          </div>

          <div class="text-body3 text-weight-700">سند حسابداری</div>
          <div v-if="model?.voucherId">
            <div class="q-mt-sm text-body3">
              <custom-link
                class="text-body3"
                :to="`/acc/voucher/preview/${model.voucherId}`"
                :title="model.voucherNo"
              />

              <menu-button
                icon="o_delete"
                title="حذف سند"
                class="text-warning q-mx-sm"
                @click="deleteVoucher"
              />
            </div>
          </div>

          <div v-else>
            <div class="q-mt-sm text-body3">
              <menu-button
                icon="o_add"
                title="ایجاد سند"
                class="primary-gradient primary-shadow text-white text-body3"
                @click="createVoucher"
              />
            </div>
          </div>

          <div>
            <div class="text-caption text-bold">مشتری</div>
            <div class="q-mt-sm text-body3">
              <custom-link
                class="text-body3"
                :to="`/crm/customer/preview/${model.customerId}`"
                :title="model.customerName"
              />
            </div>
          </div>

          <div v-if="model?.value?.invoiceId">
            <div class="text-body3 text-weight-700">فاکتور</div>
            <div class="q-mt-sm text-body3">
              <custom-link
                :to="`/sls/invoice/preview/${model.invoiceId}`"
                :title="model.invoiceNo"
              />
            </div>
          </div>

          <div v-if="model.marketerName">
            <div class="text-body3 text-weight-700">بازاریاب</div>
            <div class="q-mt-sm text-body3">
              {{ model.marketerName }}
            </div>
          </div>

          <div v-if="model.contractTitle">
            <div class="text-body3 text-weight-700">قرارداد</div>
            <div class="q-mt-sm text-body3">
              {{ model.contractTitle }}
            </div>
          </div>

          <div v-if="model.inventoryTitle">
            <div class="text-body3 text-weight-700">انبار</div>
            <div class="q-mt-sm text-body3">
              {{ model.inventoryTitle }}
            </div>
          </div>
        </div>
      </slot>
    </q-card-section>

    <q-separator v-if="separator" />

    <template v-if="model.id">
      <slot name="body">
        <q-tabs
          align="left"
          v-model="tab"
          inline-label
          narrow-indicator
          mobile-arrows
          :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
          :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        >
          <q-tab name="main-info">
            <template #default>
              <div class="row items-center no-wrap q-gutter-xs">
                <q-icon size="20px" name="o_arrow_downward" />
                <div class="text-body2 text-weight-700">
                  دریافت و پرداخت
                </div>
              </div>
            </template>
          </q-tab>
          <q-tab name="tax" v-if="taxApi">
            <template #default>
              <div class="row items-center no-wrap q-gutter-xs">
                <q-icon size="20px" name="o_paid" />
                <div class="text-body2 text-weight-700">مالیات</div>
              </div>
            </template>
          </q-tab>
          <q-tab name="log">
            <template #default>
              <div class="row items-center no-wrap q-gutter-xs">
                <q-icon size="20px" name="o_history" />
                <div class="text-body2 text-weight-700">تاریخچه</div>
              </div>
            </template>
          </q-tab>
        </q-tabs>

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
                :show-receipt="showReceipt"
              />
            </q-tab-panel>

            <q-tab-panel v-if="taxApi" name="tax" class="no-padding">
              <detail-tax :model="model" />
            </q-tab-panel>

            <q-tab-panel name="log" class="no-padding">
              <detail-log
                v-if="model.id"
                :entity-id="model.id"
                :entity-name="model.entityName"
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
  import { useFormActions } from "src/composables/useFormActions";

  import DetailPayments from "./_DetailPayments.vue";
  import DetailTax from "./_DetailTax.vue";
  import DetailLog from "src/components/areas/_shared/log/PreviewLog.vue";
  import CustomLink from "src/components/shared/buttons/CustomLink.vue";
  import MenuButton from "src/components/shared/buttons/MenuButton.vue";

  const props = defineProps({
    model: Object,
    separator: Boolean,
    taxApi: Boolean,
    detailUrl: String,
    showReceipt: Boolean,
  });

  const $q = useQuasar();
  const tab = ref("main-info");
  const formStore = useFormActions("sls/invoice");

  const deleteVoucher = async () => {
    await formStore.deleteById(
      props.model.id,
      () => {
        props.model.voucherId = null;
      },
      "deleteVoucher"
    );
  };

  const createVoucher = async () => {
    var responseData = await formStore.customPostAction(
      `createVoucher/${props.model.id}`
    );

    props.model.voucherId = responseData.data?.id;
    props.model.voucherNo = responseData.data?.no;
  };
</script>
