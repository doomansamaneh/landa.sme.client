<template>
  <div class="q-table__middle_ scroll">
    <table
      :style="$q.screen.gt.xs ? 'width:100%;' : 'width: 900px;'"
      style="
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        border-collapse: collapse;
        font-size: 13px;
      "
      class="print-preview-table"
    >
      <thead>
        <tr>
          <th
            style="
              width: 5px;
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            ردیف
          </th>
          <th
            style="
              width: 150px;
              padding: 5px;
              text-align: start;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            کد حساب
          </th>
          <th
            style="
              padding: 5px;
              text-align: start;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            شرح
          </th>
          <th
            style="
              width: 150px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            بدهکار
          </th>
          <th
            style="
              width: 150px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
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
            <td
              style="
                padding: 3px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
            >
              {{ index + 1 }}
            </td>
            <td
              style="
                vertical-align: top;
                padding: 3px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
            >
              <div>
                {{ item.slCode }}
              </div>
              <div style="text-align: end" class="text-blue-10">
                {{ item.dlCode }}
              </div>
            </td>
            <td
              style="
                padding: 3px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
            >
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
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
            >
              {{ helper.formatNumber(item.debit) }}
            </td>
            <td
              style="
                vertical-align: top;
                padding: 3px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
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
              border-width: 1px;
              border-style: solid;
              border-image: initial;
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
          <td
            style="
              padding: 3px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            <strong>
              {{
                helper.formatNumber(
                  helper.getSubtotal(model?.voucherItems, "debit")
                )
              }}
            </strong>
          </td>
          <td
            style="
              padding: 3px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
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
