<template>
  <div class="q-table__middle scroll">
    <table
      :style="$q.screen.gt.xs ? 'width: 100%;' : 'width: 900px'"
      style="
        width: 100%;
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        border-collapse: collapse;
        font-size: 13px;
      "
      class="print-preview-table"
    >
      <tbody v-if="appConfigStore.model?.value?.companySetting">
        <tr
          class="bg-on-dark text-center"
          style="background-color_: #f0f0f0"
        >
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            colspan="100%"
          >
            <div class="text-body2 text-weight-500">
              {{ $t("shared.labels.supplier") }}
            </div>
          </td>
        </tr>
        <tr>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.name") }}:
            <strong>
              {{ appConfigStore.model.value.companySetting.name }}
            </strong>
          </td>
          <td
            style="
              width: 15%;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.regNo") }}:
            {{ appConfigStore.model.value.companySetting.regNo }}
          </td>
          <td
            style="
              width: 21%;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.taxNo") }}:
            {{ appConfigStore.model.value.companySetting.taxNo }}
          </td>
          <td
            style="
              width: 20%;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.nationalNo") }}:
            {{ appConfigStore.model.value.companySetting.nationalNo }}
          </td>
        </tr>
        <tr>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
            colspan="2"
          >
            {{ $t("shared.labels.address") }}:
            <strong>
              {{ appConfigStore.model.value.companySetting.location }}
              -
            </strong>
            <span class="text-wrap">
              {{ appConfigStore.model.value.companySetting.address }}
            </span>
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.postalCode") }}:
            {{ appConfigStore.model.value.companySetting.postalCode }}
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.phone") }}:
            {{ appConfigStore.model.value.companySetting.phone }}
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr
          class="bg-on-dark text-center"
          style="background-color_: #f0f0f0"
        >
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            colspan="100%"
          >
            <div class="text-body2 text-weight-500">
              {{ $t("shared.labels.customer") }}
            </div>
          </td>
        </tr>
        <tr>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.name") }}:
            <strong>{{ model.customerName }}</strong>
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.regNo") }}:
            {{ model.customerSummary?.business?.regNo }}
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.taxNo") }}:
            {{ model.customerSummary?.business?.taxNo }}
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.nationalNo") }}:
            {{ model.customerSummary?.business?.nationalNo }}
          </td>
        </tr>
        <tr>
          <td
            colspan="2"
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.address") }}:
            <strong>
              {{ model.customerSummary?.address?.locationTitle }}
              -
            </strong>
            <span class="text-wrap">
              {{ model.customerSummary?.address?.address }}
            </span>
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.postalCode") }}:
            {{ model.customerSummary?.address?.postalCode }}
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 3px;
            "
          >
            {{ $t("shared.labels.phone") }}:
            {{ model.customerSummary?.phone?.value }}
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
