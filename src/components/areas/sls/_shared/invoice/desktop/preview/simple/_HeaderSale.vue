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
              فروشنده:
              <strong>
                {{ appConfigStore.model.value.companySetting.name }}
              </strong>
              <span
                v-if="
                  appConfigStore.model.value.companySetting.nationalNo
                "
              >
                / شناسه ملی:
                {{
                  appConfigStore.model.value.companySetting.nationalNo
                }}
              </span>
              <span
                v-else-if="
                  appConfigStore.model.value.companySetting.taxNo
                "
              >
                ش اقتصادی:
                {{ appConfigStore.model.value.companySetting.taxNo }}
              </span>
            </div>

            <div>
              نشانی:
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
                <strong>کد پستی:</strong>
                {{
                  appConfigStore.model.value.companySetting.postalCode
                }}
              </span>

              <span
                v-if="appConfigStore.model.value.companySetting.phone"
              >
                تلفن:
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
              مشتری:
              <strong>{{ model.customerName }}</strong>
              <span
                v-if="model.customerSummary?.business?.nationalNo"
              >
                / شناسه ملی:
                {{ model.customerSummary?.business?.nationalNo }}
              </span>
              <span
                v-else-if="model.customerSummary?.business?.taxNo"
              >
                / ش اقتصادی:
                {{ model.customerSummary?.business?.taxNo }}
              </span>
            </div>

            <div v-if="model.customerSummary?.address?.address">
              نشانی:
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
                <strong>کد پستی:</strong>
                {{ model.customerSummary?.address?.postalCode }}
              </span>
            </div>
            <div v-if="model.customerSummary?.phone?.value">
              تلفن: {{ model.customerSummary?.phone?.value }}
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
