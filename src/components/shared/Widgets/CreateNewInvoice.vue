<template>
  <q-card class="no-shadow bordered fit">
    <div class="row fit items-center">
      <div class="col-7 q-pa-xl column q-gutter-y-md">
        <span class="text-h4 text-bold">به لاندا خوش آمدید</span>
        <span class="text-body2 line-height-sm text-justify">
          {{ currentInformation }}
        </span>
        <q-btn
          to="/sls/invoice/create"
          unelevated
          rounded
          class="bordered-btn bg-dark q-py-sm"
        ><q-icon
            name="o_add"
            size="16px"
            class="q-mr-xs"
          />ایجاد فاکتور</q-btn>
      </div>
      <div class="col row items-center">
        <img
          src="hello.svg"
          style="width: 250px;"
          alt=""
        >
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const information = ref([
  'نسبت جاری از تقسیم داراییهای جاری بر بدهی‌های جاری حاصل می‌شود دارایی جاری به داراییهایی گفته می‌شود كه به سرعت و به سهولت به وجه نقد تبدیل می‌شود و بدهی جاری به بدهی‌هایی گفته می‌شود كه با سررسید كمتر از یک سال است. نسبت جاری بیشتر می‌تواند بیانگر وضعیت مطلوب نقدینگی باشد. اگر این عدد بزرگتر از 2 باشد مطلوب است و وام دهندگان بزرگ مانند بانکها به این کسب و کار نظر مساعدی خواهند داشت.',
  'دوره وصول مطالبات بیانگر تعداد روزهایی است كه طول می‌كشد شركت مطالبات خود را وصول كند. هر چه این نسبت كوچكتر باشد بهتر است زیرا به این معناست كه مطالبات شركت سریعتر وصول می‌شود. البته كوچک بودن بیش از حد آن به معنای شرایط اعتباری سخت شركت است که ممکن به ضرر شرکت تمام شود.',
  'حاشیه سود خالص از تقسیم درآمد خالص (سود خالص) بر فروش خالص بدست می آید و این نسبت بیانگر این است كه چند درصد از فروش را سود خالص تشكیل می‌دهد. ضعف این نسبت آنست كه بسیاری از هزینه‌ها همانند هزینه تامین مالی كه در محاسبه سود خالص لحاظ شده‌اند ارتباطی به فعالیت فروش نداشته ولی درنسبت ظاهرمی‌گردد. تغییرات این نسبت تحت تاثیر سه عامل حجم فروش، سیاست قیمت گذاری، و ساختار هزینه دارد. این نسبت هرچه بالاتر باشد بهتر است.',
  'نسبت بدهی نشان می‌دهد چند درصد از داراییها از محل بدهی‌ها تامین شده است. (دارایی = بدهی + سرمایه) هرچه این نسبت افزایش یابد سودآوری شركت افزایش خواهد یافت مشروط بر اینكه نرخ بازده داراییها بیش از نرخ بهره‌ی بدهی‌ها باشد. این نسبت توانایی شركت درتحمل كاهش خالص داراییها براثر زیانهای وارده بدون به مخاطره افتادن منابع اعتبار دهندگان را نشان می‌دهد. عدد قابل قبول برای این نسبت بستگی به ثبات سودآوری در طول سالیان مختلف دارد هرچه ثبات سودآوری تاریخی بیشتر باشد اعتباردهندگان و سرمایه‌گذاران نسبتهای بالاتری را تحمل خواهند كرد.',
]);
const currentIndex = ref(0);
const intervalDuration = 20000;

const updateInformation = () => {
  currentIndex.value = (currentIndex.value + 1) % information.value.length;
  currentInformation.value = information.value[currentIndex.value];
};

let intervalId = null;

onMounted(() => {
  intervalId = setInterval(updateInformation, intervalDuration);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const currentInformation = ref(information.value[currentIndex.value]);
</script>
