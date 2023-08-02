<template>
  <lookup-view
    dataSource="business/getBusinessGridData"
    orderByField="title"
    searchField="b.title"
    ref="lookup"
  >
    <template #th>
      <th class="" style="width: 5%">
        <span>#</span>
      </th>
      <th class="" style="width: 5%">
        <q-icon
          v-if="pagination.sortBy === 'title'"
          :name="pagination.descending ? 'arrow_drop_up' : 'arrow_drop_down'"
          size="20px"
          color="primary"
        />
        <span @click="sortColumn('title')" class="cursor-pointer">کد</span>
      </th>
      <th class="" style="width: 30%">
        <q-icon
          v-if="pagination.sortBy === 'name'"
          :name="pagination.descending ? 'arrow_drop_up' : 'arrow_drop_down'"
          size="20px"
          color="primary"
        />
        <span class="cursor-pointer" @click="sortColumn('name')">نام</span>
      </th>
    </template>
    <template #td="{ item }">
      <td>{{ 1 }}</td>
      <td>
        <span>{{ item.statusId }}</span>
      </td>
      <td>{{ item.name }}</td>
    </template>
  </lookup-view>
</template>

<script setup>
import LookupView from "src/components/shared/LookupView.vue"
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
  padding: 16px 12px;
}
</style>
