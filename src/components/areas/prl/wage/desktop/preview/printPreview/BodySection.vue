<template>
  <table class="print-preview-table">
    <tr>
      <td rowspan="2" style="width: 5px">#</td>
      <td>پرسنل</td>
      <td>شروع کار</td>
      <td>کارکرد</td>
      <td>دستمزد روزانه</td>
      <td>پایه سنوات</td>
      <td>حق مسکن</td>
      <td>بن</td>
      <td>حق اولاد + حق تعهل</td>
      <td>ماموریت</td>
      <td>بیمه کارگر</td>
      <td>جمع کل</td>
    </tr>
    <tr>
      <td>ش بیمه</td>
      <td>ترک کار</td>
      <td>اضافه کار</td>
      <td>پاداش بهره‌وری</td>
      <td>عیدی و پاداش</td>
      <td>بازخرید سنوات</td>
      <td>بازخرید مرخصی</td>
      <td>سایر مزایا</td>
      <td>سایر کسورات</td>
      <td>مالیات</td>
      <td>قابل پرداخت</td>
    </tr>
    <tbody>
      <template
        v-for="(row, rowIndex) in tableStore.rows.value"
        :key="rowIndex"
      >
        <tr>
          <td rowspan="2" style="width: 1px">{{ rowIndex + 1 }}</td>
          <td>{{ row.customerCode }} - {{ row.customerName }}</td>
          <td>{{ row.dateEnter }}</td>
          <td>{{ row.day }}</td>
          <td>{{ helper.formatNumber(row.salary) }}</td>
          <td>{{ helper.formatNumber(row.baseYear) }}</td>
          <td>{{ helper.formatNumber(row.housing) }}</td>
          <td>{{ helper.formatNumber(row.food) }}</td>
          <td>{{ helper.formatNumber(row.child + row.spouse) }}</td>
          <td>{{ helper.formatNumber(row.mission) }}</td>
          <td>{{ helper.formatNumber(row.insurranceEmp) }}</td>
          <td>{{ helper.formatNumber(row.amount) }}</td>
        </tr>

        <tr>
          <td>{{ row.insurranceNo }}</td>
          <td>{{ row.dateExit }}</td>
          <td>{{ helper.formatNumber(row.overtime) }}</td>
          <td>{{ helper.formatNumber(row.reward) }}</td>
          <td>{{ helper.formatNumber(row.bonus) }}</td>
          <td>{{ helper.formatNumber(row.serviceBenefit) }}</td>
          <td>{{ row.leave }}</td>
          <td>{{ helper.formatNumber(row.addition) }}</td>
          <td>{{ helper.formatNumber(row.deduction) }}</td>
          <td>{{ helper.formatNumber(row.taxAmount) }}</td>
          <td>{{ helper.formatNumber(row.payable) }}</td>
        </tr>
      </template>
    </tbody>

    <tfoot>
      <tr>
        <td colspan="10" rowspan="2" style="text-align: left">
          <strong>جمع کل</strong>
        </td>
        <td>
          <b>
            {{
              helper.formatNumber(
                tableStore?.summaryData?.value?.amount
              )
            }}
          </b>
        </td>
        <td>
          <b>
            {{
              helper.formatNumber(
                tableStore?.summaryData?.value?.taxAmount
              )
            }}
          </b>
        </td>
      </tr>
      <tr>
        <td>
          <b>
            {{
              helper.formatNumber(
                tableStore?.summaryData?.value?.amount
              )
            }}
          </b>
        </td>
        <td>
          <b>
            {{
              helper.formatNumber(
                tableStore?.summaryData?.value?.taxAmount
              )
            }}
          </b>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
  import { sqlOperator } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { wageItemColumns } from "../../../../_composables/constants";
  import { onMounted } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { helper } from "src/helpers";

  const props = defineProps({
    wageId: String,
  });

  const gridStore = useBaseInfoGrid({
    columns: wageItemColumns,
    sortColumn: "rowNo",
    filterExpression: [
      {
        fieldName: "i.wageId",
        operator: sqlOperator.equal,
        value: props.wageId,
      },
    ],
  });

  const tableStore = useDataTable({
    dataSource: "prl/wageItem/getGridData",
    store: gridStore,
  });

  onMounted(() => {
    tableStore.loadData();
  });
</script>

<style lang="scss">
  @media print {
    .print-preview-table {
      width: 100%;
      border-collapse: collapse;
    }
    .print-preview-table th,
    .print-preview-table td {
      border: 1px solid black;
      padding: 5px;
      text-align: start;
    }
    .print-preview-table th {
      background-color: #f2f2f2;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
