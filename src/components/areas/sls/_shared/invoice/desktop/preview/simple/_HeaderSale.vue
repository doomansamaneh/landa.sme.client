<template>
  <div class="q-table__middle scroll">
    <table
      :style="$q.screen.gt.xs ? 'width: 100%;' : 'width: 900px'"
      style="
        border-collapse: collapse;
        border: 1px solid #2d2d2d;
        font-size: 13px;
      "
    >
      <tbody v-if="appConfigStore.model?.value?.companySetting">
        <tr>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            <div>
              فروشنده:
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
              {{
                appConfigStore.model.value.companySetting.nationalNo
              }}
            </div>
            <div v-else>
              شماره اقتصادی:
              {{ appConfigStore.model.value.companySetting.taxNo }}
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
            </div>

            <div>
              تلفن:
              {{ appConfigStore.model.value.companySetting.phone }}
            </div>
          </td>
        </tr>
      </tbody>

      <tbody>
        <tr>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            <div>
              مشتری:
              <strong>{{ model.customerName }}</strong>
            </div>
            <div v-if="model.customerSummary?.business?.nationalNo">
              شناسه ملی:
              {{ model.customerSummary?.business?.nationalNo }}
            </div>
            <div v-if="model.customerSummary?.business?.taxNo">
              شماره اقتصادی:
              {{ model.customerSummary?.business?.taxNo }}
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
              <div v-if="model.customerSummary?.address?.postalCode">
                <strong>کد پستی:</strong>
                {{ model.customerSummary?.address?.postalCode }}
              </div>
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
