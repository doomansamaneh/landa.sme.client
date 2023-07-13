<template>
  <q-card class="card-desktop gt-xs no-shadow q-my-xl">
    <q-item class="card-header q-px-lg q-py-lg">
      <q-item-section>
        <q-item-label class="text-bold text-subtitle1">پرداخت</q-item-label>
        <q-item-label class="q-pt-xs text-subtitle2" caption>
          همه هزینه ها به ریال می باشد
        </q-item-label>
      </q-item-section>
      <div class="flex items-center q-mr-xs">
        <q-icon
          class="dark-3 cursor-pointer"
          size="xs"
          name="o_refresh"
          @click="$emit('reload-data')"
        >
          <q-tooltip>{{ $t("page.buttons.guide-tooltip") }}</q-tooltip>
        </q-icon>
      </div>
      <div class="flex items-center q-gutter-x-md">
        <q-icon
          class="dark-3 cursor-pointer"
          size="xs"
          name="arrow_back"
          @click="$router.go(-1)"
        >
          <q-tooltip>بازگشت</q-tooltip>
        </q-icon>
      </div>
    </q-item>
    <q-separator />
    <q-card-section>
      <q-item-section>
        <div class="row q-px-md justify-between items-center">
          <div class="col-4">
            <div class="business-name flex no-wrap">
              <div class="q-pr-xs">
                <q-icon name="business" class="dark-3" />
              </div>
              <span class="ellipsis text-caption"
                >دومان سامانه برای تست و انجام کارهای دمو</span
              >
            </div>
          </div>
          <div class="col-2 flex justify-center">
            <label>
              <q-icon name="o_category" class="dark-3" />
              <span class="text-caption"> طرح ۲ </span>
            </label>
          </div>
          <div class="col-2 row justify-center">
            <label>
              <q-icon name="o_history" class="dark-3" />
              <span class="text-caption q-pl-xs">۱۴۰۲/۱۱/۱۱ - ۱۴۰۳/۰۱/۲۹</span>
            </label>
          </div>
          <div class="col-2 row justify-center q-pl-lg">
            <label>
              <span class="text-caption q-pl-xs">۴۹۰,۰۰۰</span>
              <span class="q-ml-xs text-caption">ریال</span>
            </label>
          </div>
          <div class="col-2 row justify-center">
            <label class="text-caption">
              <q-icon name="circle" color="orange" size="8px" /> دوره آزمایشی
            </label>
          </div>
        </div>
      </q-item-section>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.card-desktop {
  width: 900px !important;
}

.business-name {
  max-width: 250px;
}
</style>
