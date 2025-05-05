<template>
  <q-card-section>
    <table
      style="
        width: 100%;
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 12.4px;
      "
    >
      <thead>
        <tr class="bg-on-dark text-center">
          <td
            style="border: 1px solid #2d2d2d; padding: 5px"
            colspan="100%"
          >
            <div class="text-body2 text-weight-500">مشخصات کالا</div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            ردیف
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            کد کالا
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            عنوان کالا
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            مقدار اصلی
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            واحد اصلی
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            مقدار فرعی
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            واحد فرعی
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            مبلغ واحد
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            مبلغ
          </td>
          <td
            style="
              padding: 5px;
              border: 1px solid #2d2d2d;
              width: 30%;
            "
          >
            توضیحات
          </td>
        </tr>
        <tr
          v-for="(item, index) in model?.invoiceItems"
          :key="item.id"
        >
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ index + 1 }}
          </td>

          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item?.productCode }}
          </td>

          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item?.productTitle }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item?.quantity) }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item.productUnitTitle }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item?.subQuantity) || 0 }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item?.subUnitTitle }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item?.price) }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item?.totalPrice) }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item?.comment }}
          </td>
        </tr>
        <tr>
          <td
            colspan="8"
            style="
              font-weight: bold;
              text-align: left;
              padding: 5px;
              border: 1px solid #2d2d2d;
            "
          >
            جمع:
          </td>
          <td
            style="
              font-weight: bold;
              text-align: left;
              padding: 5px;
              border: 1px solid #2d2d2d;
            "
          >
            {{ helper.formatNumber(model?.totalPrice ?? 0) }}
          </td>
        </tr>
      </tbody>
    </table>
  </q-card-section>
</template>

<script setup>
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });
</script>
