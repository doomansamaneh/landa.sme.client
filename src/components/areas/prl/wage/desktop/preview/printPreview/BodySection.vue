<template>
  <table>
    <tbody>
      <tr>
        <td>
          {{ $t("shared.labels.workInsuranceNo") }}:
          <strong>{{ model.insuranceNo }}</strong>
        </td>
        <td>
          {{ $t("shared.labels.period") }}:
          <strong>
            {{ model.month }} /
            {{ model.year }}
          </strong>
        </td>
        <td>
          {{ $t("shared.labels.date") }}:
          <strong>
            {{ model.date.substring(0, 10) }}
          </strong>
        </td>
      </tr>
    </tbody>
  </table>

  <table class="print-preview-table">
    <thead>
      <tr>
        <th rowspan="2" style="width: 5px">#</th>
        <th>پرسنل</th>
        <th>شروع کار</th>
        <th>کارکرد</th>
        <th>دستمزد روزانه</th>
        <th>پایه سنوات</th>
        <th>حق مسکن</th>
        <th>بن</th>
        <th>حق اولاد + حق تاهل</th>
        <th>ماموریت</th>
        <th>بیمه کارگر</th>
        <th>جمع کل</th>
      </tr>
      <tr>
        <th>ش بیمه</th>
        <th>ترک کار</th>
        <th>اضافه کار</th>
        <th>پاداش بهره‌وری</th>
        <th>عیدی و پاداش</th>
        <th>بازخرید سنوات</th>
        <th>بازخرید مرخصی</th>
        <th>سایر مزایا</th>
        <th>سایر کسورات</th>
        <th>مالیات</th>
        <th>قابل پرداخت</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(row, rowIndex) in data.items" :key="rowIndex">
        <tr>
          <td rowspan="2" style="width: 1px">{{ rowIndex + 1 }}</td>
          <td>{{ row.customerCode }} - {{ row.customerName }}</td>
          <td>{{ row.dateEnter?.substring(0, 10) }}</td>
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
          <td>{{ row.dateExit?.substring(0, 10) }}</td>
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
          {{ $t("shared.labels.total") }}
        </td>
        <td>
          <b>
            {{
              helper.formatNumber(data.summaryData?.insurranceAmount)
            }}
          </b>
        </td>
        <td>
          <b>
            {{ helper.formatNumber(data.summaryData?.amount) }}
          </b>
        </td>
      </tr>
      <tr>
        <td>
          <b>
            {{ helper.formatNumber(data.summaryData?.taxAmount) }}
          </b>
        </td>
        <td>
          <b>
            {{
              helper.formatNumber(
                data.summaryData?.amount -
                  data.summaryData?.taxAmount -
                  data.summaryData?.insurranceAmount
              )
            }}
          </b>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { wageItemColumns } from "../../../../_composables/constants";
  import { onMounted } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });

  const gridStore = useBaseInfoGrid({
    columns: wageItemColumns,
    sortColumn: "rowNo",
    filterExpression: [
      {
        fieldName: "i.wageId",
        operator: sqlOperator.equal,
        value: props.model.id,
      },
    ],
  });

  const tableStore = useDataTable({
    dataSource: "prl/wageItem/getGridData",
    store: gridStore,
  });

  const data = ref({});

  onMounted(async () => {
    data.value = await tableStore.getAll();
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
