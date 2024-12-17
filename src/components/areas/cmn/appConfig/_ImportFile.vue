<template>
  <div class="flex items-center q-gutter-sm q-pb-sm">
    <div class="no-letter-spacing caption-on-dark">
      <slot name="header">
        {{ title }}
      </slot>
    </div>

    <q-btn
      size="4px"
      round
      unelevated
      outline
      v-if="fileTemplate"
      class="no-decoration"
      :href="`${baseUrl}/excelTemplate/import/${fileTemplate}`"
    >
      <q-icon name="o_question_mark" size="16px" />
      <q-tooltip class="custom-tooltip">
        الگوی درون‌ریزی {{ title }}
      </q-tooltip>
    </q-btn>
  </div>

  <q-file outlined clearable clear-icon="o_close" v-model="file">
    <template #prepend>
      <q-icon name="attach_file" />
    </template>
    <template #append>
      <q-btn
        :disabled="!file"
        color="primary"
        class="primary-shadow"
        rounded
        unelevated
        padding="4px 12px"
        use
        no-caps
        @click="upload"
      >
        <q-icon name="arrow_upward" class="q-px-xs" size="xs" />
        درون‌ریزی
      </q-btn>
    </template>
  </q-file>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { baseUrl } from "src/constants";
  import { useImport } from "../_composables/useImport";

  const props = defineProps({
    title: String,
    importAction: String,
    fileTemplate: String,
    color: String,
  });

  const importStore = useImport();

  const file = ref(null);
  const upload = async () => {
    await importStore.uploadImportFile(props.importAction, file);
  };

  const $q = useQuasar();
</script>
