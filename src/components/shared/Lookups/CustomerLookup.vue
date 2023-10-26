<template>
  <lookup-view
    dataSource="business/getBusinessGridData"
    orderByField="title"
    textTemplate="{{ title }}"
    searchField="title"
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
        <tr>
          <th
            class=""
            style="width: 1%"
          >
            <span>#</span>
          </th>
          <th
            class=""
            style="width: 1%"
          >
            <header-column
              fieldName="statusId"
              title="کد"
              :lookup="lookup"
            ></header-column>
          </th>
          <th
            class=""
            style="width: 20%"
          >
            <header-column
              fieldName="name"
              title="نام"
              :lookup="lookup"
            ></header-column>
          </th>
        </tr>
      </thead>
    </template>

    <template #td="{ item, index }">
      <td>{{ index + 1 }}</td>
      <td>
        {{ item.statusId }}
      </td>
      <td>{{ item.name }}</td>
    </template>
  </lookup-view>
</template>

<script setup>
import { ref } from "vue"
import LookupView from "src/components/shared/DataTables/LookupView.vue"
import HeaderColumn from "src/components/shared/Lookups/HeaderColumn.vue"

const lookup = ref(null)
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
