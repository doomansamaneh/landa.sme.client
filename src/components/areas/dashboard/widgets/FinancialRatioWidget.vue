<template>
  <div class="row q-gutter-md">
    <div class="col">
      <q-card class="border-radius-lg q-pa-sm bordered">
        <q-card-section class="column justify-center items-center q-gutter-sm">
          <div class="q-gutter-x-xs">
            <span class="text-h6 text-weight-700">نسبت جاری</span>
            <q-icon @mouseover="showTooltip(0)" name="o_live_help" size="xs" class="icon-hover dark-3 cursor-pointer">
              <q-tooltip no-parent-event @mouseout="hideTooltip(0)" v-model="tooltips[0]" max-width="500px"
                transition-show="scale" transition-hide="scale" anchor="center middle" self="center middle"
                class="glass text-on-dark">
                <div class="text-body2 line-height q-pa-lg">
                  {{ nesbatJari }}
                </div>
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
            <q-icon @mouseover="showTooltip(1)" name="o_live_help" size="xs" class="icon-hover dark-3 cursor-pointer">
              <q-tooltip no-parent-event @mouseout="hideTooltip(1)" v-model="tooltips[1]" max-width="500px"
                transition-show="scale" transition-hide="scale" anchor="center middle" self="center middle"
                class="more glass text-on-dark">
                <div class="text-body2 line-height q-pa-lg">
                  {{ nesbatJari }}
                </div>
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
            <q-icon @mouseover="showTooltip(2)" name="o_live_help" size="xs" class="icon-hover dark-3 cursor-pointer">
              <q-tooltip no-parent-event @mouseout="hideTooltip(2)" v-model="tooltips[2]" max-width="500px"
                transition-show="scale" transition-hide="scale" anchor="center middle" self="center middle"
                class="more glass text-on-dark">
                <div class="text-body2 line-height q-pa-lg">
                  {{ nesbatJari }}
                </div>
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
            <q-icon @mouseover="showTooltip(3)" name="o_live_help" size="xs" class="icon-hover dark-3 cursor-pointer">
              <q-tooltip no-parent-event @mouseout="hideTooltip(3)" v-model="tooltips[3]" max-width="500px"
                transition-show="scale" transition-hide="scale" anchor="center middle" self="center middle"
                class="more glass text-on-dark">
                <div class="text-body2 line-height q-pa-lg">
                  {{ nesbatJari }}
                </div>
              </q-tooltip>
            </q-icon>
          </div>
          <span class="text-bold text-h6 text-primary">0%</span>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
const tooltips = ref([false, false, false, false])

const showTooltip = (index) => {
  setTimeout(() => {

    tooltips.value[index] = true

  }, 700);
}

const hideTooltip = (index) => {
  tooltips.value[index] = false
}

const nesbatJari = "نسبت جاری از تقسیم داراییهای جاری بر بدهی‌های جاری حاصل می‌شود دارایی جاری به داراییهایی گفته می‌شود كه به سرعت و به سهولت به وجه نقد تبدیل می‌شود و بدهی جاری به بدهی‌هایی گفته می‌شود كه با سررسید كمتر از یک سال است. نسبت جاری بیشتر می‌تواند بیانگر وضعیت مطلوب نقدینگی باشد. اگر این عدد بزرگتر از 2 باشد مطلوب است و وام دهندگان بزرگ مانند بانکها به این کسب و کار نظر مساعدی خواهند داشت."

</script>

<style lang="scss">
.line-height {
  line-height: 28px;
  text-align: justify;
}

.no-pointer-events {
  pointer-events: all !important;
}
</style>
