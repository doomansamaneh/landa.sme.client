<template>
  <data-grid
    :data-table-store="tableStore"
    :create-url="`/{baseRoute}/create`"
  >
    <template #header>
      <template></template>
    </template>

    <template #row-body="{ item }">
      <q-card-section class="no-padding">
        <div class="column q-gutter-sm">
          <div class="row items-center q-px-sm">
            <div class="col row">
              <span
                class="ellipsis-2-lines_ text-caption text-on-dark"
              >
                <span v-if="item.code">{{ item.code }} /</span>
                {{ item.name }}

                <span>/ {{ item.unitTitle }}</span>
              </span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-md q-pb-none q-px-sm">
        <div class="row items-center q-gutter-sm">
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
        </div>
      </q-card-section>
    </template>
    <template #row-actions="{ item }">
      <q-btn
        unelevated
        class="text-on-dark"
        :to="`/${baseRoute}/preview/${item.id}`"
      >
        <span class="text-body3 text-bold">
          {{ $t("shared.labels.showDetail") }}
        </span>
      </q-btn>

      <q-btn
        round
        unelevated
        dense
        icon="o_more_vert"
        @click="showItemSheet(item)"
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
