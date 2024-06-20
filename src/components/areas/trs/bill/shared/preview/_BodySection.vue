<template>
  <div class="q-table__middle_ scroll">
    <table
      :style="$q.screen.gt.xs ? 'width:100%;' : 'width: 900px;'"
      style="
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 12px;
      "
    >
      <thead>
        <tr>
          <th
            style="
              width: 5px;
              padding: 5px;
              border: 1px solid #2d2d2d;
            "
          >
            ردیف
          </th>
          <th
            style="
              width: 150px;
              padding: 5px;
              text-align: start;
              border: 1px solid #2d2d2d;
            "
          >
            کد حساب
          </th>
          <th
            style="
              padding: 5px;
              text-align: start;
              border: 1px solid #2d2d2d;
            "
          >
            شرح
          </th>
          <th style="width: 150px; border: 1px solid #2d2d2d">
            مبلغ
          </th>
          <th style="width: 150px; border: 1px solid #2d2d2d">
            ارزش افزوده
          </th>
          <th style="width: 150px; border: 1px solid #2d2d2d">جمع</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in model?.billItems" :key="item.id">
          <td style="padding: 3px; border: 1px solid #2d2d2d">
            {{ index + 1 }}
          </td>
          <td
            style="
              vertical-align: top;
              padding: 3px;
              border: 1px solid #2d2d2d;
            "
          >
            <div>
              {{ item.slCode }}
            </div>
            <div style="text-align: end" class="text-blue-10">
              {{ item.dlCode }}
            </div>
          </td>
          <td style="padding: 3px; border: 1px solid #2d2d2d">
            <div class="text-wrap">
              {{ item.slTitle }}
            </div>
            <div class="text-wrap text-blue-10">
              {{ item.dlTitle }}
            </div>
            <div class="text-wrap">
              {{ item.comment }}
            </div>
          </td>
          <td
            style="
              vertical-align: top;
              padding: 3px;
              border: 1px solid #2d2d2d;
            "
          >
            {{ item.amount.toLocaleString() }}
          </td>
          <td
            style="
              vertical-align: top;
              padding: 3px;
              border: 1px solid #2d2d2d;
            "
          >
            {{ item.vatAmount.toLocaleString() }}
          </td>
          <td
            style="
              vertical-align: top;
              padding: 3px;
              border: 1px solid #2d2d2d;
            "
          >
            {{ item.total.toLocaleString() }}
          </td>
        </tr>
      </tbody>

      <tbody>
        <tr>
          <td
            style="
              padding: 3px;
              border: 1px solid #2d2d2d;
              text-align: end;
            "
            colspan="3"
            class="text-right"
          >
            <strong>جمع کل:</strong>
            ({{
              numberToWords(
                helper.getSubtotal(model?.billItems, "total")
              )
            }}
            <strong>{{ model?.currencyTitle }}</strong>
            )
          </td>
          <td style="padding: 3px; border: 1px solid #2d2d2d">
            <strong>
              {{
                helper
                  .getSubtotal(model?.billItems, "amount")
                  ?.toLocaleString()
              }}
            </strong>
          </td>
          <td style="padding: 3px; border: 1px solid #2d2d2d">
            <strong>
              {{
                helper
                  .getSubtotal(model?.billItems, "vatAmount")
                  ?.toLocaleString()
              }}
            </strong>
          </td>
          <td style="padding: 3px; border: 1px solid #2d2d2d">
            <strong>
              {{
                helper
                  .getSubtotal(model?.billItems, "total")
                  ?.toLocaleString()
              }}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { numberToWords } from "@persian-tools/persian-tools";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";

  const $q = useQuasar();

  const props = defineProps({
    model: Object,
  });
</script>
