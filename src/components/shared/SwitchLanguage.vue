<template>
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
</script>
