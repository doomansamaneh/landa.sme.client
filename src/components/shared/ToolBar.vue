<template>
  <q-page-sticky
    class="z-1 bg-main q-px-xl q-py-md"
    position="top"
    expand
  >
    <q-toolbar class="q-mx-sm">
      <div class="row items-center">
        <slot name="header">
          <span class="text-h6">{{ title }}</span>
          <q-badge
            rounded
            outline
            label="15"
            class="q-ml-sm bg-dark text-on-dark text-body2"
          />
        </slot>
      </div>
      <div class="q-space" />
      <div class="q-gutter-x-sm">
        <slot name="buttons">
          <q-btn
            class="bg-primary text-white text-caption"
            padding="6px 12px"
            rounded
            unelevated
          >
            <q-icon
              name="o_add"
              class="q-mr-xs"
            />
            {{ $t("shared.labels.create") }}
          </q-btn>
          <q-btn
            class="bordered-btn bg-dark text-caption"
            padding="6px 12px"
            rounded
            unelevated
          ><q-icon
              name="o_edit"
              class="q-mr-xs"
            />
            {{ $t("shared.labels.edit") }}
          </q-btn>
          <q-btn
            class="bordered-btn bg-dark text-caption"
            padding="6px 12px"
            rounded
            unelevated
          >
            <q-icon
              name="o_delete"
              class="q-mr-xs"
            />
            {{ $t("shared.labels.delete") }}
          </q-btn>
          <q-btn
            class="bordered-btn bg-dark text-caption"
            padding="6px 12px"
            rounded
            unelevated
          >
            <q-icon
              name="more_horiz"
              class="q-mr-xs"
            />
            {{ $t("shared.labels.more") }}
          </q-btn>
        </slot>
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
