<template>
  <tool-bar>
    <template #header>
      <span :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'">انتخاب مشتری</span>
      <q-btn
        padding="6px 12px"
        flat
        @click="$router.go(-1)"
      >
        <q-icon
          name="arrow_back"
          size="sm"
        />
      </q-btn>
    </template>
    <template #buttons>
      <q-btn
        class="bg-primary text-white text-body2"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        {{ $t("shared.labels.save") }}
      </q-btn>
      <q-btn
        class="bordered-btn_bg-dark text-body2"
        rounded
        unelevated
      >
        {{ $t("shared.labels.more") }}

        <q-menu
          fit
          :offset="[0, 10]"
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
  <mobile-contact-lookup class="q-mt-xl" />
</template>

<script setup>
import MobileContactLookup from 'src/components/shared/Lookups/MobileContactLookup.vue';
import ToolBar from "src/components/shared/ToolBar.vue"
</script>
