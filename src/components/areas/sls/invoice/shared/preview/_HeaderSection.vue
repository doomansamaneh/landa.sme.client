<template>
  <div class="row q-gutter-y-md q-py-md">
    <div class="col-md col-sm col-xs-12 items-center" :class="$q.screen.lt.sm ? 'justify-center' : ''">
      <img style="width: 72px" src="/landa-sme-logo.png" alt="landa-sme" />
    </div>
    <div class="col-md col-sm-5 col-xs-12 items-center justify-center">
      <div class="row items-center justify-center text-body2 text-bold">
        {{
          appConfigStore.model.value?.companySetting?.invoiceTitle ??
          $t("page.payment-detail.invoice-label")
        }}
      </div>
    </div>
    <div class="col-md col-sm col-xs-12 row items-center" :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'">
      <div class="column q-gutter-sm text-right_text-caption">
        <div class="row" :class="$q.screen.lt.sm ? 'justify-center' : 'justify-start'">
          <span> {{ $t("shared.labels.no") }}: </span>
          <span class="q-px-sm text-weight-700">
            {{ model.value.no }}
          </span>
        </div>

        <div class="row" :class="$q.screen.lt.sm ? 'justify-center' : 'justify-start'">
          <span> {{ $t("shared.labels.date") }}:</span>
          <span class="q-px-sm text-weight-700">
            {{ model.value.date.substring(0, 10) }}
          </span>
        </div>

        <div v-if="model.value.lastApiLogModel?.taxId" class="row"
          :class="$q.screen.lt.sm ? 'justify-center' : 'justify-start'">
          <span> {{ $t("shared.labels.taxId") }}:</span>
          <span class="q-px-sm">
            {{ model.value.lastApiLogModel.taxId }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <table style="border: 1px solid #2d2d2d; width: 100%; border-collapse: collapse;">
    <tbody v-if="appConfigStore.model?.value?.companySetting">
      <tr class="text-center">
        <td style="border: 1px solid #2d2d2d; padding: 8px;" colspan="100%">
          <div class="text-body2 no-letter-spacing text-weight-500">
            فروشنده
          </div>
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid #2d2d2d; padding: 6px 8px;">
          نام:
          <strong>{{ appConfigStore.model.value.companySetting.name }}</strong>
        </td>
        <td style="width: 15%; border: 1px solid #2d2d2d; padding: 6px 8px;">
          شماره ثبت: {{ appConfigStore.model.value.companySetting.regNo }}
        </td>
        <td style="width: 15%; border: 1px solid #2d2d2d; padding: 6px 8px;">
          شماره اقتصادی: {{ appConfigStore.model.value.companySetting.taxNo }}
        </td>
        <td style="width: 15%; border: 1px solid #2d2d2d; padding: 6px 8px;">
          شناسه ملی: {{ appConfigStore.model.value.companySetting.nationalNo }}
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid #2d2d2d; padding: 6px 8px;" colspan="2">
          نشانی:
          <strong>
            {{ appConfigStore.model.value.companySetting.location }} -
          </strong>
          <span class="text-wrap">
            {{ appConfigStore.model.value.companySetting.address }}
          </span>
        </td>
        <td style="width: 15%; border: 1px solid #2d2d2d; padding: 6px 8px;">
          کد پستی: {{ appConfigStore.model.value.companySetting.postalCode }}
        </td>
        <td style="width: 15%; border: 1px solid #2d2d2d; padding: 6px 8px;">
          تلفن: {{ appConfigStore.model.value.companySetting.phone }}
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr class="text-center">
        <td colspan="100%" style="border: 1px solid #2d2d2d; padding: 8px;">
          <div class="text-body2 no-letter-spacing text-weight-500">خریدار</div>
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid #2d2d2d; padding: 6px 8px;">
          نام: <strong>{{ model.value.customerName }}</strong>
        </td>
        <td style="width: 15%; border: 1px solid #2d2d2d; padding: 6px 8px;">
          شماره ثبت: {{ model.value.customerSummary?.business?.regNo }}
        </td>
        <td style="width: 15%; border: 1px solid #2d2d2d; padding: 6px 8px;">
          شماره اقتصادی: {{ model.value.customerSummary?.business?.taxNo }}
        </td>
        <td style="width: 15%; border: 1px solid #2d2d2d; padding: 6px 8px;">
          شناسه ملی: {{ model.value.customerSummary?.business?.nationalNo }}
        </td>
      </tr>
      <tr>
        <td colspan="2" style="border: 1px solid #2d2d2d; padding: 6px 8px;">
          نشانی:
          <strong>
            {{ model.value.customerSummary?.address?.locationTitle }} -
          </strong>
          <span class="text-wrap">
            {{ model.value.customerSummary?.address?.address }}
          </span>
        </td>
        <td style="width: 15%; border: 1px solid #2d2d2d; padding: 6px 8px;">
          کد پستی: {{ model.value.customerSummary?.address?.postalCode }}
        </td>
        <td style="width: 15%; border: 1px solid #2d2d2d; padding: 6px 8px;">
          تلفن: {{ model.value.customerSummary?.phone?.value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

const props = defineProps({
  model: Object,
});
const appConfigStore = useAppConfigModel();
</script>

<style lang="scss">

.sme-logo {
  width: 72px;
}

.sign-place {
  width: 50%;
  padding-bottom: 120px;
}
</style>
