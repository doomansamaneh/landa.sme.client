<template>
  <q-card class="form-container border-radius-lg">
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-md-3 col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              کشور
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              نشانی
            </q-item-label>
            <custom-input />
          </div>
        </div>
      </div>

      <div class="q-mt-lg">
        <div class="row q-col-gutter-lg">
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

      <div class="row q-col-gutter-md items-center q-mt-lg">
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              کد پستی
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              تلفن
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              نمابر
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              ایمیل
            </q-item-label>
            <custom-input />
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
