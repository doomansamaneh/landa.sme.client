<template>
  <div class="row q-gutter-y-md q-py-md">
    <div
      class="col-md col-sm col-xs-12 items-center"
      :class="$q.screen.lt.sm ? 'justify-center' : ''"
    >
      <img style="width: 72px" src="/landa-sme-logo.png" alt="landa-sme" />
    </div>
    <div class="col-md col-sm-5 col-xs-12 items-center justify-center">
      <div class="row items-center justify-center text-subtitle1 text-bold">
        {{ $t("page.payment-detail.invoice-label") }}
      </div>
    </div>
    <div
      class="col-md col-sm col-xs-12 row items-center"
      :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
    >
      <div class="column q-gutter-sm text-right text-caption">
        <div
          class="row items-center"
          :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
        >
          <span> {{ $t("shared.labels.no") }}: </span>
          <span class="q-px-sm text-weight-700">
            {{ model.value.no }}
          </span>
        </div>

        <div
          class="row items-center"
          :class="$q.screen.lt.sm ? 'justify-center' : 'justify-start'"
        >
          <span> {{ $t("shared.labels.date") }}:</span>
          <span class="q-px-sm text-weight-700">
            {{ model.value.date.substring(0, 10) }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <q-markup-table
    class="preview-invoice-table"
    separator="cell"
    flat
    bordered
    dense
  >
    <tbody>
      <tr class="bg-on-dark text-center">
        <td colspan="100%">
          <div class="text-body1 no-letter-spacing text-weight-700">
            فروشنده
          </div>
        </td>
      </tr>
      <tr>
        <td>نام: <strong>حسابداری لاندا</strong></td>
        <td style="width: 15%">شماره ثبت: 390303</td>
        <td style="width: 15%">شماره اقتصادی: 10320412724</td>
        <td style="width: 15%">شناسه ملی: 10320412724</td>
      </tr>
      <tr>
        <td colspan="2">
          نشانی: <strong>تهران</strong>
          شهر جدید اندیشه، شهرک صدف، خ دکتر قریب، مجتمع اداری زیتون، طبقه 2،
          واحد 13
        </td>
        <td style="width: 15%">کد پستی: 390303</td>
        <td style="width: 15%">تلفن: 88944338</td>
      </tr>
    </tbody>
    <tbody>
      <tr class="bg-on-dark text-center">
        <td colspan="100%">
          <div class="text-body1 no-letter-spacing text-weight-700">خریدار</div>
        </td>
      </tr>
      <tr>
        <td>
          نام: <strong>{{ model.value.customerName }}</strong>
        </td>
        <td style="width: 15%">
          شماره ثبت: {{ model.value.customerSummary?.business?.regNo }}
        </td>
        <td style="width: 15%">
          شماره اقتصادی: {{ model.value.customerSummary?.business?.taxNo }}
        </td>
        <td style="width: 15%">
          شناسه ملی: {{ model.value.customerSummary?.business?.nationalNo }}
        </td>
      </tr>
      <tr>
        <td colspan="2">
          نشانی:
          <strong>{{
            model.value.customerSummary?.address?.locationTitle
          }}</strong>
          {{ model.value.customerSummary?.address?.address }}
        </td>
        <td style="width: 15%">
          کد پستی: {{ model.value.customerSummary?.address?.postalCode }}
        </td>
        <td style="width: 15%">
          تلفن: {{ model.value.customerSummary?.phone?.value }}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  model: Object,
});
</script>

<style lang="scss">
.preview-invoice-table .header {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

.preview-invoice-table td {
  padding: 8px !important;
}

.sme-logo {
  width: 72px;
}

.sign-place {
  width: 50%;
  padding-bottom: 120px;
}
</style>
