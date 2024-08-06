<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-6 col-xs-12">
      <ratio-widget
        title="حاشیه سود"
        :ratio="ratioStore.model.value.netMargin"
        ratio-sign="%"
      >
        <template #avatar>
          <q-avatar
            round
            text-color="white"
            icon="o_attach_money"
            size="xl"
            class="bluegrey-gradient bluegrey-shadow"
          />
        </template>
        <template #info>
          <strong>حاشیه سود خالص</strong>
          از تقسیم درآمد خالص (سود خالص) بر فروش خالص بدست می آید و
          این نسبت بیانگر این است كه چند درصد از فروش را سود خالص
          تشكیل می‌دهد. ضعف این نسبت آنست كه بسیاری از هزینه‌ها همانند
          هزینه تامین مالی كه در محاسبه سود خالص لحاظ شده‌اند ارتباطی
          به فعالیت فروش نداشته ولی درنسبت ظاهرمی‌گردد. تغییرات این
          نسبت تحت تاثیر سه عامل حجم فروش، سیاست قیمت گذاری، و ساختار
          هزینه دارد. این نسبت هرچه بالاتر باشد بهتر است.
        </template>
      </ratio-widget>
    </div>
    <div class="col-md-6 col-xs-12">
      <ratio-widget
        title="نسبت بدهی"
        :ratio="ratioStore.model.value.debtRatio"
        ratio-sign="%"
      >
        <template #avatar>
          <q-avatar
            round
            text-color="white"
            icon="o_group_remove"
            size="xl"
            class="primary-gradient primary-shadow"
          />
        </template>
        <template #info>
          <strong>نسبت بدهی</strong>
          نشان می‌دهد چند درصد از داراییها از محل بدهی‌ها تامین شده
          است. (دارایی = بدهی + سرمایه) هرچه این نسبت افزایش یابد
          سودآوری شركت افزایش خواهد یافت مشروط بر اینكه نرخ بازده
          داراییها بیش از نرخ بهره‌ی بدهی‌ها باشد. این نسبت توانایی
          شركت درتحمل كاهش خالص داراییها براثر زیانهای وارده بدون به
          مخاطره افتادن منابع اعتبار دهندگان را نشان می‌دهد. عدد قابل
          قبول برای این نسبت بستگی به ثبات سودآوری در طول سالیان مختلف
          دارد هرچه ثبات سودآوری تاریخی بیشتر باشد اعتباردهندگان و
          سرمایه‌گذاران نسبتهای بالاتری را تحمل خواهند كرد.
        </template>
      </ratio-widget>
    </div>
    <div class="col-md-6 col-xs-12">
      <ratio-widget
        title="نسبت جاری"
        :ratio="ratioStore.model.value.currentRatio"
        ratio-sign=""
        :fraction="2"
      >
        <template #avatar>
          <q-avatar
            round
            text-color="white"
            icon="o_exposure_plus_2"
            size="xl"
            class="green-gradient green-shadow"
          />
        </template>
        <template #info>
          <strong>نسبت جاری</strong>
          از تقسیم داراییهای جاری بر بدهی‌های جاری حاصل می‌شود دارایی
          جاری به داراییهایی گفته می‌شود كه به سرعت و به سهولت به وجه
          نقد تبدیل می‌شود و بدهی جاری به بدهی‌هایی گفته می‌شود كه با
          سررسید كمتر از یک سال است. نسبت جاری بیشتر می‌تواند بیانگر
          وضعیت مطلوب نقدینگی باشد. اگر این عدد بزرگتر از 2 باشد مطلوب
          است و وام دهندگان بزرگ مانند بانکها به این کسب و کار نظر
          مساعدی خواهند داشت.
        </template>
      </ratio-widget>
    </div>
    <div class="col-md-6 col-xs-12">
      <ratio-widget
        title="دوره وصول مطالبات"
        :ratio="ratioStore.model.value.dso"
        ratio-sign="روز"
      >
        <template #avatar>
          <q-avatar
            round
            text-color="white"
            icon="o_hourglass_empty"
            size="xl"
            class="pink-gradient pink-shadow"
          />
        </template>
        <template #info>
          <strong>دوره وصول مطالبات</strong>
          بیانگر تعداد روزهایی است كه طول می‌كشد شركت مطالبات خود را
          وصول كند. هر چه این نسبت كوچكتر باشد بهتر است زیرا به این
          معناست كه مطالبات شركت سریعتر وصول می‌شود. البته كوچک بودن
          بیش از حد آن به معنای شرایط اعتباری سخت شركت است که ممکن به
          ضرر شرکت تمام شود.
        </template>
      </ratio-widget>
    </div>
  </div>
</template>

<script setup>
  import { useRatios } from "../../acc/_composables/useRatios";
  import RatioWidget from "./_RatioWidget.vue";

  const ratioStore = useRatios();
</script>
<style>
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: end;
    gap: 24px;
  }

  .gap-24 {
    gap: 24px;
  }
</style>
