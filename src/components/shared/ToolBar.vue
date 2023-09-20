<template>
  <q-page-sticky
    class="z-1 bg-main q-px-xl q-py-md"
    position="top"
    expand
  >
    <q-toolbar class="q-mx-sm">
      <div class="row items-center">
        <span class="text-h6">{{ title }}</span>
        <q-badge
          rounded
          outline
          class="q-ml-sm bg-dark text-on-dark"
        ><span class="text-body2">15</span></q-badge>
        <!-- {{ tableStore.pagination.value.totalItems }} -->
      </div>
      <div class="q-space"></div>
      <div class="q-gutter-x-sm">
        <q-btn
          class="bg-primary text-white text-caption"
          padding="6px 12px"
          rounded
          unelevated
        ><q-icon
            name="o_add"
            class="q-mr-xs"
          />ایجاد</q-btn>
        <q-btn
          class="bordered-btn bg-dark text-caption"
          padding="6px 12px"
          rounded
          unelevated
        ><q-icon
            name="o_edit"
            class="q-mr-xs"
          />ویرایش</q-btn>
        <q-btn
          class="bordered-btn bg-dark text-caption"
          padding="6px 12px"
          rounded
          unelevated
        ><q-icon
            name="o_delete"
            class="q-mr-xs"
          />حذف</q-btn>
        <q-btn
          class="bordered-btn bg-dark text-caption"
          padding="6px 12px"
          rounded
          unelevated
        ><q-icon
            name="more_horiz"
            class="q-mr-xs"
          />بیشتر</q-btn>
      </div>
    </q-toolbar>
  </q-page-sticky>
</template>

<script setup>
import { useDataTable } from "src/composables/useDataTable"

const tableStore = useDataTable(props.dataSource, props.columns, props.gridStore)

const props = defineProps({
  title: String
})

</script>

<style lang="scss">
.bordered-btn {
  border: 1px solid #d9dce5;
  box-shadow: 0 0 2px 0 #dedede;
}

.z-1 {
  z-index: 1;
}
</style>
