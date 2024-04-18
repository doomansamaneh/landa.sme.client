<template>
  <template v-if="!edit">
    <q-btn
      filled
      unelevated
      rounded
      padding="6px 12px"
      class="bg-primary text-white text-on-dark"
      ><q-icon
        name="o_add"
        size="xs"
        class="q-mr-xs text-body2 no-letter-spacing"
      />افزودن فیلد جدید
      <q-menu class="border-radius-lg" :offset="[0, 20]" fit>
        <q-list dense padding>
          <q-item clickable v-close-popup tabindex="0">
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm"
                  ><q-icon name="o_call" size="16px"
                /></q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">تلفن</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup tabindex="0">
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm"
                  ><q-icon name="o_phone_android" size="16px"
                /></q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">موبایل</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup tabindex="0">
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm"
                  ><q-icon name="o_mail" size="16px"
                /></q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">ایمیل</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup tabindex="0">
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm"
                  ><q-icon name="o_public" size="16px"
                /></q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">وبسایت</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <div class="q-my-lg">
      <div class="row">
        <div class="col">
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >تلفن</q-item-label
          >
          <custom-input outlined dense />
        </div>
        <div class="col row items-end justify-end">
          <div class="row items-end">
            <q-btn unelevated round class="text-on-dark" @click="editRow">
              <q-icon name="o_edit" size="20px" />
            </q-btn>
            <q-btn unelevated @click="deleteRow" round class="text-on-dark">
              <q-icon name="o_delete" size="20px" />
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="row q-col-gutter-lg">
      <div class="col-md col-sm col-xs-12">
        <q-item-label
          class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >نوع تماس</q-item-label
        >
        <q-select
          dropdown-icon="o_expand_more"
          v-model="select"
          :options="options"
          outlined
          dense
        />
      </div>

      <div class="col-md col-sm col-xs-12">
        <q-item-label
          class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >مقدار</q-item-label
        >
        <custom-input outlined dense />
      </div>
    </div>

    <div class="q-mt-md">
      <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
        >شرح</q-item-label
      >
      <q-input type="textarea" outlined dense />
    </div>

    <div class="q-mt-md">
      <q-checkbox
        size="46px"
        class="q-mb-sm text-body2 no-letter-spacing"
        dense
        v-model="main"
        val="main"
        label="اصلی"
      />
    </div>

    <div class="row items-center q-gutter-x-sm q-my-lg">
      <q-btn
        color="primary"
        unelevated
        rounded
        class="primary-shadow text-body2 no-letter-spacing"
        label="ذخیره"
        @click="save"
      />
      <q-btn
        unelevated
        rounded
        class="text-body2 no-letter-spacing"
        label="انصراف"
        @click="edit = false"
      />
    </div>
  </template>
</template>

<script setup>
import { ref } from "vue";

import CustomInput from "src/components/shared/forms/CustomInput.vue";
import Actions from "src/components/shared/forms/FormCardActions.vue";

const edit = ref(false);
const main = ref(false);
const select = ref("تلفن منزل");
const options = ["تلغن منزل", "تلغن داخلی", "تلغن محل کار", "فکس"];

const editRow = () => {
  edit.value = true;
};
</script>
