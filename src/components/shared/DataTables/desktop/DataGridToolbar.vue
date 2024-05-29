<template>
  <div class="q-pa-md row items-center q-gutter-xs">
    <q-btn
      size="11px"
      round
      unelevated
      @click="tableStore.reloadData"
    >
      <q-icon size="24px" name="o_refresh" />
      <q-tooltip :delay="700" class="custom-tooltip">
        <div class="text-body2 no-letter-spacing">تازه‌سازی</div>
      </q-tooltip>
    </q-btn>

    <q-btn
      size="11px"
      round
      unelevated
      @click="tableStore.toggleFullscreen"
    >
      <q-icon
        size="24px"
        :name="
          tableStore.inFullscreen.value
            ? 'fullscreen_exit'
            : 'fullscreen'
        "
      />
      <q-tooltip
        :delay="700"
        class="custom-tooltip"
        :anchor="
          tableStore.inFullscreen.value
            ? 'bottom end'
            : 'bottom middle'
        "
        :self="
          tableStore.inFullscreen.value ? 'top end' : 'top middle'
        "
      >
        <div class="text-body2 no-letter-spacing">
          <template v-if="tableStore.inFullscreen.value">
            خروج از تمام صفحه
          </template>
          <template v-else>تمام صفحه</template>
        </div>
      </q-tooltip>
    </q-btn>

    <q-btn
      size="11px"
      round
      unelevated
      @click="tableStore.toggleDense"
    >
      <q-icon
        size="21px"
        :name="tableStore.dense.value ? 'o_height' : 'o_zoom_in_map'"
      />
      <q-tooltip
        :delay="700"
        class="custom-tooltip"
        :anchor="
          tableStore.dense.value ? 'bottom end' : 'bottom middle'
        "
        :self="tableStore.dense.value ? 'top end' : 'top middle'"
      >
        <div class="text-body2 no-letter-spacing">
          <template v-if="tableStore.dense.value">استاندارد</template>
          <template v-else>فشرده</template>
        </div>
      </q-tooltip>
    </q-btn>

    <q-btn
      size="11px"
      round
      unelevated
      @click="tableStore.toggleFontSize"
    >
      <q-icon size="20px" name="format_size" />
      <q-tooltip
        :delay="700"
        class="custom-tooltip"
        :anchor="
          tableStore.inFullscreen.value
            ? 'bottom end'
            : 'bottom middle'
        "
        :self="
          tableStore.inFullscreen.value ? 'top end' : 'top middle'
        "
      >
        <div class="text-body2 no-letter-spacing">
          <template v-if="tableStore.tdFontSize.value === 13">
            فونت معمولی
          </template>
          <template v-else>فونت درشت</template>
        </div>
      </q-tooltip>
    </q-btn>

    <q-btn
      size="11px"
      round
      unelevated
      @click="tableStore.toggleSeparator"
    >
      <q-icon size="20px" name="format_underlined" />
      <q-tooltip
        :delay="700"
        class="custom-tooltip"
        :anchor="
          tableStore.separator.value ? 'bottom end' : 'bottom middle'
        "
        :self="tableStore.separator.value ? 'top end' : 'top middle'"
      >
        <div class="text-body2 no-letter-spacing">
          <template v-if="tableStore.separator.value === 'none'">
            خط‌ دار
          </template>
          <template v-else>بدون خط</template>
        </div>
      </q-tooltip>
    </q-btn>

    <q-btn
      v-if="false"
      padding="6px 16px"
      size="11px"
      unelevated
      rounded
    >
      <div class="row items-center">
        <q-icon class="q-mr-sm" name="o_visibility_off" />
        <div class="text-body2 no-letter-spacing">خاموش کردن</div>
      </div>

      <q-tooltip :delay="700" class="custom-tooltip">
        <div class="text-body2 no-letter-spacing">
          مخفی کردن ستون‌ها
        </div>
      </q-tooltip>
      <q-menu
        :offset="[0, 10]"
        style="width: 300px"
        class="border-radius-md"
      >
        <q-card class="bordered border-radius-md">
          <q-card-section>
            <div
              class="q-mb-md text-body2 no-letter-spacing text-weight-500"
            >
              نمایش ستون‌ها
            </div>

            <q-input
              inputmode="search"
              color="grey-5"
              outlined
              v-model="searchInCloumns"
              placeholder="جستجو"
              dense
              rounded
              clearable
              clear-icon="o_close"
              class="full-width text-body2 no-letter-spacing"
            >
              <template v-slot:prepend>
                <q-icon name="o_search" color="primary" size="24px" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row items-center">
              <q-checkbox dense size="40px" class="q-mr-sm" />
              <div class="text-body2 no-letter-spacing">
                انتخاب همه
              </div>
            </div>

            <div
              :class="
                $q.dark.isActive ? 'text-grey-5' : 'text-grey-7'
              "
              class="q-ml-sm q-my-md text-body2 no-letter-spacing"
            >
              ستون‌ها
            </div>
            <div class="column">
              <q-item
                class="rounded-borders"
                style="min-height: 38px; padding: 0 6px"
                clickable
              >
                <div class="row items-center">
                  <div>
                    <q-checkbox class="q-mr-sm" dense />
                  </div>
                  <div class="text-body2 no-letter-spacing">#</div>
                </div>
              </q-item>
              <q-item
                class="rounded-borders"
                style="min-height: 38px; padding: 0 6px"
                clickable
              >
                <div class="row items-center">
                  <div>
                    <q-checkbox class="q-mr-sm" dense />
                  </div>
                  <div class="text-body2 no-letter-spacing">
                    شماره
                  </div>
                </div>
              </q-item>
              <q-item
                class="rounded-borders"
                style="min-height: 38px; padding: 0 6px"
                clickable
              >
                <div class="row items-center">
                  <div>
                    <q-checkbox class="q-mr-sm" dense />
                  </div>
                  <div class="text-body2 no-letter-spacing">
                    تاریخ
                  </div>
                </div>
              </q-item>
              <q-item
                class="rounded-borders"
                style="min-height: 38px; padding: 0 6px"
                clickable
              >
                <div class="row items-center">
                  <div>
                    <q-checkbox class="q-mr-sm" dense />
                  </div>
                  <div class="text-body2 no-letter-spacing">
                    مشتری
                  </div>
                </div>
              </q-item>
            </div>
          </q-card-section>
        </q-card>
      </q-menu>
    </q-btn>

    <q-btn size="11px" round unelevated @click="tableStore.print">
      <q-icon size="21px" name="o_print" />
      <q-tooltip :delay="700" class="custom-tooltip">
        <div class="text-body2 no-letter-spacing">چاپ دسته‌ای</div>
      </q-tooltip>
    </q-btn>

    <q-btn size="11px" round unelevated>
      <q-icon size="21px" name="o_download" />
      <q-tooltip :delay="700" class="custom-tooltip">
        <div class="text-body2 no-letter-spacing">تبدیل به اکسل</div>
      </q-tooltip>

      <q-menu
        :offset="[0, 10]"
        style="width: 250px"
        class="border-radius-md"
      >
        <q-card class="bordered border-radius-md">
          <q-list dense padding>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="tableStore.exportAll()"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon name="o_download" size="20px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2 no-letter-spacing">
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
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon name="o_download" size="20px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2 no-letter-spacing">
                  {{ $t("shared.labels.exportExcelCurrentPage") }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps({
    tableStore: Object,
  });

  const separatorTypes = [
    {
      label: "خط دار",
      value: "horizontal",
    },
    {
      label: "بدون خط",
      value: "none",
    },
  ];
</script>
