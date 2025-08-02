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
            {{ $t("shared.labels.seller") }}:
            <strong>{{ model.customerName }}</strong>
          </div>
          <div v-if="model.customerSummary?.business?.nationalNo">
            {{ $t("shared.labels.nationalNo") }}:
            {{ model.customerSummary?.business?.nationalNo }}
          </div>
          <div v-else>
            {{ $t("shared.labels.taxNo") }}:
            {{ model.customerSummary?.business?.taxNo }}
          </div>
          <div>
            {{ $t("shared.columns.address") }}:
            <strong>
              {{ model.customerSummary?.address?.locationTitle }} -
            </strong>
            <span class="text-wrap">
              {{ model.customerSummary?.address?.address }}
            </span>
            <span v-if="model.customerSummary?.address?.postalCode">
              {{ $t("shared.labels.postalCode") }}:
              {{ model.customerSummary?.address?.postalCode }}
            </span>
          </div>
          <div v-if="model.customerSummary?.phone?.value">
            {{ $t("shared.labels.phone") }}:
            {{ model.customerSummary?.phone?.value }}
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
            {{ $t("shared.labels.name") }}:
            <strong>
              {{ appConfigStore.model.value.companySetting.name }}
            </strong>
          </div>
          <div
            v-if="
              appConfigStore.model.value.companySetting.nationalNo
            "
          >
            {{ $t("shared.labels.nationalNo") }}:
            {{ appConfigStore.model.value.companySetting.nationalNo }}
          </div>
          <div v-else>
            {{ $t("shared.labels.taxNo") }}:
            {{ appConfigStore.model.value.companySetting.taxNo }}
          </div>
          <div>
            {{ $t("shared.columns.address") }}:
            <strong>
              {{ appConfigStore.model.value.companySetting.location }}
              -
            </strong>
            <span class="text-wrap">
              {{ appConfigStore.model.value.companySetting.address }}
            </span>
            {{ $t("shared.labels.postalCode") }}:
            {{ appConfigStore.model.value.companySetting.postalCode }}
          </div>
          <div v-if="appConfigStore.model.value.companySetting.phone">
            {{ $t("shared.labels.phone") }}:
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
