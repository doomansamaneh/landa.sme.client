<template>
  <q-card class="no-border no-shadow border-radius-lg">
    <q-card-section class="q-pa-lg">

      <div class="row q-col-gutter-md">
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              شناسه ملی
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              شناسه اقتصادی
            </q-item-label>
            <custom-input />
          </div>
        </div>
      </div>

      <div class="q-mt-lg">
        <div class="text-body1 text-weight-600 no-letter-spacing">
          تنظمیات سامانه مودیان مالیاتی
        </div>

        <q-separator spaced />

        <div class="q-mt-lg">
          <div class="row q-col-gutter-md">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div>
                <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                  شناسه حافظه مالیاتی
                </q-item-label>
                <custom-input />
              </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div>
                <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                  کلید خصوصی
                </q-item-label>
                <custom-input type="textarea" />
              </div>
            </div>
            
          </div>
        </div>

      </div>

     <div class="q-mt-lg">
      <div class="row q-col-gutter-md items-center">
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              نوع
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              الگوی صورتحساب
            </q-item-label>
            <custom-input />
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
