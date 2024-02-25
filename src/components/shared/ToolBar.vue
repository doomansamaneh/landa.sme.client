<template>
  <div style="margin-bottom: 56px;">
    <q-page-sticky class="z-1 bg-main" style="padding-top: 12px;padding-bottom: 12px;" position="top" expand>
      <q-toolbar
        :style="$q.screen.gt.sm ? 'padding-left: 38px; padding-right: 38px;' : 'padding-left: 20px; padding-right: 20px;'">
        <div v-if="buttons" class="row items-center q-gutter-sm">
          <slot name="buttons">
            <q-btn class="bg-primary primary-shadow text-white text-caption" padding="6px 12px" rounded no-caps unelevated
              :to="`${baseRoute}/create`">
              <q-icon name="o_add" class="q-mr-xs" />
              {{ $t("shared.labels.create") }}
            </q-btn>

            <template v-if="tableStore?.activeRow?.value != null">
              <slot name="bootons-edit">
                <q-btn :to="`${baseRoute}/edit/${tableStore?.activeRow?.value.id}`" class="text-caption" rounded
                  unelevated no-caps>
                  <q-icon name="o_edit" class="q-mr-xs" />
                  {{ $t("shared.labels.edit") }}
                  <!-- ({{ tableStore?.activeRow?.value?.code }}) -->
                </q-btn>
              </slot>
            </template>

            <template v-if="selectedIds?.length > 0">
              <slot name="buttons-batch-action">
              </slot>
              <slot name="buttons-delete">
                <q-btn class="text-caption" rounded unelevated no-caps
                  @click="crudStore.deleteBatch(selectedIds, tableStore.reloadData)">
                  <q-icon name="o_delete" class="q-mr-xs" />
                  {{ $t("shared.labels.delete") }} ({{ selectedIds?.length }} مورد)
                </q-btn>
              </slot>
            </template>

            <q-btn class="text-caption" rounded unelevated>
              <q-icon name="more_horiz" class="q-mr-xs" />
              {{ $t("shared.labels.more") }}

              <q-menu fit :offset="[0, 20]">
                <q-list dense padding style="width:220px">
                  <q-item clickable v-close-popup tabindex="0" @click="tableStore.reloadData">
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon name="o_refresh" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">
                        {{ $t("shared.labels.refresh") }}
                      </div>
                    </q-item-section>
                  </q-item>

                  <template v-if="activation && selectedIds?.length > 0">
                    <q-separator class="q-my-sm" />
                    <q-item clickable v-close-popup tabindex="0"
                      @click="crudStore.activate(selectedIds, tableStore.reloadData)">
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_check" /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">
                          {{ $t("shared.labels.activate") }}
                        </div>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup tabindex="0"
                      @click="crudStore.deactivate(selectedIds, tableStore.reloadData)">
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar class="bg-on-dark" size="sm">
                            <q-icon name="o_close" />
                          </q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">
                          {{ $t("shared.labels.deactivate") }}
                        </div>
                      </q-item-section>
                    </q-item>
                  </template>

                  <slot name="buttons-custom">
                  </slot>

                  <q-separator class="q-my-sm" />

                  <q-item clickable v-close-popup tabindex="0" @click="tableStore.exportAll()">
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_download" size="16px" /></q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">
                        {{ $t("shared.labels.eportToExcel") }}
                      </div>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup tabindex="0" @click="tableStore.exportCurrentPage()">
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_download" size="16px" /></q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">
                        {{ $t("shared.labels.exportExcelCurrentPage") }}
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </slot>
        </div>

        <div v-if="buttons" class="q-space" />

        <template v-if="buttons">
          <div v-if="title">
            <slot name="header">
              <span :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'">
                <slot name="header-title">
                  <span class="no-letter-spacing">{{ title }}</span>
                  <q-btn v-if="tableStore?.pagination.value.totalItems > 0" rounded unelevated dense padding="2px 8px"
                    outline :label="tableStore?.pagination.value.totalItems"
                    class="q-ml-sm bg-dark text-on-dark text-body2 no-pointer-events" />
                </slot>
              </span>
              <q-space></q-space>
              <back-button v-if="backButton" class="q-ml-md" />
            </slot>
          </div>
        </template>

        <template v-else>
          <slot name="header">
            <span :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'">
              <slot name="header-title">
                <span class="no-letter-spacing">{{ title }}</span>
                <q-btn v-if="tableStore?.pagination.value.totalItems > 0" rounded unelevated dense padding="2px 8px"
                  outline :label="tableStore?.pagination.value.totalItems"
                  class="q-ml-sm bg-dark text-on-dark text-body2 no-pointer-events" />
              </slot>
            </span>
            <q-space></q-space>
            <back-button v-if="backButton" class="q-ml-md" />
          </slot>
        </template>

      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup>
import { computed } from "vue"

import BackButton from "src/components/shared/buttons/GoBackLink.vue"

const props = defineProps({
  title: String,
  baseRoute: String,
  tableStore: Object,
  crudStore: Object,
  activation: Boolean,
  backButton: Boolean,
  buttons: Boolean
})

const selectedIds = computed(() => props.tableStore?.selectedRows?.value.map(item => item.id))
</script>
