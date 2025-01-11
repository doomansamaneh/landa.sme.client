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
            بدهکار
          </th>
          <th style="width: 150px; border: 1px solid #2d2d2d">
            بستانکار
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(item, index) in model?.voucherItems"
          :key="item.id"
        >
          <tr
            :class="
              item.id === voucherItemId ? 'bg-blue-5 text-white' : ''
            "
          >
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
              {{ helper.formatNumber(item.debit) }}
            </td>
            <td
              style="
                vertical-align: top;
                padding: 3px;
                border: 1px solid #2d2d2d;
              "
            >
              {{ helper.formatNumber(item.credit) }}
            </td>
          </tr>
        </template>
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
            (
            {{
              numberToWords(
                helper.getSubtotal(model?.voucherItems, "debit") ?? 0
              )
            }}
            <strong>{{ model?.currencyTitle }}</strong>
            )
          </td>
          <td style="padding: 3px; border: 1px solid #2d2d2d">
            <strong>
              {{
                helper.formatNumber(
                  helper.getSubtotal(model?.voucherItems, "debit")
                )
              }}
            </strong>
          </td>
          <td style="padding: 3px; border: 1px solid #2d2d2d">
            <strong>
              {{
                helper.formatNumber(
                  helper.getSubtotal(model?.voucherItems, "credit")
                )
              }}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { numberToWords } from "@persian-tools/persian-tools";
  import { helper } from "src/helpers";

  const $q = useQuasar();

  const props = defineProps({
    model: Object,
    voucherItemId: String,
  });
</script>
