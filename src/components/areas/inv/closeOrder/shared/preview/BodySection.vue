<template>
  <div class="q-table__middle_ scroll">
    <table
      :style="$q.screen.gt.xs ? 'width:100%;' : 'width: 900px;'"
      style="
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 13px;
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
              width: 95px;
              padding: 5px;
              text-align: start;
              border: 1px solid #2d2d2d;
            "
          >
            کد کالا
          </th>
          <th
            style="
              padding: 5px;
              text-align: start;
              border: 1px solid #2d2d2d;
            "
          >
            کالا
          </th>
          <th
            style="
              padding: 5px;
              text-align: start;
              border: 1px solid #2d2d2d;
            "
          >
            واحد سنجش
          </th>
          <th style="width: 110px; border: 1px solid #2d2d2d">
            تعداد/مقدار
          </th>
          <th style="width: 130px; border: 1px solid #2d2d2d">فی</th>
          <th style="width: 150px; border: 1px solid #2d2d2d">
            مبلغ کل ({{ model?.currencyTitle }})
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
              {{ item.productCode }}
            </td>
            <td style="padding: 3px; border: 1px solid #2d2d2d">
              {{ item.productTitle }}
            </td>
            <td style="padding: 3px; border: 1px solid #2d2d2d">
              {{ item.productUnitTitle }}
            </td>
            <td style="padding: 3px; border: 1px solid #2d2d2d">
              {{ helper.formatNumber(item.quantity) }}
            </td>
            <td style="padding: 3px; border: 1px solid #2d2d2d">
              {{ helper.formatNumber(item.price) }}
            </td>
            <td style="padding: 3px; border: 1px solid #2d2d2d">
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
              padding: 3px;
              border: 1px solid #2d2d2d;
              text-align: end;
            "
            colspan="4"
            class="text-right"
          >
            <strong>جمع کل:</strong>
          </td>
          <td style="padding: 3px; border: 1px solid #2d2d2d">
            <span class="text-weight-600">
              {{
                helper.formatNumber(
                  helper.getSubtotal(items?.data, "quantity")
                )
              }}
            </span>
          </td>
          <td style="padding: 3px; border: 1px solid #2d2d2d">
            <span class="text-weight-600">
              {{
                helper.formatNumber(
                  helper.getSubtotal(items?.data, "price")
                )
              }}
            </span>
          </td>
          <td style="padding: 3px; border: 1px solid #2d2d2d">
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
