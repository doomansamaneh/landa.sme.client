<template>
  <desktop
    :title="title"
    :grid-store="gridStore"
    :data-source="dataSource"
    hide-filter-row
    flat
    bordered
    separator="horizontal"
    ref="desktopGrid"
    expandable
  >
    <template #cell-logTime="{ item }">
      <div class="caption-on-dark">{{ item.logTime }}</div>
      <div class="text-weight-500">{{ item.taxId }}</div>
    </template>

    <template #cell-status="{ item }">
      <q-badge
        class="text-weight-500 text-body3"
        rounded
        outline
        :class="getStatusClasses(item.status)"
      >
        {{ item.status }}
      </q-badge>
    </template>

    <template #cell-actions="{ item }">
      <q-btn
        v-if="
          item.status === taxStatus.pending ||
          item.status === taxStatus.notFound ||
          item.status === taxStatus.inProgress
        "
        @click="
          taxStore.inquery(item.id, desktopGrid.tableStore.reloadData)
        "
        flat
        round
        size="sm"
        icon="o_refresh"
      >
        <q-tooltip class="custom-tooltip text-body1">
          دریافت دوباره اطلاعات از سامانه مودیان
        </q-tooltip>
      </q-btn>
    </template>

    <template #expand="{ item }">
      <q-card bordered>
        <q-card-section class="q-px-lg q-pb-none">
          <div class="text-body1 text-weight-500">ریز اطلاعات</div>
        </q-card-section>
        <q-card-section class="q-pa-lg">
          <div class="column q-gutter-md" style="direction: ltr">
            <li>
              <strong>tax id:</strong>
              {{ item.taxId }}
            </li>
            <li>
              <strong>ref no:</strong>
              {{ item.referenceNumber }}
            </li>
            <li>
              <strong>uid:</strong>
              {{ item.uid }}
            </li>
          </div>
          <template v-if="item.errors?.length">
            <q-separator class="q-my-md" />

            <div class="row items-center q-mb-md">
              <q-icon
                name="o_error_outline"
                size="xs"
                color="negative"
                class="q-mr-sm"
              />
              <div class="text-body1 text-weight-500 text-negative">
                خطاها
              </div>
            </div>

            <q-list bordered class="rounded-borders">
              <q-item v-for="er in item.errors" :key="er.code">
                <q-item-section>
                  <div class="flex items-center q-gutter-xs">
                    <q-icon
                      size="xs"
                      name="o_warning"
                      color="orange-6"
                    />
                    <div class="text-body2 text-weight-700">
                      کد: {{ er.code }}
                    </div>
                  </div>

                  <q-separator class="q-my-sm" />

                  <q-item-label class="text-body2">
                    {{ er.msg }}{{ er.message }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-card-section>
      </q-card>
    </template>
  </desktop>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { guidEmpty, sortOrder, sqlOperator } from "src/constants";
  import { taxStatus } from "src/components/areas/sls/_composables/constants";
  import { taxApiLogColumns } from "src/components/areas/sls/_composables/constants";
  import { useTaxApiLogModel } from "src/components/areas/sls/_composables/useTaxApiLogModel";

  import Desktop from "src/components/shared/dataTables/desktop/DataGrid.vue";
  // import Mobile from "src/components/shared/dataTables/mobile/DataGrid.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    invoiceId: String,
  });

  const getStatusClasses = (status) => {
    const classes = {
      [taxStatus.pending]: "bg-primary text-white",
      [taxStatus.success]: "bg-green-2 text-green-8",
      [taxStatus.failed]: "bg-red-2 text-red-8",
      [taxStatus.inProgress]: "bg-yellow-3 text-orange-9",
      [taxStatus.notFound]: "bg-grey-4 text-grey-8",
    };
    return classes[status] || "";
  };

  const dataSource = "sls/InvoiceTaxApiLog/getGridData";
  const taxStore = useTaxApiLogModel();

  const gridStore = useBaseInfoGrid({
    columns: taxApiLogColumns,
    sortColumn: "logTime",
    sortOrder: sortOrder.descending,
    filterExpression: [
      {
        fieldName: "il.InvoiceId",
        operator: sqlOperator.equal,
        value: props.invoiceId ?? guidEmpty,
      },
    ],
  });
  const desktopGrid = ref(null);

  defineExpose({
    dataGrid: desktopGrid,
  });
</script>
