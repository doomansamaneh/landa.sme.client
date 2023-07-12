<template>
  <div class="row q-pt-md justify-between dark-1 q-px-lg q-py-md" v-if="showPagebar">
    <div class="pagination col-8 flex items-center">
      <q-pagination v-if="showPaging" v-model="pagination.currentPage" :min="1" :max="maxPage" direction-links
        boundary-links icon-first="keyboard_double_arrow_left" icon-last="keyboard_double_arrow_right"
        icon-prev="chevron_left" icon-next="chevron_right" @update:model-value="handlePageChange" gutter="xs"
        padding="2px 4px 2px 4px" round color="grey-8" active-color="primary" />
    </div>
    <div class="col-2">
      <q-select dense outlined v-model="pagination.pageSize" :options="[5, 10, 20]"
        @update:model-value="handlePageChange" transition-show="flip-up" transition-hide="flip-down" class="q-pl-lg"
        input-class="text-red" popup-content-class="text-body2 text-weight-medium text-grey-8" />
    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted,
    computed,
    //defineEmits
  } from "vue"

  const props = defineProps({
    pagination: Object
  })

  const pagination = ref(props.pagination)
  const defaultPageSize = 5

  const showPagebar = computed(() => {
    return pagination.value.totalItems > defaultPageSize
  })

  const showPaging = computed(
    () => pagination.value.totalItems > pagination.value.pageSize
  )
  const maxPage = computed(() =>
    Math.ceil(pagination.value.totalItems / pagination.value.pageSize)
  )

  const emits = defineEmits(["page-changed"])
  function handlePageChange() {
    emits("page-changed", pagination.value)
  }
</script>