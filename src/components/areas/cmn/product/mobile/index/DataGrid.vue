<template>
  <data-grid
    :data-table-store="tableStore"
    :base-route="baseRoute"
    :create-url="`/${baseRoute}/create`"
    show-avatar
    show-badge_
  >
    <template #row-avatar-title="{ item }">
      {{ helper.getFirstChar(item.title) }}
    </template>

    <template #row-body="{ item }">
      <div class="row">
        <div class="col ellipsis q-gutter-x-xs">
          <is-active :is-active="item.isActive" />
          <span class="text-body3 text-weight-500_">
            {{ item.code }} - {{ item.title }}
          </span>
        </div>
      </div>

      <div class="row q-gutter-x-xs">
        <span class="text-caption-sm">
          <span class="text-on-dark">
            {{ $t("shared.labels.group") }}:
          </span>
          {{ item.productGroupTitle }}
        </span>
      </div>

      <div class="row q-gutter-x-xs">
        <span v-if="item.barcode" class="text-caption-sm">
          <span class="text-on-dark">
            {{ $t("shared.labels.barcode") }}:
          </span>
          {{ item.barcode }}
        </span>
        <span v-if="item.taxCode" class="text-caption-sm">
          <span class="text-on-dark">
            {{ $t("shared.labels.taxCode") }}:
          </span>
          {{ item.taxCode }}
        </span>
      </div>

      <div class="row q-gutter-x-xs">
        <span v-if="item.price" class="text-caption-sm">
          <span class="text-on-dark">
            {{ $t("shared.priceAdjustmentTarget.sales") }}:
          </span>
          {{ helper.formatNumber(item.price) }}
        </span>
        <span v-if="item.purchasePrice" class="text-caption-sm">
          <span class="text-on-dark">
            {{ $t("shared.priceAdjustmentTarget.purchase") }}:
          </span>
          {{ helper.formatNumber(item.purchasePrice) }}
        </span>
      </div>
    </template>

    <template #row-toolbar="{ item }">
      <mobile-row-toolbar
        :title="`${item.code} / ${item.title}`"
        :menu-items="getItemMenu(item)"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useProductPreviewMenu } from "../../../_menus/useProductPreviewMenu";

  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";
  import IsActive from "src/components/shared/IsActive.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    baseRoute: String,
  });

  function getItemMenu(item) {
    const context = usePreviewMenuContext(item, props.baseRoute, {
      onDeleteSuccess: async () =>
        await props.tableStore?.reloadData(),
    });
    return useProductPreviewMenu(context.value);
  }
</script>
