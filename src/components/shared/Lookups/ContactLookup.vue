<template>
  <lookup-view
    dataSource="business/getBusinessGridData"
    orderByField="title"
    ref="lookup"
  >
    <template #thead>
      <thead class="lookup-table-head">
        <div class="container">
          <q-btn
            dense
            unelevated
            color="primary"
            class="q-py-sm q-px-md"
            rounded
          >
            <q-icon
              name="o_add"
              size="xs"
              class="q-pr-xs"
            />
            <span class="text-body2">ایجاد</span>
          </q-btn>
        </div>

        <tr class="">
          <th
            class=""
            style="width: 5%"
          >
            <span>#</span>
          </th>
          <th
            class=""
            style="width: 5%"
          >
            <q-icon
              v-if="pagination.sortBy === 'statusId'"
              :name="pagination.descending ? 'arrow_drop_up' : 'arrow_drop_down'
                "
              size="20px"
              color="primary"
            />
            <span
              @click="sortColumn('statusId')"
              class="cursor-pointer"
            >کد</span>
          </th>
          <th
            class=""
            style="width: 30%"
          >
            <q-icon
              v-if="pagination.sortBy === 'name'"
              :name="pagination.descending ? 'arrow_drop_up' : 'arrow_drop_down'
                "
              size="20px"
              color="primary"
            />
            <span
              class="cursor-pointer"
              @click="sortColumn('name')"
            >نام</span>
          </th>
        </tr>
      </thead>
    </template>
    <template #td="{ row }">
      <td>{{ 1 }}</td>
      <td>
        <span>{{ row.statusId }}</span>
      </td>
      <td>{{ row.name }}</td>
    </template>
  </lookup-view>
</template>

<script setup>
import LookupView from "src/components/shared/DataTables/LookupView.vue"
import { ref, onMounted } from "vue"

const lookup = ref(null)
const pagination = ref(null)

function sortColumn(columnName) {
  lookup.value.sortSelectedColumn(columnName)
}

onMounted(() => {
  pagination.value = lookup.value.pagination
})
</script>

<style lang="scss" scoped>
td {
  padding: 16px;
}

th {
  padding: 24px 12px;
}

.container {
  position: absolute;
  padding-top: 16px;
  padding-right: 12px;
  right: 0;
  z-index: 1;
}
</style>
