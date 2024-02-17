<template>
  <div style="margin-bottom: 40px;">
    <q-page-sticky
      class="z-1 bg-main"
      style="padding-top: 12px;padding-bottom: 12px;"
      position="top"
      expand
    >
      <q-toolbar style="padding-left: 20px; padding-right: 20px;">
        <div class="row items-center q-gutter-sm">
          <slot name="buttons">
            <template v-if="tableStore?.activeRow?.value != null">
              <slot name="bootons-edit">
                <q-btn
                  :to="`${baseRoute}/edit/${tableStore?.activeRow?.value.id}`"
                  class="text-caption"
                  round
                  unelevated
                  no-caps
                >
                  <q-icon name="o_edit" />
                </q-btn>
              </slot>
            </template>

            <template v-if="selectedIds?.length > 0">
              <slot name="buttons-batch-action">
              </slot>
              <slot name="buttons-delete">
                <q-btn
                  class="text-caption"
                  round
                  unelevated
                  no-caps
                  @click="crudStore.deleteBatch(selectedIds, tableStore.reloadData)"
                >
                  <q-icon name="o_delete" />
                </q-btn>
              </slot>
            </template>

            <template v-if="selectedIds?.length > 0">
              <q-btn
                class="text-caption"
                round
                unelevated
              >
                <q-icon name="more_horiz" />
                <q-menu
                  fit
                  :offset="[0, 20]"
                >
                  <q-list
                    dense
                    padding
                    style="width:220px"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="tableStore.reloadData"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          >
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
                      <q-item
                        clickable
                        v-close-popup
                        tabindex="0"
                        @click="crudStore.activate(selectedIds, tableStore.reloadData)"
                      >
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar
                              class="bg-on-dark"
                              size="sm"
                            ><q-icon name="o_check" /></q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-caption">
                            {{ $t("shared.labels.activate") }}
                          </div>
                        </q-item-section>
                      </q-item>

                      <q-item
                        clickable
                        v-close-popup
                        tabindex="0"
                        @click="crudStore.deactivate(selectedIds, tableStore.reloadData)"
                      >
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar
                              class="bg-on-dark"
                              size="sm"
                            >
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

                    <slot name="bottons-custom">
                    </slot>

                    <q-separator class="q-my-sm" />

                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="tableStore.exportAll()"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          ><q-icon
                              name="o_download"
                              size="16px"
                            /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">
                          {{ $t("shared.labels.eportToExcel") }}
                        </div>
                      </q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="tableStore.exportCurrentPage()"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          >
                            <q-icon
                              name="o_download"
                              size="16px"
                            />
                          </q-avatar>
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
            </template>
          </slot>
        </div>

        <div class="q-space" />

        <template v-if="selectedIds?.length > 0">
          {{ selectedIds?.length }} selected
          <q-btn
            round
            unelevated
            class="text-on-dark"
            icon="close"
            @click="deselect"
          >
          </q-btn>
        </template>
        <template v-else>
          <div
            v-if="title"
            class="row items-center"
          >
            <slot name="header">
              <span :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'">
                <slot name="header-title">
                  <span class="no-letter-spacing">{{ title }}</span>
                  <q-btn
                    v-if="tableStore?.pagination.value.totalItems > 0"
                    rounded
                    unelevated
                    dense
                    padding="2px 8px"
                    outline
                    :label="tableStore?.pagination.value.totalItems"
                    class="q-ml-sm bg-dark text-on-dark text-body2 no-pointer-events"
                  />
                </slot>
              </span>
              <!-- <back-button class="q-ml-md" /> -->
            </slot>
          </div>
        </template>
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  title: String,
  baseRoute: String,
  tableStore: Object,
  crudStore: Object,
  activation: Boolean
})

const selectedIds = computed(() => props.tableStore?.selectedRows?.value.map(item => item.id))
function deselect() {
  props.tableStore.selectAll(false)
  props.tableStore.setActiveRow(null)
}
</script>
