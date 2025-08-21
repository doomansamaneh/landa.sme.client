<template>
  <div class="q-table__middle_ scroll">
    <table
      :style="$q.screen.gt.xs ? 'width:100%;' : 'width: 900px;'"
      style="
        width: 100%;
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        border-collapse: collapse;
        font-size: 12.4px;
      "
      class="print-preview-table"
    >
      <thead>
        <tr>
          <th
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.labels.rowNo") }}
          </th>
          <th
            style="
              width: 95px;
              text-align: start;
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.productCode") }}
          </th>
          <th
            style="
              text-align: start;
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.productTitle") }}
          </th>
          <th
            style="
              text-align: start;
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.productUnitTitle") }}
          </th>
          <th
            style="
              width: 110px;
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.quantity") }}
          </th>
          <th
            style="
              width: 130px;
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.per") }}
          </th>
          <th
            style="
              width: 150px;
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.labels.totalAmount") }} ({{
              model?.currencyTitle
            }})
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in items?.data" :key="item.id">
          <tr
            :class="
              item.id === voucherItemId ? 'bg-blue-5 text-white' : ''
            "
          >
            <td
              style="
                padding: 5px;
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
                padding: 5px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
            >
              {{ item.productCode }}
            </td>
            <td
              style="
                padding: 5px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
            >
              {{ item.productTitle }}
            </td>
            <td
              style="
                padding: 5px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
            >
              {{ item.productUnitTitle }}
            </td>
            <td
              style="
                padding: 5px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
            >
              {{ helper.formatNumber(item.quantity) }}
            </td>
            <td
              style="
                padding: 5px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
            >
              {{ helper.formatNumber(item.price) }}
            </td>
            <td
              style="
                padding: 5px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
            >
              <span class="text-weight-600">
                {{ helper.formatNumber(item.totalPrice) }}
              </span>
            </td>
          </tr>
        </template>
      </tbody>

      <tbody>
        <tr>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              text-align: end;
            "
            colspan="4"
            class="text-right"
          >
            <strong>{{ $t("shared.labels.total") }}:</strong>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            <span class="text-weight-600">
              {{
                helper.formatNumber(
                  helper.getSubtotal(items?.data, "quantity")
                )
              }}
            </span>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            <span class="text-weight-600">
              {{
                helper.formatNumber(
                  helper.getSubtotal(items?.data, "price")
                )
              }}
            </span>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            <span class="text-weight-600">
              {{
                helper.formatNumber(
                  helper.getSubtotal(items?.data, "totalPrice")
                )
              }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useFormActions } from "src/composables/useFormActions";
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });

  const items = ref(null);
  const formActionStore = useFormActions("inv/stockLog");

  onMounted(async () => {
    items.value = await formActionStore.customGetAction(
      `getByVoucher/${props.model.voucherId}`
    );
  });
</script>
