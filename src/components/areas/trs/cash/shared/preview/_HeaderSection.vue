<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-6">
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-sm-6">
          <div class="text-caption">عنوان:</div>
          <div class="text-body2">{{ model?.title }}</div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="text-caption">کد:</div>
          <div class="text-body2">{{ model?.code }}</div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-sm-6">
          <div class="text-caption">تاریخ:</div>
          <div class="text-body2">{{ model?.date }}</div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="text-caption">مبلغ:</div>
          <div class="text-body2">{{ model?.amount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    model: Object,
  });
</script>
