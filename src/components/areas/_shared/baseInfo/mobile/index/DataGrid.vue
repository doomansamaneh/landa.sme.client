<template>
  <data-grid
    ref="dataGrid"
    :data-table-store="tableStore"
    :create-url="createUrl"
  >
    <template #body="{ item }">
      <q-card flat bordered :class="tableStore?.getRowClass(item)">
        <q-card-section class="">
          <span
            class="q-mr-md"
            v-if="
              gridStore.columns.value.some(
                (col) => col.name === 'isActive'
              )
            "
          >
            <q-btn
              v-if="item.isActive"
              round
              dense
              size="10px"
              unelevated
              icon="o_done"
              text-color="white"
              class="green-gradient green-shadow no-pointer-events"
            />
            <q-btn
              v-else
              round
              dense
              size="10px"
              unelevated
              icon="o_close"
              text-color="white"
              class="red-gradient red-shadow no-pointer-events"
            />
          </span>
          <template v-if="item.title">
            <span v-if="item.code">{{ item.code }} -</span>
            {{ item.title }}
            <div>
              <small class="">{{ item.comment }}</small>
            </div>
          </template>
          <template v-else>
            <div
              v-for="col in gridStore.columns?.value"
              :key="col.name"
              class="q-py-xs"
            >
              <span v-if="col.field && col.label" class="q-px-sm">
                {{ col.label }}: {{ item[col.field] }}
              </span>
            </div>
          </template>
        </q-card-section>
      </q-card>
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";

  import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";

  const props = defineProps({
    tableStore: Object,
    crudStore: Object,
    dataSource: String,
    baseRoute: String,
    createUrl: String,
  });
</script>
