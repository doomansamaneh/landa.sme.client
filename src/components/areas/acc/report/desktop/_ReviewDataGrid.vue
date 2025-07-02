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
    :title="`${title} / ${subTitle}`"
  >
    <template #toolbar_="{ tableStore }">
      <data-grid-toolbar :table-store="tableStore">
        <template #print-button>
          <q-btn
            no-caps
            size="11px"
            round
            unelevated
            @click="openPreview(tableStore)"
          >
            <q-icon size="21px" name="o_print" />
            <q-tooltip :delay="700" class="custom-tooltip">
              <div class="text-body2">چاپ</div>
            </q-tooltip>
          </q-btn>
        </template>
      </data-grid-toolbar>
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

    <template #footer-subtotal="{ selectedRows }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td v-if="showOpening">
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "debitOpening")
            )
          }}
        </b>
      </td>
      <td v-if="showOpening">
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "creditOpening")
            )
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "debit")
            )
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "credit")
            )
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "debitRemained")
            )
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
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
      <td v-if="showOpening">
        <b>{{ helper.formatNumber(summary.debitOpening) }}</b>
      </td>
      <td v-if="showOpening">
        <b>{{ helper.formatNumber(summary.debitOpening) }}</b>
      </td>
      <td>
        <b>{{ helper.formatNumber(summary.debit) }}</b>
      </td>
      <td>
        <b>{{ helper.formatNumber(summary.credit) }}</b>
      </td>
      <td>
        <b>{{ helper.formatNumber(summary.debitRemained) }}</b>
      </td>
      <td>
        <b>{{ helper.formatNumber(summary.creditRemained) }}</b>
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
  import DataGridToolbar from "src/components/shared/dataTables/desktop/DataGridToolbar.vue";

  const props = defineProps({
    tableStore: Object,
    title: String,
    subTitle: String,
  });

  const showOpening = computed(
    () =>
      helper.findIndex(
        props.tableStore.columns.value,
        "name",
        "debitOpening"
      ) !== -1
  );

  const colspan = computed(() => {
    const columns = props.tableStore.columns.value;
    const targetIndex =
      helper.findIndex(columns, "name", "debitOpening") !== -1
        ? helper.findIndex(columns, "name", "debitOpening")
        : helper.findIndex(columns, "name", "debit");

    return (
      targetIndex +
      1 + // numbered column
      1 // multi check column
    );
  });

  const openPreview = () => {};
</script>
