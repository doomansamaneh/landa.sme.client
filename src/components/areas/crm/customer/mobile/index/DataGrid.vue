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
              <span v-if="item.code && item.code !== '-'">
                {{ item.code }} /
              </span>
              {{ item.name }}
            </div>
          </div>
          <div
            v-if="item.locationName || item.address"
            class="ellipsis text-body3 q-mt-xs"
          >
            <q-icon
              name="o_location_on"
              size="13px"
              color="primary"
            />
            <span v-if="item.locationName">
              {{ item.locationName }} /
            </span>
            <span>{{ item.address }}</span>
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

    <template #row-toolbar="{ item }">
      <mobile-row-toolbar
        :title="`${item.name}`"
        :menu-items="getItemMenu(item)"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { customerType } from "src/constants";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useCustomerPreviewMenu } from "../../../_menus/useCustomerPreviewMenu";

  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import TypeBadge from "src/components/areas/_shared/badges/TypeBadge.vue";

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
    return useCustomerPreviewMenu(context.value);
  }
</script>
