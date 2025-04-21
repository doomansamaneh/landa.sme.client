<template>
  <div class="q-gutter-sm">
    <q-card
      v-for="item in rows"
      :key="item.id"
      class="bordered border-radius-xs no-shadow"
    >
      <q-card-section class="q-pa-sm">
        <div class="row items-center justify-between q-col-gutter-sm">
          <div class="col">
            <div class="row items-center q-gutter-sm">
              <q-badge
                class="text-dark text-weight-500 text-body3 q-mt-sm"
                rounded
                outline
                :class="getStatusClasses(item.status)"
              >
                {{ item.status }}
              </q-badge>
              <div class="text-overline">{{ item.logTime }}</div>
            </div>
            <div class="text-body2 text-roboto text-weight-bold">
              {{ item.taxId }}
            </div>
          </div>
          <div class="flex items-center">
            <q-btn
              v-if="
                item.status === taxStatus.pending ||
                item.status === taxStatus.notFound ||
                item.status === taxStatus.inProgress
              "
              color="grey"
              round
              flat
              dense
              icon="o_refresh"
              size="13px"
              @click="taxStore.inquery(item.id, reloadData)"
            >
              <q-tooltip class="custom-tooltip text-body1">
                دریافت دوباره اطلاعات از سامانه مودیان
              </q-tooltip>
            </q-btn>
            <q-btn
              color="grey"
              round
              flat
              dense
              size="13px"
              :icon="
                item.expanded
                  ? 'keyboard_arrow_up'
                  : 'keyboard_arrow_down'
              "
              @click="toggleExpand(item)"
            />
          </div>
        </div>
      </q-card-section>
      <q-slide-transition>
        <div v-show="item.expanded">
          <q-separator />
          <q-card-section class="q-pb-none">
            <div class="text-body2 text-weight-700">ریز اطلاعات</div>
            <ul class="q-px-md q-pb-none q-gutter-xs" dir="ltr">
              <li>
                <span class="text-grey-8 q-p-x-sm">tax id:</span>
                <span class="text-roboto text-weight-500">
                  {{ item.taxId }}
                </span>
              </li>
              <li>
                <span class="text-grey-8 q-p-x-sm">ref no:</span>
                <span class="text-roboto text-weight-500">
                  {{ item.referenceNumber }}
                </span>
              </li>
              <li>
                <span class="text-grey-8 q-p-x-sm">uid:</span>
                <span class="text-roboto text-weight-500">
                  {{ item.uid }}
                </span>
              </li>
            </ul>
          </q-card-section>
          <template v-if="item.errors?.length">
            <q-separator />
            <q-card-section>
              <div class="text-body2 text-weight-700">خطاها</div>
              <ul class="q-px-md">
                <li
                  v-for="error in item.errors"
                  :key="error.code"
                  class="q-mb-md"
                >
                  <div class="text-body1 text-weight-700 text-grey-8">
                    {{ error.code }}
                  </div>
                  <div class="text-body2 text-weight-600">
                    {{ error.msg || error.message }}
                  </div>
                </li>
              </ul>
            </q-card-section>
          </template>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { guidEmpty, sortOrder, sqlOperator } from "src/constants";
  import { taxStatus } from "src/components/areas/sls/_composables/constants";
  import { taxApiLogColumns } from "src/components/areas/sls/_composables/constants";
  import { useTaxApiLogModel } from "src/components/areas/sls/_composables/useTaxApiLogModel";
  import { useDataTable } from "src/composables/useDataTable";

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

  const { rows, loadData, reloadData, toggleExpand } = useDataTable({
    dataSource,
    dataColumns: taxApiLogColumns,
    store: gridStore,
  });

  onMounted(() => {
    loadData();
  });

  defineExpose({
    dataGrid: gridStore,
    reloadData: reloadData,
  });
</script>
