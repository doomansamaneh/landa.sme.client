<template>
  <q-card-section>
    <div class="text-center text-bold text-body2">
      {{ appConfigStore.model.value?.companySetting?.name }}
    </div>
    <div class="text-center text-body2 q-mt-sm">{{ title }}</div>
  </q-card-section>

  <q-card-section class="q-py-none">
    <div
      class="row items-end"
      style="margin-left: -24px; margin-right: -24px"
    >
      <div
        class="col"
        style="padding-left: 24px; padding-right: 24px"
      >
        <table
          style="
            width: 100%;
            border-width: 1px;
            border-style: solid;
            border-image: initial;
            border-collapse: collapse;
          "
        >
          <tbody>
            <tr>
              <td
                style="
                  padding: 4px 8px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                <span class="text-body3">نام انبار:</span>
                <span
                  class="text-body3 text-bold"
                  style="margin-right: 4px"
                >
                  {{ model?.inventoryTitle }}
                </span>
              </td>
              <td
                style="
                  padding: 4px 8px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                <span class="text-body3">نوع:</span>
                <span
                  class="text-body3 text-bold"
                  style="margin-right: 4px"
                >
                  {{ model?.typeTitle }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="col-2"
        style="padding-left: 24px; padding-right: 24px"
      >
        <table
          style="
            width: 100%;
            border-width: 1px;
            border-style: solid;
            border-image: initial;
            border-collapse: collapse;
          "
        >
          <tbody>
            <tr>
              <td
                style="
                  padding: 4px 8px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                <span class="text-body3">شماره:</span>
                <span
                  class="text-body2 text-bold"
                  style="margin-right: 4px"
                >
                  {{ model?.no }}
                </span>
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 4px 8px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                <span class="text-body3">تاریخ:</span>
                <span
                  class="text-body2 text-bold"
                  style="margin-right: 4px"
                >
                  {{ model?.date?.substring(0, 10) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </q-card-section>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    title: String,
    model: Object,
  });

  const appConfigStore = useAppConfigModel();
</script>
