<template>
  <div class="column q-gutter-sm">
    <q-card class="bordered primary-gradient">
      <q-card-section>
        <div class="row items-center q-gutter-sm">
          <div class="col-2">
            <q-btn
              round
              dense
              unelevated
              class="bg-white text-primary text-body1 text-bold no-pointer-events"
            >
              {{ tableStore?.pagination.value.totalItems }}
            </q-btn>
          </div>

          <div class="col">
            <div class="row q-gutter-sm">
              <div class="text-caption text-bold text-blue-3">
                جمع کل
              </div>
              <div class="text-bold text-white text-caption">
                {{
                  helper.formatNumber(
                    tableStore?.summaryData?.value?.amount
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="bordered bg-blue-grey-2"
      v-if="tableStore?.selectedRows?.value.length > 1"
    >
      <q-card-section>
        <div class="row items-center q-gutter-sm">
          <div class="col-2">
            <q-btn
              round
              dense
              unelevated
              class="bg-white text-primary text-body1 text-bold no-pointer-events"
            >
              <q-icon size="28px" name="o_done" />
            </q-btn>
          </div>
          <div class="col">
            <div class="row q-gutter-sm">
              <div class="text-caption text-bold text-grey-7">
                جمع کل
              </div>
              <div class="text-bold text-grey-10 text-caption">
                {{
                  helper.formatNumber(
                    helper.getSubtotal(
                      tableStore.selectedRows.value,
                      "amount"
                    )
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
