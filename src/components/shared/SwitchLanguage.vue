<template>
  <h1>i18n locale = {{ $i18n.locale }}</h1>
  <div class="row q-col-gutter-lg">
    <div class="col" v-for="(language, index) in languages" :key="index">
      <q-card class="bordered cursor-pointer" @click="onLanguageChange(language.iso)">
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-body1 no-letter-spacing">
              {{ language.name }}
            </div>
            <q-icon v-if="lang === language.iso" color="primary" name="check" size="24px" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useQuasar, Quasar } from 'quasar';
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const $t = useI18n();

const qLangList = import.meta.glob(
  '/node_modules/quasar/lang/(en-US|fa-IR|ar).mjs'
);

const $q = useQuasar();
const lang = ref(localStorage.getItem('selectedLanguage') || $q.lang.isoName);

const languages = [
  { name: 'English', iso: 'en-US' },
  { name: 'فارسی', iso: 'fa-IR' },
  { name: 'عربى', iso: 'ar' }
];

const bodyClass = ref(localStorage.getItem('selectedLanguageClass') || (lang.value === 'fa-IR' ? 'persian' : 'english'));

watch(lang, (val) => {
  setLang(val);
});

watch(bodyClass, (val) => {
  document.body.classList.remove('persian', 'english', 'arabic');
  document.body.classList.add(val);
  localStorage.setItem('selectedLanguageClass', val);
});

async function setLang(iso) {
  try {
    const langModule = await qLangList[
      `/node_modules/quasar/lang/${iso}.mjs`
    ]();
    Quasar.lang.set(langModule.default);
    $t.locale.value = lang.value;
    bodyClass.value = iso === 'fa-IR' ? 'persian' : (iso === 'ar' ? 'arabic' : 'english');
    localStorage.setItem('selectedLanguage', iso);
  } catch (error) {
    console.log('error setLang', error);
  }
}

const onLanguageChange = (iso) => {
  lang.value = iso;
};

onMounted(() => {
  document.body.classList.remove('persian', 'english', 'arabic');
  document.body.classList.add(bodyClass.value);
});

setLang(lang.value);
</script>


<!-- previous version -->
<!-- <template>
  <div class="row" :class="$q.screen.gt.xs ? 'q-col-gutter-lg' : 'q-col-gutter-sm'">
    <div class="col col-sm col-xs-12" v-for="lang in cultures" :key="lang.code" @click="onLanguageClick(lang.code)">
      <q-card v-ripple class="bordered q-mb-md cursor-pointer">
        <q-card-section class="row items-center">
          <div>
            {{ lang.name }}
            <q-icon v-if="cultureStore.culture.value.code === lang.code" name="done" color="primary" size="xs"
              class="q-ml-xs">
            </q-icon>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { cultures } from "src/constants/enums";
import { useCulture } from "src/composables/useCulture";
const cultureStore = useCulture();

const onLanguageClick = (code) => {
  cultureStore.setCulture(code);
};
</script> -->
