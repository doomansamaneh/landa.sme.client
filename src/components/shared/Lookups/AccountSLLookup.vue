<template>
  <lookup-view
    dataSource="acc/accountSL/getlookupData"
    textTemplate="{{code}} - {{ title }}"
    columns="code,title"
    sortColumn="code"
    :filterExpression="filterExpression"
    ref="lookup"
  >
    <template #thead-index>
      <div>#</div>
    </template>

    <template #thead-cols>
      <div class="col-1">کد</div>
      <div class="col">عنوان</div>
    </template>

    <template #tbody-index="{ index }">
      <div>{{ index + 1 }}</div>
    </template>

    <template #tbody-cols="{ item }">
      <div class="col-1">{{ item.code }}</div>
      <div class="col">
        <span class="q-mr-sm text-body2 no-letter-spacing">
          {{ item.title }}
        </span>
        <small class="text-body3 no-letter-spacing">
          ({{ item.glTitle }})
        </small>
      </div>
    </template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";
  import LookupView from "src/components/shared/dataTables/LookupView.vue";

  const props = defineProps({
    filterExpression: Array,
  });

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
