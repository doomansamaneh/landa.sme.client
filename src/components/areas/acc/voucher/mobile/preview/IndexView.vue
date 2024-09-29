<template>
  <q-card bordered class="shadow form-container_">
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
          <div v-if="model?.rowNo">
            <span
              class="border-radius-sm red-gradient text-caption text-white label"
            >
              {{ model?.rowNo }}
            </span>
          </div>
          <div v-if="model?.systemId">
            <span
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
          </div>
          <div v-if="model?.typeId">
            <span
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
        </div>
      </div>
    </q-card-section>

    <q-separator size="0.5px" />

    <q-card-section>
      <template v-if="model?.subject">
        <div class="text-body3 no-letter-spacing">
          {{ model?.subject }}
        </div>
      </template>

      <div class="q-mt-lg overflow-hidden border-radius-xs">
        <div class="bg-grey-2 text-dark q-pa-md">
          <div class="column q-gutter-md">
            <div
              v-for="(item, index) in model?.voucherItems"
              :key="item.id"
            >
              <div
                class="row items-start q-gutter-sm text-body3 no-letter-spacing"
              >
                <div
                  class="col-1 text-white text-center rounded-borders bg-negative"
                >
                  <div>
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="col">
                  <span class="rounded-borders q-pa-xs text-grey">
                    {{ item.slCode }} {{ item.slTitle }}
                  </span>
                  <span class="rounded-borders q-pa-xs text-blue">
                    {{ item.dlCode }} {{ item.dlTitle }}
                  </span>

                  <span class="text-weight-500">
                    {{ item.comment }}
                  </span>
                  <div class="text-h6 no-letter-spacing">
                    <span class="text-negative">
                      {{ item.debit.toLocaleString() }}
                      <span
                        class="text-dark text-caption no-letter-spacing"
                      >
                        ریال
                      </span>
                    </span>
                    -
                    <span class="text-positive">
                      {{ item.credit.toLocaleString() }}
                      <span
                        class="text-dark text-caption no-letter-spacing"
                      >
                        ریال
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row text-dark q-px-md q-py-sm bg-orange-2">
          <div class="col-xs text-body3">جمع کل:</div>

          <div class="column text-bold">
            <div class="text-negative text-h6 no-letter-spacing">
              <strong>
                {{
                  helper
                    .getSubtotal(model?.voucherItems, "debit")
                    ?.toLocaleString()
                }}
                <span class="text-caption text-dark">ریال</span>
              </strong>
            </div>
            <div class="text-positive text-h6 no-letter-spacing">
              <strong>
                {{
                  helper
                    .getSubtotal(model?.voucherItems, "credit")
                    ?.toLocaleString()
                }}
                <span class="text-caption text-dark">ریال</span>
              </strong>
            </div>
          </div>
        </div>
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
  import { numberToWords } from "@persian-tools/persian-tools";
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
