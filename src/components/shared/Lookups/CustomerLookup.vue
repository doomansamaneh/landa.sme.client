<template>
  <lookup-view
    dataSource="crm/customer/getlookupData"
    orderByField="code"
    textTemplate="{{ code }} {{ name }}"
    searchField="name"
    ref="lookup"
  >
    <template #thead>
      <div class="row q-gutter-x-md items-center">
        <div class="col-1">#</div>
        <div class="col-5 q-pr-md">
          <header-column
            fieldName="name"
            title="نام"
            :lookup="lookup"
          />
        </div>
        <div class="col-4">
          <header-column
            fieldName="code"
            title="کد"
            :lookup="lookup"
          />
        </div>
        <q-btn
          dense
          unelevated
          color="primary"
          class="absolute-top-right q-py-xs q-px-sm q-mr-sm"
          style="margin-top: 12px;"
          rounded
          size="12px"
        >
          <q-icon
            name="o_add"
            size="14px"
            style="margin-left: 2px;"
          />
          <span class="text-caption">ایجاد</span>
        </q-btn>
      </div>
    </template>

    <template #td="{ row, index }">
      <div class="row q-gutter-x-md" style="width:300px">
        <div class="col-1 text-caption">{{ index }}</div>
        <div class="col-5 text-caption">{{ row.name }}</div>
        <div class="col-4 text-caption">{{ row.code }}</div>
      </div>
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

<style></style>
