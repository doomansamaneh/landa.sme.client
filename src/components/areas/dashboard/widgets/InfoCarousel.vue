<template>
  <q-card class="bordered fit">
    <q-carousel
      animated
      swipeable
      :autoplay="autoplay"
      infinite
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      class="fit"
    >
      <!-- <q-carousel-slide :name="1">
        <div class="row fit items-center">
          <div class="col-8 q-pa-xl column q-gutter-y-md">
            <span class="text-body2 line-height-sm text-justify">
              سلام سوتونم
            </span>
          </div>

        </div>
      </q-carousel-slide> -->

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="fit column justify-center items-center">
          <div class="column items-center">
            <span class="text-h6 text-bold q-mb-md">
              اخبار را از دست ندهید
            </span>
            <span class="text-body1">
              صفحات ما را دنبال کنید تا بروز بمانید
            </span>
          </div>
          <div class="row q-gutter-x-md q-mt-lg">
            <q-btn
              no-caps
              size="md"
              outline
              label="بلاگ"
              href="https://anda-sme.ir/blog"
            />
            <q-btn
              no-caps
              size="md"
              outline
              :label="$t('shared.labels.encyclopedia')"
              href="https://www.landa-sme.ir/LandaKnowledge"
            />
            <q-btn
              no-caps
              size="md"
              outline
              label="فیلم‌های آموزشی"
              href="https://www.landa-sme.ir/Video"
            />
            <q-btn
              no-caps
              size="md"
              outline
              label="اینستاگرام"
              href="https://www.instagram.com/landasme/"
            />
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-card>
</template>

<script setup>
  import { ref, watch } from "vue";

  const slide = ref(2);
  const autoplay = ref(true);

  const informationSets = ref([
    "نسبت جاری از تقسیم داراییهای جاری بر بدهی‌های جاری حاصل می‌شود دارایی جاری به داراییهایی گفته می‌شود كه به سرعت و به سهولت به وجه نقد تبدیل می‌شود و بدهی جاری به بدهی‌هایی گفته می‌شود كه با سررسید كمتر از یک سال است. نسبت جاری بیشتر می‌تواند بیانگر وضعیت مطلوب نقدینگی باشد. اگر این عدد بزرگتر از 2 باشد مطلوب است و وام دهندگان بزرگ مانند بانکها به این کسب و کار نظر مساعدی خواهند داشت.",
    "دوره وصول مطالبات بیانگر تعداد روزهایی است كه طول می‌كشد شركت مطالبات خود را وصول كند. هر چه این نسبت كوچكتر باشد بهتر است زیرا به این معناست كه مطالبات شركت سریعتر وصول می‌شود. البته كوچک بودن بیش از حد آن به معنای شرایط اعتباری سخت شركت است که ممکن به ضرر شرکت تمام شود.",
    "حاشیه سود خالص از تقسیم درآمد خالص (سود خالص) بر فروش خالص بدست می آید و این نسبت بیانگر این است كه چند درصد از فروش را سود خالص تشكیل می‌دهد. ضعف این نسبت آنست كه بسیاری از هزینه‌ها همانند هزینه تامین مالی كه در محاسبه سود خالص لحاظ شده‌اند ارتباطی به فعالیت فروش نداشته ولی درنسبت ظاهرمی‌گردد. تغییرات این نسبت تحت تاثیر سه عامل حجم فروش، سیاست قیمت گذاری، و ساختار هزینه دارد. این نسبت هرچه بالاتر باشد بهتر است.",
    "نسبت بدهی نشان می‌دهد چند درصد از داراییها از محل بدهی‌ها تامین شده است. (دارایی = بدهی + سرمایه) هرچه این نسبت افزایش یابد سودآوری شركت افزایش خواهد یافت مشروط بر اینكه نرخ بازده داراییها بیش از نرخ بهره‌ی بدهی‌ها باشد. این نسبت توانایی شركت درتحمل كاهش خالص داراییها براثر زیانهای وارده بدون به مخاطره افتادن منابع اعتبار دهندگان را نشان می‌دهد. عدد قابل قبول برای این نسبت بستگی به ثبات سودآوری در طول سالیان مختلف دارد هرچه ثبات سودآوری تاریخی بیشتر باشد اعتباردهندگان و سرمایه‌گذاران نسبتهای بالاتری را تحمل خواهند كرد.",
  ]);

  let currentInformationSetIndex = 0;

  watch(slide, (newValue, oldValue) => {
    if (newValue === 1 && oldValue !== null) {
      currentInformationSetIndex =
        (currentInformationSetIndex + 1) %
        informationSets.value.length;
      information.value =
        informationSets.value[currentInformationSetIndex];
    }
  });

  const information = ref(informationSets.value[0]);
</script>
