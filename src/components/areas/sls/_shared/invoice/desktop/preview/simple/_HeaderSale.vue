<template>
  <div class="q-table__middle scroll">
    <table
      :style="$q.screen.gt.xs ? 'width: 100%;' : 'width: 900px'"
      style="
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        border-collapse: collapse;
        font-size: 13px;
      "
      class="print-preview-table"
    >
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
              {{ $t("shared.labels.supplier") }}:
              <strong>
                {{ appConfigStore.model.value.companySetting.name }}
              </strong>
              <span
                v-if="
                  appConfigStore.model.value.companySetting.nationalNo
                "
              >
                / {{ $t("shared.labels.nationalNo") }}:
                {{
                  appConfigStore.model.value.companySetting.nationalNo
                }}
              </span>
              <span
                v-else-if="
                  appConfigStore.model.value.companySetting.taxNo
                "
              >
                / {{ $t("shared.labels.taxNo") }}:
                {{ appConfigStore.model.value.companySetting.taxNo }}
              </span>
            </div>

            <div>
              {{ $t("shared.columns.address") }}:
              <strong>
                {{
                  appConfigStore.model.value.companySetting.location
                }}
                -
              </strong>
              <span class="text-wrap">
                {{
                  appConfigStore.model.value.companySetting.address
                }}
              </span>
              <span
                v-if="
                  appConfigStore.model.value.companySetting.postalCode
                "
                class="q-px-sm"
              >
                <strong>{{ $t("shared.labels.postalCode") }}:</strong>
                {{
                  appConfigStore.model.value.companySetting.postalCode
                }}
              </span>

              <span
                v-if="appConfigStore.model.value.companySetting.phone"
              >
                {{ $t("shared.labels.phone") }}:
                {{ appConfigStore.model.value.companySetting.phone }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>

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
              {{ $t("shared.labels.customer") }}:
              <strong>{{ model.customerName }}</strong>
              <span
                v-if="model.customerSummary?.business?.nationalNo"
              >
                / {{ $t("shared.labels.nationalNo") }}:
                {{ model.customerSummary?.business?.nationalNo }}
              </span>
              <span
                v-else-if="model.customerSummary?.business?.taxNo"
              >
                / {{ $t("shared.labels.taxNo") }}:
                {{ model.customerSummary?.business?.taxNo }}
              </span>
            </div>

            <div v-if="model.customerSummary?.address?.address">
              {{ $t("shared.columns.address") }}:
              <strong
                v-if="model.customerSummary?.address?.locationTitle"
              >
                {{ model.customerSummary?.address?.locationTitle }}
                -
              </strong>
              <span class="text-wrap">
                {{ model.customerSummary?.address?.address }}
              </span>
              <span v-if="model.customerSummary?.address?.postalCode">
                /
                <strong>{{ $t("shared.labels.postalCode") }}:</strong>
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
    </table>
  </div>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    model: Object,
  });
  const appConfigStore = useAppConfigModel();
</script>
