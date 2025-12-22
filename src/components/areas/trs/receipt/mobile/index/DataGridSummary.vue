<template>
  <div class="column q-gutter-xs">
    <q-card class="text-white bordered primary-gradient">
      <q-card-section class="q-pa-sm">
        <div class="row items-center q-gutter-sm">
          <div class="col-auto">
            <q-btn
              no-caps
              round
              dense
              unelevated
              size="md"
              class="bg-white text-dark text-body3 text-bold no-pointer-events"
            >
              {{ tableStore?.pagination.value.totalItems }}
            </q-btn>
          </div>

          <div class="col">
            <div class="row q-gutter-xs items-center">
              <div class="text-body3">
                {{ $t("shared.labels.total") }}:
              </div>
              <div class="text-bold text-white text-body3">
                {{
                  helper.formatNumber(
                    tableStore?.summaryData?.value?.amount
                  )
                }}
              </div>
            </div>

            <div
              v-if="tableStore?.summaryData?.value?.payedAmount"
              class="row q-gutter-xs items-center"
            >
              <div class="text-body3">
                {{ $t("shared.labels.received") }}:
              </div>
              <div class="text-bold text-white text-body3">
                {{
                  helper.formatNumber(
                    tableStore?.summaryData?.value?.payedAmount
                  )
                }}
              </div>
            </div>

            <div
              v-if="tableStore?.summaryData?.value?.remainedAmount"
              class="row q-gutter-xs items-center"
            >
              <div class="text-body3">
                {{ $t("shared.columns.remained") }}:
              </div>
              <div class="text-bold text-white text-body3">
                {{
                  helper.formatNumber(
                    tableStore?.summaryData?.value?.remainedAmount
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="bordered grid-subtotal"
      v-if="tableStore?.selectedRows?.value.length > 1"
    >
      <q-card-section class="q-pa-sm">
        <div class="row items-center q-gutter-sm">
          <div class="col-auto">
            <q-btn
              no-caps
              round
              dense
              unelevated
              size="md"
              class="bg-white text-primary text-body3 text-bold no-pointer-events"
            >
              <q-icon size="20px" name="o_done" />
            </q-btn>
          </div>
          <div class="col">
            <div class="row q-gutter-xs items-center">
              <div class="text-body3">
                {{ $t("shared.labels.total") }}:
              </div>
              <div class="text-bold text-body3">
                {{
                  helper.formatNumber(
                    helper
                      .getSubtotal(
                        tableStore.selectedRows.value,
                        "amount"
                      )
                      .toNumber()
                  )
                }}
              </div>
            </div>

            <div
              v-if="
                helper
                  .getSubtotal(
                    tableStore.selectedRows.value,
                    'remainedAmount'
                  )
                  .toNumber() > 0
              "
              class="row q-gutter-xs items-center"
            >
              <div class="text-body3">
                {{ $t("shared.columns.remained") }}:
              </div>
              <div class="text-bold text-body3">
                {{
                  helper.formatNumber(
                    helper
                      .getSubtotal(
                        tableStore.selectedRows.value,
                        "remainedAmount"
                      )
                      .toNumber()
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  const props = defineProps({
    tableStore: useDataTable,
  });
</script>
