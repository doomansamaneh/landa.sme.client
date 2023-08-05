<template>
  <lookup-view
    dataSource="business/GetPlanLookupData"
    orderByField="title"
    ref="lookup"
    @row-selected="rowSelected"
  >
    <template #thead>
      <thead class="lookup-table-head">
        <tr class="">
          <th class="" style="width: 5%">
            <span>#</span>
          </th>
          <th class="" style="width: 60%">
            <q-icon
              v-if="pagination.sortBy === 'title'"
              :name="
                pagination.descending ? 'arrow_drop_up' : 'arrow_drop_down'
              "
              size="20px"
              color="primary"
            />
            <span @click="sortColumn('title')" class="cursor-pointer">طرح</span>
          </th>
          <th class="" style="width: 15%">
            <q-icon
              v-if="pagination.sortBy === 'cost'"
              :name="
                pagination.descending ? 'arrow_drop_up' : 'arrow_drop_down'
              "
              size="20px"
              color="primary"
            />
            <span class="cursor-pointer" @click="sortColumn('cost')"
              >ماهانه</span
            >
          </th>
        </tr>
      </thead>
    </template>
    <template #td="{ item, index }">
      <td>{{ index + 1 }}</td>
      <td>
        <span>{{ item.title }}</span>
      </td>
      <td>
        <span class="">{{ item.cost.toLocaleString() }}</span>
      </td>
    </template>
  </lookup-view>
</template>

<script setup>
import LookupView from "src/components/shared/LookupView.vue"
import { ref, onMounted, watch } from "vue"

const lookup = ref(null)
const text = ref(null)
const pagination = ref(null)

function sortColumn(columnName) {
  lookup.value.sortSelectedColumn(columnName)
}

function rowSelected(item) {
  lookup.value.setText(item?.title)
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
