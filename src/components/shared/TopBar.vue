<template>
  <q-page-sticky
    class="q-py-md z-top bg-main q-px-xl q-py-lg"
    position="top"
    expand
  >
    <q-toolbar>
      <q-toobar-title>
        <span class="text-h5 q-mr-xl">{{ title }}</span>
      </q-toobar-title>
      <div class="q-gutter-x-md">
        <q-btn
          class="bg-primary text-white text-caption"
          padding="6px 12px"
          rounded
          unelevated
          outline
        ><q-icon
            name="o_add"
            class="q-mr-xs"
          />ایجاد</q-btn>
        <q-btn
          class="text-caption"
          padding="6px 12px"
          rounded
          unelevated
          outline
        ><q-icon
            name="o_edit"
            class="q-mr-sm"
          />ویرایش</q-btn>
        <q-btn
          class="text-caption"
          padding="6px 12px"
          rounded
          unelevated
          outline
        ><q-icon
            name="o_delete"
            class="q-mr-sm"
          />حذف</q-btn>
        <q-btn
          class="text-caption"
          padding="6px 12px"
          rounded
          unelevated
          outline
        ><q-icon
            name="more_horiz"
            class="q-mr-sm"
          />بیشتر</q-btn>
      </div>
    </q-toolbar>
  </q-page-sticky>
</template>

<script setup>

const props = defineProps({
  title: String
})

</script>

<style></style>
