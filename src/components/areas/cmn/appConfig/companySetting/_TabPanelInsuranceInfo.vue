<template>
  <q-card class="no-border no-shadow border-radius-lg">
    <q-card-section class="q-pa-lg">
      <div class="row q-col-gutter-md">
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              کد کارگاه
            </q-item-label>
            <custom-input />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
              شعبه تامین اجتماعی
            </q-item-label>
            <custom-input />
          </div>
        </div>
      </div>

      <div class="q-mt-lg">
        <div>
          <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
            شرح
          </q-item-label>
          <custom-input type="textarea" />
        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
</script>
