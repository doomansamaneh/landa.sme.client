<template>
  <data-grid
    :data-table-store="tableStore"
    :base-route="baseRoute"
    show-avatar
    show-badge
  >
    <!-- <template #header>
      <template></template>
    </template> -->

    <template #row-avatar-title="{ item }">
      {{ helper.getFirstChar(item.name) }}
    </template>

    <template #row-body="{ item }">
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col ellipsis text-body3 text-weight-600">
              <span v-if="item.code">{{ item.code }} /</span>
              {{ item.name }}
            </div>
          </div>
          <div
            v-if="item.locationName"
            class="ellipsis text-body3 q-mt-xs"
          >
            <q-icon
              name="o_location_on"
              size="13px"
              color="primary"
            />
            {{ item.locationName }} {{ item.address }}
          </div>
          <div class="row items-center">
            <div
              class="flex text-body3 items-center rtl"
              v-if="item.phoneNo"
            >
              {{ helper.separatePhoneNumbers(item.phoneNo) }}
              <q-icon
                name="o_phone"
                class="q-mr-xs"
                color="primary"
                size="13px"
              />
            </div>
            <div
              class="flex text-body3 items-center rtl"
              v-if="item.mobileNo"
            >
              {{ helper.separatePhoneNumbers(item.mobileNo) }}
              <q-icon
                name="o_phone_android"
                class="q-mr-xs"
                color="primary"
                size="13px"
              />
            </div>
          </div>
          <div class="row">
            <div class="col ellipsis text-caption-sm">
              <span v-if="item.locationName">
                {{ item.locationName }} /
              </span>
              {{ item.address }}
            </div>
          </div>
        </div>

        <div class="col-2">
          <menu-item-more @click="showItemSheet(item)" />
        </div>
      </div>
    </template>

    <template #row-badge="{ item }">
      <type-badge
        :color="$q.dark.isActive ? 'blue-grey-8' : 'grey-4'"
        :text-color="$q.dark.isActive ? 'white' : 'black'"
        class="bg-on-dark"
        :title="
          $t(
            `shared.customerType.${helper.getEnumType(
              item.typeId,
              customerType
            )}`
          )
        "
      />

      <type-badge
        :color="$q.dark.isActive ? 'blue-grey-8' : 'grey-4'"
        :text-color="$q.dark.isActive ? 'white' : 'black'"
        :title="item.unitTitle"
      />
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
  const itemSheetStatus = ref(false)

  const showItemSheet = (row) => {
    item.value = row;
    itemSheetStatus.value = true;
  };
  const hideItemSheet = () => {
    itemSheetStatus.value = false;
  };
</script>
