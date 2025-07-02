<template>
  <q-dialog
    v-model="modelValue"
    :maximized="$q.screen.xs"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card :style="$q.screen.xs ? '' : 'min-width: 750px'">
      <q-card-section
        class="row items-center justify-between z-1"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
        style="position: sticky; top: 0"
      >
        <div class="col-8 text-body1 text-weight-700">
          پرسشهای متداول در اتصال به سامانه مودیان
        </div>

        <div>
          <q-btn
            no-caps
            icon="close"
            class="col-1 icon-hover dark-3"
            flat
            round
            dense
            v-close-popup
          />
        </div>

        <q-separator class="absolute-bottom" />
      </q-card-section>

      <q-card-section>
        <div class="text-body1 text-weight-700">
          وضعیت
          <q-badge
            class="text-weight-500 text-body3 bg-yellow-3 text-orange-9"
            rounded
            outline
          >
            IN_PROGRESS
          </q-badge>
          به چه معناست؟
        </div>
        <p class="text-body2 q-mt-sm">
          اگر صف ارسال صورتحساب‌ها به سامانه مودیان پر باشد، سامانه،
          فاکتورها را به وضعیت
          <q-badge
            class="text-weight-500 text-body3 bg-yellow-3 text-orange-9"
            rounded
            outline
          >
            IN_PROGRESS
          </q-badge>
          تغییر می‌دهد. با رفرش مجدد فاکتور در لاندا، می‌تواند از
          آخرین وضعیت آن مطلع شوید.
        </p>
        <div class="text-body1 text-weight-700">
          وضعیت
          <q-badge
            class="text-weight-500 text-body3 bg-red-2 text-red-8"
            rounded
            outline
          >
            FAILED
          </q-badge>
          به چه معناست؟
        </div>
        <p class="text-body2 q-mt-sm">
          در این حالت، با توجه به متن پیام، باید پیکربندی سامانه
          مودیان را چک بفرمایید. به ترتیب مواردی از جمله صحت درستی و
          تنظیم کلید عمومی و خصوصی، تاریخ فاکتور، فعال بودن کارپوشه
          مالیاتی، صحت شناسه ملی و شماره اقتصادی خریدار و فروشنده، صحت
          درستی نوع فروش، صحت شناسه مالیاتی کالاها و خدمات، بررسی
          شناسه مالیاتی واحدهای سنجش و بررسی ضرایب مالیاتی کالاها و
          خدمات را انجام دهید.
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup></script>
