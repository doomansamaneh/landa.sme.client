<template>
  <div class="column q-gutter-xs">
    <q-card
      flat
      class="border-radius-md shadow-2 overflow-hidden primary-gradient"
    >
      <q-card-section
        class="row items-center q-col-gutter-md q-pa-sm"
      >
        <div class="col-auto">
          <div
            class="bg-white rounded-borders flex flex-center column"
            style="width: 32px; height: 32px"
          >
            <div class="text-body1 text-weight-bold text-primary">
              {{ tableStore?.pagination.value.totalItems }}
            </div>
          </div>
        </div>

        <div class="row items-center q-col-gutter-md">
          <div class="col-auto">
            <div class="text-caption text-white">
              {{ $t("shared.labels.total") }}
            </div>
            <div class="text-body3 text-weight-bold text-white">
              {{
                helper.formatNumberReadable(
                  tableStore?.summaryData?.value?.amount
                )
              }}
            </div>
          </div>
          <div
            class="col-auto"
            v-if="tableStore?.summaryData?.value?.payedAmount"
          >
            <div class="text-caption text-white">
              {{ $t("shared.labels.received") }}
            </div>
            <div class="text-body2 text-weight-bold text-white">
              {{
                helper.formatNumberReadable(
                  tableStore?.summaryData?.value?.payedAmount
                )
              }}
            </div>
          </div>
          <div
            class="col-auto"
            v-if="tableStore?.summaryData?.value?.remainedAmount"
          >
            <div class="text-caption text-white">
              {{ $t("shared.columns.remained") }}
            </div>
            <div class="text-body3 text-weight-bold text-white">
              {{
                helper.formatNumberReadable(
                  tableStore?.summaryData?.value?.remainedAmount
                )
              }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      v-if="tableStore?.selectedRows?.value.length > 1"
      flat
      bordered
      class="border-radius-md shadow-1 bluegrey-gradient"
    >
      <q-card-section
        class="row items-center q-col-gutter-md q-pa-sm"
      >
        <div class="col-auto">
          <div
            class="bg-white rounded-borders flex flex-center column"
            style="width: 32px; height: 32px"
          >
            <div class="text-body1 text-weight-bold text-primary">
              {{ tableStore?.selectedRows?.value.length }}
            </div>
          </div>
        </div>

        <div class="row items-center q-col-gutter-md">
          <div class="col-auto">
            <div class="text-caption text-white">
              {{ $t("shared.labels.total") }}
            </div>
            <div class="text-body3 text-weight-bold text-white">
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
            class="col-auto"
            v-if="
              helper
                .getSubtotal(
                  tableStore.selectedRows.value,
                  'payedAmount'
                )
                .toNumber() !== 0
            "
          >
            <div class="text-caption text-white">
              {{ $t("shared.labels.received") }}
            </div>
            <div class="text-body3 text-weight-bold text-white">
              {{
                helper.formatNumberReadable(
                  helper
                    .getSubtotal(
                      tableStore.selectedRows.value,
                      "payedAmount"
                    )
                    .toNumber()
                )
              }}
            </div>
          </div>
          <div
            class="col-auto"
            v-if="
              helper
                .getSubtotal(
                  tableStore.selectedRows.value,
                  'remainedAmount'
                )
                .toNumber() !== 0
            "
          >
            <div class="text-caption text-white">
              {{ $t("shared.columns.remained") }}
            </div>
            <div class="text-body3 text-weight-bold text-white">
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
