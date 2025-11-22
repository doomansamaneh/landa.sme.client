<template>
  <div class="row q-col-gutter-lg q-pb-lg">
    <div
      class="col-md col-sm col-xs-12"
      v-for="(language, index) in cultures"
      :key="index"
    >
      <q-card
        class="bordered cursor-pointer"
        @click="onLanguageChange(language.iso)"
      >
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-body1">
              {{ language.name }}
            </div>
            <q-icon
              v-if="cultureStore.culture.value?.iso === language.iso"
              color="primary"
              name="check"
              size="24px"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { cultures } from "src/constants/enums";
  import { useCulture } from "src/composables/useCulture";
  import { useComposables } from "src/stores/useComposables";
  import { bus } from "src/helpers";

  const cultureStore = useCulture();

  const reloadData = () => {
    const composablesStore = useComposables();
    composablesStore.reset();
    bus.emit("render-page");
  };

  const onLanguageChange = async (iso) => {
    await cultureStore.setCulture(iso);
    // Reload data after language change
    reloadData();
  };
</script>
