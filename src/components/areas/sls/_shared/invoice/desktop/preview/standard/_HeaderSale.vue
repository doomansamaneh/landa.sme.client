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
        <tr
          class="bg-on-dark text-center"
          style="background-color_: #f0f0f0"
        >
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            colspan="100%"
          >
            <div class="text-body2 text-weight-500">فروشنده</div>
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            نام:
            <strong>
              {{ appConfigStore.model.value.companySetting.name }}
            </strong>
          </td>
          <td
            style="
              width: 15%;
              border: 1px solid #2d2d2d;
              padding: 3px;
            "
          >
            شماره ثبت:
            {{ appConfigStore.model.value.companySetting.regNo }}
          </td>
          <td
            style="
              width: 21%;
              border: 1px solid #2d2d2d;
              padding: 3px;
            "
          >
            شماره اقتصادی:
            {{ appConfigStore.model.value.companySetting.taxNo }}
          </td>
          <td
            style="
              width: 20%;
              border: 1px solid #2d2d2d;
              padding: 3px;
            "
          >
            شناسه ملی:
            {{ appConfigStore.model.value.companySetting.nationalNo }}
          </td>
        </tr>
        <tr>
          <td
            style="border: 1px solid #2d2d2d; padding: 3px"
            colspan="2"
          >
            نشانی:
            <strong>
              {{ appConfigStore.model.value.companySetting.location }}
              -
            </strong>
            <span class="text-wrap">
              {{ appConfigStore.model.value.companySetting.address }}
            </span>
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            کد پستی:
            {{ appConfigStore.model.value.companySetting.postalCode }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            تلفن:
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
            style="padding: 5px; border: 1px solid #2d2d2d"
            colspan="100%"
          >
            <div class="text-body2 text-weight-500">خریدار</div>
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            نام:
            <strong>{{ model.customerName }}</strong>
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            شماره ثبت:
            {{ model.customerSummary?.business?.regNo }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            شماره اقتصادی:
            {{ model.customerSummary?.business?.taxNo }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            شناسه ملی:
            {{ model.customerSummary?.business?.nationalNo }}
          </td>
        </tr>
        <tr>
          <td
            colspan="2"
            style="border: 1px solid #2d2d2d; padding: 3px"
          >
            نشانی:
            <strong>
              {{ model.customerSummary?.address?.locationTitle }}
              -
            </strong>
            <span class="text-wrap">
              {{ model.customerSummary?.address?.address }}
            </span>
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            کد پستی:
            {{ model.customerSummary?.address?.postalCode }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 3px">
            تلفن: {{ model.customerSummary?.phone?.value }}
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
