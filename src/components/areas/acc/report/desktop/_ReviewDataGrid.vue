<template>
  <data-grid
    :data-table-store="tableStore"
    separator="horizontal"
    flat
    square_
    multiSelect
    numbered
    bordered_
    wrapCells
    dense_
    expandable_
    @row-dbl-click="alertRow"
  >
    <template #toolbar="{ tableStore }">
      <toolbar class="q-pa-md" :table-store="tableStore">
        <template #print-button>
          <q-btn
            size="11px"
            round
            unelevated
            to="/Acc/Report/ClPreview"
          >
            <q-icon size="21px" name="o_print" />
            <q-tooltip :delay="700" class="custom-tooltip">
              <div class="text-body2 no-letter-spacing">چاپ</div>
            </q-tooltip>
          </q-btn>
        </template>
      </toolbar>
    </template>

    <template #filter-typeId="{ item }">
      <custom-select
        v-model="item.value"
        :options="
          helper.getEnumOptions(accountDLType, 'accountDLType')
        "
        @update:model-value="tableStore?.reloadData"
      />
    </template>

    <template #cell-typeId="{ item }">
      {{
        $t(
          `shared.accountDLType.${helper.getEnumType(
            item.typeId,
            accountDLType
          )}`
        )
      }}
    </template>

    <template #cell-credit="{ item }">
      {{ item.credit?.toLocaleString() }}
    </template>

    <template #cell-debit="{ item }">
      {{ item.debit?.toLocaleString() }}
    </template>

    <template #cell-inlineDebit="{ item }">
      {{ item.inlineDebit?.toLocaleString() }}
    </template>

    <template #cell-debitRemained="{ item }">
      {{ item.debitRemained?.toLocaleString() }}
    </template>

    <template #cell-creditRemained="{ item }">
      {{ item.creditRemained?.toLocaleString() }}
    </template>

    <template #footer-subtotal="{ selectedRows }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td>
        <b>
          {{
            helper.getSubtotal(selectedRows, "debit").toLocaleString()
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "credit")
              .toLocaleString()
          }}
        </b>
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
    </template>

    <template #footer-total="{ summary }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.total") }}
      </td>
      <td>
        <b>{{ summary.debit?.toLocaleString() }}</b>
      </td>
      <td>
        <b>{{ summary.credit?.toLocaleString() }}</b>
      </td>
      <td>
        <b>{{ summary.debitRemained?.toLocaleString() }}</b>
      </td>
      <td>
        <b>{{ summary.creditRemained?.toLocaleString() }}</b>
      </td>
    </template>
  </data-grid>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { accountDLType } from "src/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import Toolbar from "src/components/shared/DataTables/desktop/DataGridToolbar.vue";

  const props = defineProps({
    tableStore: Object,
  });

  const colspan = computed(
    () =>
      helper.findIndex(
        props.tableStore.columns.value,
        "name",
        "debit"
      ) +
      1 + //numbered column
      1 //multi check column
  );
</script>
