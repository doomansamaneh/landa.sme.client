<template>
  <div class="column q-gutter-sm">
    <q-card class="text-white bordered primary-gradient">
      <q-card-section>
        <div class="row items-center q-gutter-xs">
          <div class="col-2">
            <q-btn
              no-caps
              round
              dense
              unelevated
              class="bg-white text-dark text-body1 text-bold no-pointer-events"
            >
              {{ tableStore?.pagination.value.totalItems }}
            </q-btn>
          </div>

          <div class="col">
            <div class="row q-gutter-xs">
              <div class="text-caption">
                {{ $t("shared.labels.total") }}:
              </div>
              <div class="text-bold text-white text-caption">
                {{
                  helper.formatNumberReadable(
                    tableStore?.summaryData?.value?.amount
                  )
                }}
              </div>
            </div>

            <div
              v-if="tableStore?.summaryData?.value?.payedAmount"
              class="row q-gutter-xs q-pt-xs"
            >
              <div class="text-caption">
                {{ $t("shared.labels.received") }}:
              </div>
              <div class="text-bold text-white text-caption">
                {{
                  helper.formatNumberReadable(
                    tableStore?.summaryData?.value?.payedAmount
                  )
                }}
              </div>
            </div>

            <div
              v-if="tableStore?.summaryData?.value?.remainedAmount"
              class="row q-gutter-xs q-pt-xs"
            >
              <div class="text-caption">
                {{ $t("shared.columns.remained") }}:
              </div>
              <div class="text-bold text-white text-caption">
                {{
                  helper.formatNumberReadable(
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
      <q-card-section>
        <div class="row items-center q-gutter-xs">
          <div class="col-2">
            <q-btn
              no-caps
              round
              dense
              unelevated
              class="bg-white text-primary text-body1 text-bold no-pointer-events"
            >
              <q-icon size="28px" name="o_done" />
            </q-btn>
          </div>
          <div class="col">
            <div class="row q-gutter-xs">
              <div class="text-caption">
                {{ $t("shared.labels.total") }}:
              </div>
              <div class="text-bold text-caption">
                {{
                  helper.formatNumberReadable(
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
              class="row q-gutter-xs q-pt-xs"
            >
              <div class="text-caption">
                {{ $t("shared.columns.remained") }}:
              </div>
              <div class="text-bold text-caption">
                {{
                  helper.formatNumberReadable(
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
    title: String,
  });
</script>
