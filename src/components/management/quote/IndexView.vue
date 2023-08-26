<template>
  <q-page-sticky position="top" expand class="toolbar gt-xs z-max">
    <q-toolbar class="gt-xs main-layout-color text-white q-px-lg">
      <div class="q-gutter-x-md">
        <q-btn
          color="btn-icon white bg-blue-7"
          rounded
          flat
          class="text-caption"
          padding="5px 10px"
        >
          <q-icon name="add_circle_outline" class="q-pr-xs" />
          <span class="">ایجاد</span>
        </q-btn>
        <q-btn
          color="grey-8"
          rounded
          outline
          class="btn-icon text-caption"
          padding="5px 10px"
        >
          <q-icon name="o_edit" class="q-pr-xs" />
          <span class="text">ویرایش</span>
        </q-btn>
        <q-btn
          color="grey-8"
          rounded
          outline
          class="btn-icon text-caption"
          padding="5px 10px"
        >
          <q-icon name="o_delete" class="q-pr-xs" />
          <span class="text">حذف</span>
        </q-btn>
        <q-btn
          color="grey-8"
          rounded
          outline
          class="btn-icon text-caption"
          padding="5px 10px"
        >
          <q-icon name="o_more_horiz" class="q-pr-xs" />
          <span class="text">بیشتر</span>
        </q-btn>
      </div>
    </q-toolbar>
  </q-page-sticky>
</template>

<script setup></script>
