<template>
  <div>
    <q-btn
      no-caps
      dense
      unelevated
      text-color="white"
      class="primary-gradient primary-shadow absolute-top-right q-py-xs q-px-sm q-mr-sm"
      style="margin-top: 12px"
      rounded
      size="12px"
    >
      <q-icon name="o_add" size="14px" style="margin-left: 2px" />
      <span class="text-body3">
        {{ $t("shared.labels.create") }}
      </span>
    </q-btn>
  </div>
</template>
