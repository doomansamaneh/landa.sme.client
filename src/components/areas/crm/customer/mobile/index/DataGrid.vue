<template>
  <data-grid
    :data-table-store="tableStore"
    :create-url="`/{baseRoute}/create`"
    :base-route="baseRoute"
    show-avatar
    show-badge
  >
    <template #header>
      <template></template>
    </template>

    <template #row-avatar-title="{ item }">
      {{ helper.getFirstChar(item.name) }}
    </template>

    <template #row-body="{ item }">
      <div class="row">
        <div class="col ellipsis text-body3 text-weight-600">
          <span v-if="item.code">{{ item.code }} /</span>
          {{ item.name }}
        </div>
        <menu-item-more @click="showItemSheet(item)" />
      </div>
      <div class="row">
        <div class="col ellipsis text-caption-sm">
          <span v-if="item.locationName">
            {{ item.locationName }} /
          </span>
          {{ item.address }}
        </div>
        <!-- <menu-item-more @click="showItemSheet(item)" /> -->
      </div>
    </template>

    <template #row-badge="{ item }">
      <type-badge
        :title="
          $t(
            `shared.customerType.${helper.getEnumType(
              item.typeId,
              customerType
            )}`
          )
        "
      />

      <type-badge :title="item.unitTitle" />
    </template>
  </data-grid>

  <item-sheet
    v-if="itemSheetStatus"
    :table-store="tableStore"
    :status="itemSheetStatus"
    :base-route="baseRoute"
    :item="item"
    @hide="hideItemSheet"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { customerType } from "src/constants";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import MenuItemMore from "src/components/shared/buttons/MenuItemMore.vue";
  import ItemSheet from "./DataGridItemSheet.vue";
  import TypeBadge from "src/components/areas/_shared/badges/TypeBadge.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    baseRoute: String,
  });

  const item = ref(null);
  const itemSheetStatus = ref(false);

  const showItemSheet = (row) => {
    item.value = row;
    itemSheetStatus.value = true;
  };
  const hideItemSheet = () => {
    itemSheetStatus.value = false;
  };
</script>
