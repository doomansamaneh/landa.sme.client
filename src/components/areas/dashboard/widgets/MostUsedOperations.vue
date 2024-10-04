<template>
  <div class="full-width">
    <!-- <div style="width: 150px" class="q-mb-sm text-body2 no-letter-spacing">
      پرکاربردترین عملیات‌ها:
    </div> -->
    <div class="col-md">
      <q-scroll-area
        :horizontal-bar-style="helper.horizontalThumbStyle"
        :horizontal-thumb-style="helper.horizontalBarStyle"
        style="height: 34px"
      >
        <div class="row items-center q-gutter-sm no-wrap">
          <q-btn
            :to="item.address"
            unelevated
            v-for="item in items"
            :key="item.id"
            class="desktop-toolbar-gradient text-on-dark q-py-xs q-px-sm text-center text-body3 no-letter-spacing bordered border-radius-lg"
            style="white-space: nowrap"
          >
            {{ item.name }}
          </q-btn>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";

  const items = [
    {
      id: 1,
      name: "دریافت و پرداخت",
      description: "مدیریت تراکنش‌های مالی مربوط به دریافت و پرداخت.",
      type: "financial",
    },
    {
      id: 2,
      name: "برگشت از فروش",
      description:
        "ثبت و پیگیری بازگشت کالاهای فروخته شده و اصلاح فاکتور.",
      type: "sales",
    },
    {
      id: 3,
      name: "پیش فاکتورها",
      description: "ایجاد و مدیریت پیش‌فاکتورها قبل از فروش نهایی.",
      type: "invoice",
    },
    {
      id: 4,
      name: "فاکتورهای فروش",
      description: "مدیریت و ثبت فاکتورهای نهایی فروش به مشتریان.",
      type: "invoice",
    },
    {
      id: 5,
      name: "سفارشات خرید",
      description: "پیگیری سفارشات خرید کالا و ثبت تراکنش‌ها.",
      type: "purchase",
    },
    {
      id: 6,
      name: "تحویل کالا",
      description: "مدیریت عملیات تحویل کالا به مشتریان پس از فروش.",
      type: "delivery",
    },
    {
      id: 7,
      name: "برگشت از خرید",
      description: "ثبت و پیگیری برگشت کالاهای خریداری شده.",
      type: "purchase",
    },
    {
      id: 8,
      name: "گزارشات مالی",
      description:
        "تهیه گزارشات مالی جامع برای پیگیری عملکرد کسب‌وکار.",
      type: "financial",
    },
    {
      id: 9,
      name: "تنظیمات سیستم",
      description: "مدیریت تنظیمات و پیکربندی‌های نرم‌افزار.",
      type: "settings",
    },
    {
      id: 10,
      name: "مدیریت کاربران",
      description: "ایجاد و مدیریت دسترسی کاربران به سیستم.",
      type: "user-management",
    },
    {
      id: 11,
      name: "گزارشات انبار",
      description: "پیگیری وضعیت انبارها و موجودی کالا.",
      type: "inventory",
    },
    {
      id: 12,
      name: "گزارشات انبار",
      description: "پیگیری وضعیت انبارها و موجودی کالا.",
      type: "inventory",
    },
    {
      id: 13,
      name: "گزارشات انبار",
      description: "پیگیری وضعیت انبارها و موجودی کالا.",
      type: "inventory",
    },
    {
      id: 14,
      name: "انواع مالیات بر ارزش افزوده",
      description: "پیگیری وضعیت انبارها و موجودی کالا.",
      type: "inventory",
    },
  ];
</script>
