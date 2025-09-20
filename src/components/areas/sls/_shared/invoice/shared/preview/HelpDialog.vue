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
          صورتحساب به سامانه مودیان ارسال شده و در حال پردازش است. بسته به شلوغی سرورهای مالیاتی، پردازش ممکن است تا ۷۲ ساعت طول بکشد. در صورت موفقیت، وضعیت به SUCCESS تغییر می‌کند؛ در غیر این صورت به FAILED تغییر یافته و لازم است خطاهای اعلام شده را برطرف کرده و دوباره اقدام به ارسال نمایید.
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
          چند خطا در ارسال وجود دارد. مهم‌ترین آن‌ها در ادامه آمده است. لطفاً پس از رفع خطاها، دوباره اقدام کنید.
          <ul>
            <li>خطای شماره مالیات صورتحساب</li>
            <li>خطای تاریخ صورتحساب</li>
            <li>خطای نرخ مالیات بر ارزش افزوده</li>
            <li>خطای شناسه مالیاتی کالا</li>
            <li>...</li>
          </ul>
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup></script>
