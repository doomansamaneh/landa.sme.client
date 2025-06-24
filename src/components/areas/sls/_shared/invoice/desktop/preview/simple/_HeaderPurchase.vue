<template>
  <table
    style="
      width: 100%;
      border-width: 1px;
      border-style: solid;
      border-image: initial;
      border-collapse: collapse;
      font-size: 13px;
    "
  >
    <tbody>
      <tr>
        <td
          style="
            border-width: 1px;
            border-style: solid;
            border-image: initial;
            padding: 3px;
          "
        >
          <div>
            فروشنده:
            <strong>{{ model.customerName }}</strong>
          </div>
          <div v-if="model.customerSummary?.business?.nationalNo">
            شناسه ملی:
            {{ model.customerSummary?.business?.nationalNo }}
          </div>
          <div v-else>
            شماره اقتصادی:
            {{ model.customerSummary?.business?.taxNo }}
          </div>
          <div>
            نشانی:
            <strong>
              {{ model.customerSummary?.address?.locationTitle }} -
            </strong>
            <span class="text-wrap">
              {{ model.customerSummary?.address?.address }}
            </span>
            <span v-if="model.customerSummary?.address?.postalCode">
              کد پستی:
              {{ model.customerSummary?.address?.postalCode }}
            </span>
          </div>
          <div v-if="model.customerSummary?.phone?.value">
            تلفن: {{ model.customerSummary?.phone?.value }}
          </div>
        </td>
      </tr>
    </tbody>

    <tbody v-if="appConfigStore.model?.value?.companySetting">
      <tr>
        <td
          style="
            border-width: 1px;
            border-style: solid;
            border-image: initial;
            padding: 3px;
          "
        >
          <div>
            نام:
            <strong>
              {{ appConfigStore.model.value.companySetting.name }}
            </strong>
          </div>
          <div
            v-if="
              appConfigStore.model.value.companySetting.nationalNo
            "
          >
            شناسه ملی:
            {{ appConfigStore.model.value.companySetting.nationalNo }}
          </div>
          <div v-else>
            شماره اقتصادی:
            {{ appConfigStore.model.value.companySetting.taxNo }}
          </div>
          <div>
            نشانی:
            <strong>
              {{ appConfigStore.model.value.companySetting.location }}
              -
            </strong>
            <span class="text-wrap">
              {{ appConfigStore.model.value.companySetting.address }}
            </span>
            کد پستی:
            {{ appConfigStore.model.value.companySetting.postalCode }}
          </div>
          <div v-if="appConfigStore.model.value.companySetting.phone">
            تلفن:
            {{ appConfigStore.model.value.companySetting.phone }}
          </div>
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
