<template>
  <div class="print-body">
    <div
      style="display: flex; justify-content: space-between"
      class="q-mb-lg"
    >
      <div style="width: auto">
        <table
          style="
            width: 100%;
            border: 1px solid;
            border-collapse: collapse;
            font-size: 14px;
          "
        >
          <tbody>
            <tr v-if="model">
              <td style="border: 1px solid; padding: 5px 20px">
                انبار مبدا:
              </td>
              <td style="border: 1px solid; padding: 5px 20px">
                {{ model.inventoryTitle || "-" }}
              </td>
            </tr>
            <tr v-if="model">
              <td style="border: 1px solid; padding: 5px 20px">
                انبار مقصد:
              </td>
              <td style="border: 1px solid; padding: 5px 20px">
                {{ model.toInventoryTitle || "-" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="width: auto">
        <table
          style="
            width: 100%;
            border: 1px solid;
            border-collapse: collapse;
            font-size: 14px;
          "
        >
          <tbody>
            <tr v-if="model">
              <td style="border: 1px solid; padding: 5px 20px">
                تاریخ:
              </td>
              <td style="border: 1px solid; padding: 5px 20px">
                {{ model.date ? model.date.substring(0, 10) : "-" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <used-items :model="model" />
    <cost-items :model="model" />
    <scap-items :model="model" />
    <product-items :model="model" />
  </div>
</template>

<script setup>
  import UsedItems from "./UsedItems.vue";
  import CostItems from "./CostItems.vue";
  import ScapItems from "./ScapItems.vue";
  import ProductItems from "./ProductItems.vue";

  const props = defineProps({
    model: Object,
  });
</script>
