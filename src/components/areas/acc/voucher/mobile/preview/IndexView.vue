<template>
  <q-card bordered>
    <q-card-section>
      <div
        class="row q-col-gutter-md justify-between items-center text-body3 no-letter-spacing"
      >
        <div class="col-5">
          <div>
            شماره:
            <span class="text-weight-500">
              {{ model?.no }}
            </span>
          </div>
          <div>
            تاریخ:
            <span class="text-weight-500">
              {{ model?.date?.substring(0, 10) }}
            </span>
          </div>
        </div>
        <div class="row col justify-end q-gutter-sm">
          <span
            class="border-radius-sm red-gradient text-caption text-white label"
          >
            {{ model?.rowNo }}
          </span>
        </div>
      </div>
    </q-card-section>

    <q-separator size="0.5px" />

    <q-card-section class="q-gutter-y-sm">
      <div>
        <span class="text-body3 no-letter-spacing">
          {{ model?.subject }}
        </span>
      </div>
      <div class="row q-gutter-xs">
        <span
          v-if="model?.systemId"
          class="border-radius-sm bluegrey-gradient text-caption text-white label"
        >
          {{
            $t(
              `shared.subSystem.${helper.getEnumType(
                model?.systemId,
                subSystem
              )}`
            )
          }}
        </span>
        <span
          v-if="model?.typeId"
          class="border-radius-sm primary-gradient text-caption text-white label"
        >
          {{
            $t(
              `shared.voucherType.${helper.getEnumType(
                model?.typeId,
                voucherType
              )}`
            )
          }}
        </span>
      </div>
    </q-card-section>

    <q-card-section class="q-gutter-md">
      <template
        v-for="(item, index) in model?.voucherItems"
        :key="item.id"
      >
        <div
          class="row items-start q-gutter-sm text-body_ no-letter-spacing"
        >
          <div
            class="col-1 text-white text-center rounded-borders bg-secondary"
          >
            <div>
              {{ index + 1 }}
            </div>
          </div>
          <div class="col">
            <span class="q-pa-xs_ text-grey_">
              {{ item.slCode }} {{ item.slTitle }} /
            </span>
            <span v-if="item.dlCode" class="q-pa-xs text-blue">
              {{ item.dlCode }} {{ item.dlTitle }} /
            </span>
            <span>
              {{ item.comment }}
            </span>
            <div class="text-h6_ no-letter-spacing">
              <span class="text-positive">
                {{ helper.formatNumber(item.debit) }}
              </span>
              -
              <span class="text-negative">
                {{ helper.formatNumber(item.credit) }}
              </span>
            </div>
          </div>
        </div>
      </template>
      <q-separator />
      <div class="text-right">
        <span class="text-weight-600">
          {{
            helper.formatNumber(
              helper.getSubtotal(model?.voucherItems, "debit")
            )
          }}
          <span class="text-caption no-letter-spacing">
            {{ model.currencyTitle }}
          </span>
        </span>
      </div>
    </q-card-section>
  </q-card>

  <detail-section
    class="q-mt-md"
    :model="model"
    tax-api
    :detail-url="detailUrl"
    :show-receipt="showReceipt"
  />
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { subSystem, voucherType } from "src/constants";

  import DetailSection from "../../shared/preview/_DetailSection.vue";

  const props = defineProps({
    model: Object,
    title: String,
    detailUrl: String,
    showSaleHeader: Boolean,
    showReceipt: Boolean,
    taxApi: Boolean,
  });

  const appConfigStore = useAppConfigModel();
</script>

<style lang="scss" scoped>
  .label {
    padding: 2px 12px;
  }
</style>
