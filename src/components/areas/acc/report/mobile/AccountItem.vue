<template>
  <data-grid
    :data-table-store="tableStore"
    separator="horizontal"
    multiSelect
    flat
    dense
    numbered
    wrapCells_
    expandable
    toolbar
    :title="`${title} / ${subTitle}`"
  >
    <template #cell-voucherSubject="{ item }">
      {{ item.voucherSubject }} -
      <div
        class="text-caption-sm"
        :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        v-if="item.comment"
      >
        {{ item.comment }}
      </div>
    </template>
    <template #footer-subtotal="{ selectedRows }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td>
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "debitRemained")
              .toLocaleString()
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "creditRemained")
              .toLocaleString()
          }}
        </b>
      </td>
      <td colspan="100%">
        <b v-if="showInlineDebit">
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "debitRemained") -
                helper.getSubtotal(selectedRows, "creditRemained")
            )
          }}
        </b>
      </td>
    </template>
    <template #footer-total="{ summary }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.total") }}
      </td>
      <td>
        <b>{{ helper.formatNumber(summary?.debitRemained) }}</b>
      </td>
      <td>
        <b>{{ helper.formatNumber(summary?.creditRemained) }}</b>
      </td>
      <td colspan="100%">
        <b v-if="showInlineDebit">
          {{
            helper.formatNumber(
              summary?.debitRemained - summary?.creditRemained
            )
          }}
        </b>
      </td>
    </template>
    <template #expand="{ item }">
      <voucher-preview
        :voucher-id="item.voucherId"
        :voucher-item-id="item.id"
        inside
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { computed, onMounted, onUnmounted } from "vue";

  import { bus } from "src/helpers";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { sqlOperator, accountTreeType } from "src/constants";
  import { useVoucherSearch } from "../../_composables/useVoucherSearch";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { accountItemColumns } from "../../_composables/constants";
  import { useAccountReview } from "../../_composables/useAccountReview";

  import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";
  import VoucherPreview from "../../voucher/shared/preview/IndexView.vue";

  const props = defineProps({
    reportStore: useAccountReview,
    previewRoute: String,
    dataSource: {
      type: String,
      default: "acc/report/getItemData",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
    noFullscreen: Boolean,
    title: String,
    subTitle: { type: String, default: "" },
  });

  const searchStore = useVoucherSearch();
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || accountItemColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        sortColumn: "voucherNo,rowNo",
        columns: props.columns || accountItemColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const colspan = computed(
    () =>
      helper.findIndex(
        tableStore.columns.value,
        "name",
        "debitRemained"
      ) +
      1 + //numbered column
      1 //multi check column
  );

  const showInlineDebit = computed(
    () =>
      helper.findIndex(
        tableStore.columns.value,
        "name",
        "inlineDebit"
      ) >= 0
  );

  const setSelectedAccount = () => {
    let currentFilters = props.filterExpression || [];
    const selectedDl = props.reportStore?.getItemByType(
      accountTreeType.dl
    );
    const selectedCl = props.reportStore?.getItemByType(
      accountTreeType.cl
    );
    const selectedGl = props.reportStore?.getItemByType(
      accountTreeType.gl
    );
    const selectedSl = props.reportStore?.getItemByType(
      accountTreeType.sl
    );
    const selectedSlDl = props.reportStore?.getItemByType(
      accountTreeType.slDl
    );

    if (selectedSlDl) {
      const slDlId = selectedSlDl.id.split("|");
      currentFilters.push({
        fieldName: "vi.slId",
        operator: sqlOperator.equal,
        value: slDlId[0],
      });

      currentFilters.push({
        fieldName: "vi.dlId",
        operator: sqlOperator.equal,
        value: slDlId[1],
      });
    } else {
      if (selectedDl) {
        currentFilters.push({
          fieldName: "vi.dlId",
          operator: sqlOperator.equal,
          value: selectedDl.id,
        });
      }

      if (selectedSl) {
        currentFilters.push({
          fieldName: "vi.slId",
          operator: sqlOperator.equal,
          value: selectedSl.id,
        });
      } else if (selectedGl) {
        currentFilters.push({
          fieldName: "sl.glId",
          operator: sqlOperator.equal,
          value: selectedGl.id,
        });
      } else if (selectedCl) {
        currentFilters.push({
          fieldName: "gl.clId",
          operator: sqlOperator.equal,
          value: selectedCl.id,
        });
      }
    }

    tableStore.setFilterExpression(currentFilters);
  };

  setSelectedAccount();

  const reloadData = async () => {
    setSelectedAccount();
    await tableStore.reloadData();
  };

  onMounted(() => {
    bus.on("apply-selected-account", reloadData);
  });

  onUnmounted(() => {
    bus.off("apply-selected-account", reloadData);
  });

  defineExpose({
    tableStore,
  });
</script>

<style scoped>
  .data-grid {
    margin: 8px;
    border-radius: 8px;
  }

  :deep(.q-table__card) {
    margin: 0;
    border-radius: 8px;
  }

  :deep(.q-table__top) {
    padding: 8px;
  }

  :deep(.q-table__bottom) {
    padding: 8px;
  }

  :deep(.q-table__control) {
    padding: 4px;
  }
</style>
