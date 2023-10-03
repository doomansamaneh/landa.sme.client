<template>
  <div class="row q-gutter-md">
    <div class="col">
      <q-card class="q-pa-sm bordered">
        <q-card-section class="column justify-center items-center q-gutter-sm">
          <div class="q-gutter-x-xs">
            <span class="text-body1">نسبت جاری</span>
            <q-icon
              name="o_live_help"
              size="xs"
              class="icon"
            >
              <q-tooltip
                max-width="500px"
                :delay="600"
                transition-show="scale"
                transition-hide="scale"
                anchor="center middle"
                self="center middle"
                class="q-pa-lg glass text-on-dark line-height"
              >
                <span class="text-body2">
                  {{ nesbatJari }}
                </span>
              </q-tooltip>
            </q-icon>
          </div>
          <span class="text-bold text-h6 text-primary">17.67</span>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card class="q-pa-sm bordered">
        <q-card-section class="column justify-center items-center q-gutter-sm">
          <div class="q-gutter-x-xs">
            <span class="text-body1">دوره وصول مطالبات</span>
            <q-icon
              name="o_live_help"
              size="xs"
              class="icon"
            >
              <q-tooltip
                max-width="500px"
                :delay="600"
                transition-show="scale"
                transition-hide="scale"
                anchor="center middle"
                self="center middle"
                class="q-pa-lg glass text-on-dark line-height"
              >
                <span class="text-body2">
                  {{ nesbatJari }}
                </span>
              </q-tooltip>
            </q-icon>
          </div>
          <span class="text-bold text-h6 text-primary">329 روز</span>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card class="q-pa-sm bordered">
        <q-card-section class="column justify-center items-center q-gutter-sm">
          <div class="q-gutter-x-xs">
            <span class="text-body1">حاشیه سود</span>
            <q-icon
              name="o_live_help"
              size="xs"
              class="icon"
            >
              <q-tooltip
                max-width="500px"
                :delay="600"
                transition-show="scale"
                transition-hide="scale"
                anchor="center middle"
                self="center middle"
                class="q-pa-lg glass text-on-dark line-height"
              >
                <span class="text-body2">
                  {{ nesbatJari }}
                </span>
              </q-tooltip>
            </q-icon>
          </div>
          <span class="text-bold text-h6 text-primary">32,456.50%</span>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card class="q-pa-sm bordered">
        <q-card-section class="column justify-center items-center q-gutter-sm">
          <div class="q-gutter-x-xs">
            <span class="text-body1">نسبت بدهی</span>
            <q-icon
              name="o_live_help"
              size="xs"
              class="icon"
            >
              <q-tooltip
                max-width="500px"
                :delay="600"
                transition-show="scale"
                transition-hide="scale"
                anchor="center middle"
                self="center middle"
                class="q-pa-lg q-ma-xl glass text-on-dark line-height"
              >
                <span class="text-body2">
                  {{ nesbatJari }}
                </span>
              </q-tooltip>
            </q-icon>
          </div>
          <span class="text-bold text-h6 text-primary">0%</span>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <!-- <div class="q-gutter-md">
    <div class="q-gutter-md q-pb-md">
      <div class="">
        <span class="text-h6">نسبت جاری</span>
        <q-badge
          rounded
          outline
          label="17.67"
          color="primary"
          class="q-ml-sm bg-dark text-bold text-body1 q-py-xs q-px-sm"
        />
      </div>
      <div class="">
        <span class="text-level-2">نسبت جاری از تقسیم داراییهای جاری بر بدهی‌های جاری حاصل می‌شود دارایی جاری به
          داراییهایی گفته می‌شود
          كه به سرعت و به سهولت به وجه نقد تبدیل می‌شود و بدهی جاری به بدهی‌هایی گفته می‌شود كه با سررسید كمتر از یک
          سال است. نسبت جاری بیشتر می‌تواند بیانگر وضعیت مطلوب نقدینگی باشد. اگر این عدد بزرگتر از 2 باشد مطلوب است
          و وام دهندگان بزرگ مانند بانکها به این کسب و کار نظر مساعدی خواهند داشت.</span>
      </div>
    </div>
    <div class="q-gutter-md q-pb-md">
      <div class="">
        <span class="text-h6">دوره وصول مطالبات</span>
        <q-badge
          rounded
          outline
          label="329 روز"
          color="primary"
          class="q-ml-sm bg-dark text-bold text-body1 q-py-xs q-px-sm"
        />
      </div>
      <div class="">
        <span class="text-level-2">
          دوره وصول مطالبات بیانگر تعداد روزهایی است كه طول می‌كشد شركت مطالبات خود را وصول كند. هر چه این نسبت كوچكتر
          باشد بهتر است زیرا به این معناست كه مطالبات شركت سریعتر وصول می‌شود. البته كوچک بودن بیش از حد آن به معنای
          شرایط اعتباری سخت شركت است که ممکن به ضرر شرکت تمام شود.
        </span>
      </div>
    </div>
    <div class="q-gutter-md q-pb-md">
      <div class="">
        <span class="text-h6">نسبت بدهی</span>
        <q-badge
          rounded
          outline
          label="0%"
          color="primary"
          class="q-ml-sm bg-dark text-bold text-body1 q-py-xs q-px-sm"
        />
      </div>
      <div class="">
        <span class="text-level-2">
          دوره وصول مطالبات بیانگر تعداد روزهایی است كه طول می‌كشد شركت مطالبات خود را وصول كند. هر چه این نسبت كوچكتر
          باشد بهتر است زیرا به این معناست كه مطالبات شركت سریعتر وصول می‌شود. البته كوچک بودن بیش از حد آن به معنای
          شرایط اعتباری سخت شركت است که ممکن به ضرر شرکت تمام شود.
        </span>
      </div>
    </div>
    <div class="q-gutter-md q-pb-md">
      <div class="">
        <span class="text-h6">حاشیه سود</span>
        <q-badge
          rounded
          outline
          label="32,456.50%"
          color="primary"
          class="q-ml-sm bg-dark text-bold text-body1 q-py-xs q-px-sm"
        />
      </div>
      <div class="">
        <span class="text-level-2">
          دوره وصول مطالبات بیانگر تعداد روزهایی است كه طول می‌كشد شركت مطالبات خود را وصول كند. هر چه این نسبت كوچكتر
          باشد بهتر است زیرا به این معناست كه مطالبات شركت سریعتر وصول می‌شود. البته كوچک بودن بیش از حد آن به معنای
          شرایط اعتباری سخت شركت است که ممکن به ضرر شرکت تمام شود.
        </span>
      </div>
    </div>
  </div> -->
</template>

<script setup>

const nesbatJari = "نسبت جاری از تقسیم داراییهای جاری بر بدهی‌های جاری حاصل می‌شود دارایی جاری به داراییهایی گفته می‌شود كه به سرعت و به سهولت به وجه نقد تبدیل می‌شود و بدهی جاری به بدهی‌هایی گفته می‌شود كه با سررسید كمتر از یک سال است. نسبت جاری بیشتر می‌تواند بیانگر وضعیت مطلوب نقدینگی باشد. اگر این عدد بزرگتر از 2 باشد مطلوب است و وام دهندگان بزرگ مانند بانکها به این کسب و کار نظر مساعدی خواهند داشت."

</script>

<style>
.line-height {
  line-height: 28px;
  text-align: justify;
}
</style>
