<template>
  <lookup-view
    dataSource="business/GetPlanLookupData"
    orderByField="title"
    textTemplate="{{ title }}"
    searchField="title"
    ref="lookup"
    :required="true"
    :rules="[(val) => val && val.length > 0]"
  >
    <template #thead>
      <thead class="lookup-table-head">
        <tr class="">
          <th class="" style="width: 1px">
            <span>#</span>
          </th>
          <th class="">
            <header-column
              fieldName="title"
              title="طرح"
              :lookup="lookup"
            ></header-column>
          </th>
          <th class="" style="width: 15%">
            <header-column
              fieldName="cost"
              title="ماهانه"
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
import LookupView from "src/components/shared/LookupView.vue"
import HeaderColumn from "src/components/shared/Lookups/HeaderColumn.vue"
import { ref } from "vue"

const lookup = ref(null)

// function rowSelected(item) {
//   lookup.value.setCustomText("text")
// }
</script>
