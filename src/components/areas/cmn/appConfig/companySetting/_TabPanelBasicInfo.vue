<template>
  <q-card class="no-border no-shadow border-radius-lg">
    <q-card-section class="q-pa-lg">
      
      <div class="row q-col-gutter-md">
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              نام
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              نام مسئول یا مدیر
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              موضوع
            </q-item-label>
            <custom-input />
          </div>
        </div>
      </div>

      <div class="q-mt-lg">
        <div class="row q-col-gutter-md">
          <div class="col-md col-sm col-xs-12">
            <div>
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                شماره ثبت
              </q-item-label>
              <custom-input />
            </div>
          </div>
          <div class="col-md col-sm col-xs-12">
            <div>
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                محل ثبت
              </q-item-label>
              <custom-input />
            </div>
          </div>
          <div class="row items-end col-md col-sm col-xs-12">
            <q-checkbox class="text-body2 no-letter-spacing" size="46px"
              label="شماره عطف را در چاپ سند حسابداری نشان بده" />
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-md items-center q-mt-xl">
        <div class="col-md-1 col-sm-2 col-xs-12">
          <q-item-label class="caption-on-dark no-letter-spacing text-body2">
            چینش منوها
          </q-item-label>
        </div>
        <div class="col-md col-sm col-xs-12 row q-gutter-md">
          <q-radio label="کلاسیک" dense />
          <q-radio label="مدرن" dense />
        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
</script>
