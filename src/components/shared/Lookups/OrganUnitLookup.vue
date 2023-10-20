<template>
  <lookup-view
    dataSource="business/GetPlanLookupData"
    orderByField="title"
    textTemplate="{{ title }}"
    searchField="title"
    ref="lookup"
  >
    <template #thead>
      <thead class="lookup-table-head">
        <tr class="">
          <th
            class=""
            style="width: 1px"
          >
            <span>#</span>
          </th>
          <th class="">
            <header-column
              fieldName="title"
              title="کد"
              :lookup="lookup"
            ></header-column>
          </th>
          <th
            class=""
            style="width: 23%"
          >
            <header-column
              fieldName="cost"
              title="عنوان"
              :lookup="lookup"
            ></header-column>
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
        <span>{{ item.cost.toLocaleString() }}</span>
      </td>
    </template>
  </lookup-view>
</template>

<script setup>
import { ref } from "vue"
import LookupView from "src/components/shared/DataTables/LookupView.vue"
import HeaderColumn from "src/components/shared/Lookups/HeaderColumn.vue"

const lookup = ref(null)
</script>
