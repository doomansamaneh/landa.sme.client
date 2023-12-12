<template>
  <tool-bar>
    <template #header>
      <q-badge
        v-if="tableStore?.pagination.value.totalItems > 0"
        rounded
        outline
        :label="tableStore?.pagination.value.totalItems"
        class="q-mr-sm bg-dark text-on-dark text-body2"
      />
      <span class="text-h6">ایجاد فاکتور فروش</span>
    </template>
    <template #buttons>
      <q-btn
        class="bg-primary text-white text-caption"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        <q-icon
          name="o_add"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.save") }}
      </q-btn>
      <q-btn
        class="bordered-btn_bg-dark text-caption"
        rounded
        unelevated
      >
        <q-icon
          name="more_horiz"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.more") }}

        <q-menu
          fit
          :offset="[0, 20]"
        >
          <q-list
            dense
            padding
            style="width:200px"
          >
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="dark-icon"
                    size="sm"
                  ><q-icon
                      name="o_refresh"
                      size="14px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تازه‌سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="dark-icon"
                    size="sm"
                  ><q-icon
                      name="o_close"
                      size="14px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">غیر‌فعال‌سازی</div>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="dark-icon"
                    size="sm"
                  ><q-icon
                      name="o_check"
                      size="14px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">فعال سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="dark-icon"
                    size="sm"
                  ><q-icon
                      name="o_download"
                      size="16px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تبدیل به اکسل</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>

      </q-btn>
    </template>
  </tool-bar>
  <q-card
    class="bordered q-pa-md fit"
    style="margin-top: 40px;"
  >
    <q-card-section>
      <master-section style="margin-bottom: 90px;" />
    </q-card-section>
    <q-card-section>
      <detail-section />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue"
import ToolBar from "src/components/shared/ToolBar.vue"
import MasterSection from "src/components/areas/sls/invoice/create/MasterSection.vue"
import DetailSection from "src/components/areas/sls/invoice/create/DetailSection.vue"
</script>


