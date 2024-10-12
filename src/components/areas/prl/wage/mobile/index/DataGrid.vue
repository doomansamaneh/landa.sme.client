<template>
  <data-grid
    :data-table-store="tableStore"
    create-url="`/${baseRoute}/create`"
  >
    <template #header>
      <template></template>
    </template>

    <template #row-header="{ item }">
      <q-card-section>
        <div class="row items-center justify-center">
          <q-btn
            round
            unelevated
            class="no-pointer-events"
            v-if="item.selected"
          >
            <q-avatar size="50px" color="primary" text-color="white">
              <q-icon name="o_done" size="md" />
            </q-avatar>
          </q-btn>
        </div>

        <div class="row justify-between items-center">
          <div class="col row items-center">
            <span class="text-caption text-on-dark q-mr-xs">
              شماره:
            </span>
            <span class="text-caption text-on-dark">
              {{ item.no }}
            </span>
          </div>

          <div class="col row justify-end items-center q-gutter-xs">
            <span class="text-caption text-on-dark">
              {{ item.date?.substring(0, 10) }}
            </span>
          </div>
        </div>
      </q-card-section>

      <q-separator />
    </template>

    <template #row-body="{ item }">
      <q-card-section class="no-padding">
        <div class="column q-gutter-sm">
          <div class="row items-center q-px-sm">
            <div class="col row">
              <span
                class="ellipsis-2-lines text-caption text-on-dark"
              >
                {{ item.subject }}
              </span>
            </div>
          </div>

          <div class="row items-center q-px-sm">
            <div class="col">
              <span
                class="ellipsis-2-lines text-body1 text-bold text-on-dark"
              >
                {{ helper.formatNumber(item.amount) }}
                <span class="text-caption">
                  {{ item.currencyTitle }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-md q-pb-none q-px-sm">
        <div class="row items-center q-gutter-sm">
          <row-no-badge :no="item.rowNo" />

          <type-badge
            :title="
              $t(
                `shared.voucherType.${helper.getEnumType(
                  item.typeId,
                  voucherType
                )}`
              )
            "
          />

          <system-badge
            :title="
              $t(
                `shared.subSystem.${helper.getEnumType(
                  item.systemId,
                  subSystem
                )}`
              )
            "
          />

          <contract-badge :title="item.contractTitle" />
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
  import { subSystem, voucherType } from "src/constants";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import ItemSheet from "./DataGridItemSheet.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import TypeBadge from "src/components/areas/_shared/badges/TypeBadge.vue";
  import SystemBadge from "src/components/areas/_shared/badges/SystemBadge.vue";
  import RowNoBadge from "src/components/areas/_shared/badges/RowNoBadge.vue";

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
