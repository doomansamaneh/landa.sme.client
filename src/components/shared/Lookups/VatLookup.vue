<template>
  <lookup-view
    dataSource="cmn/vat/getlookupData"
    orderByField="title"
    textTemplate="{{ title }}"
    searchField="title"
    ref="lookup"
  >
    <template #thead>
      <div class="lookup-toolbar">
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
      <thead class="lookup-table-head">
        <tr>
          <th
            class=""
            style="width: 1px"
          >
            <span>#</span>
          </th>
          <th class="text-left">
            <header-column
              fieldName="title"
              title="عنوان"
              :lookup="lookup"
            />
          </th>
        </tr>
      </thead>
    </template>

    <template #td="{ row, index }">
      <td>{{ index + 1 }}</td>
      <td>
        {{ row.title }}
      </td>
    </template>
  </lookup-view>
</template>

<script setup>
import { ref } from "vue"
import LookupView from "src/components/shared/DataTables/LookupView.vue"
import HeaderColumn from "src/components/shared/Lookups/HeaderColumn.vue"

const lookup = ref(null)

defineExpose({
  lookup
})
</script>