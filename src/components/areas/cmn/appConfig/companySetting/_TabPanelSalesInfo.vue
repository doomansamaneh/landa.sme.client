<template>
  <q-card class="no-border no-shadow border-radius-lg">
    <q-card-section class="q-pa-lg">
      <div class="row q-col-gutter-md">
        <div class="col-md-3 col-sm-3 col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              ارز
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              شروع شماره فاکتور
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              درصد بازاریابی
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div class="row q-col-gutter-md">
            <div class="col-md col-sm col-xs-12">
              <div>
                <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                  حاشیه بالای کاغذ در چاپ
                </q-item-label>
                <custom-input />
              </div>
            </div>
            <div class="col-md col-sm col-xs-12">
              <div>
                <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                  حاشیه پایین کاغذ در چاپ
                </q-item-label>
                <custom-input />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="q-mt-lg">
        <div class="column q-col-gutter-md">
          <q-checkbox dense class="text-body2 no-letter-spacing" size="46px"
            label="امکان تعیین مبلغ مالیات بر ارزش افزوده در ثبت فاکتور فروش" />
          <q-checkbox dense class="text-body2 no-letter-spacing" size="46px"
            label="ستون تخفیف را در هنگام چاپ نشان نده" />
          <q-checkbox dense class="text-body2 no-letter-spacing" size="46px"
            label="مانده فاکتورهای مشتری را در چاپ فاکتور نشان بده" />
          <q-checkbox dense class="text-body2 no-letter-spacing" size="46px"
            label="فیلد قرارداد را در فرمهای فروش و سند نشان بده" />
          <q-checkbox dense class="text-body2 no-letter-spacing" size="46px"
            label="این کسب و کار دارای چندین انبار است" />
          <q-checkbox dense class="text-body2 no-letter-spacing" size="46px"
            label="از فروش کالاهای با موجودی منفی جلوگیری کن" />
          <q-checkbox dense class="text-body2 no-letter-spacing" size="46px"
            label="بازاریاب را در فرمهای فروش نشان بده" />
        </div>
      </div>

      <div class="q-mt-lg">
        <div class="row q-col-gutter-md">
          <div class="col-md col-sm col-xs-12">
            <div>
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                شرح فاکتور
              </q-item-label>
              <custom-input type="textarea" />
            </div>
          </div>

          <div class="col-md col-sm col-xs-12">
            <div>
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                شرح پیش فاکتور
              </q-item-label>
              <custom-input type="textarea" />
            </div>

          </div>
        </div>

      </div>

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
</script>
