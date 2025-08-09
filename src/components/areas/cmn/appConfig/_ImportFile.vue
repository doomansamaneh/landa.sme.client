<template>
  <div class="flex items-center q-gutter-sm q-pb-sm">
    <div class="caption-on-dark">
      <slot name="header">
        {{ title }}
      </slot>
    </div>

    <q-btn
      no-caps
      size="8px"
      round
      unelevated
      outline
      v-if="fileTemplate"
      class="no-decoration"
      :href="`/excelTemplate/import/${fileTemplate}`"
    >
      <q-icon name="o_download" size="16px" />
      <q-tooltip class="custom-tooltip">
        دریافت الگوی {{ title }}
      </q-tooltip>
    </q-btn>
  </div>

  <q-file outlined clearable clear-icon="o_close" v-model="file">
    <template #prepend>
      <q-icon name="attach_file" />
    </template>
    <template #append>
      <q-btn
        no-caps
        :disabled="!file"
        color="primary"
        class="primary-shadow"
        rounded
        unelevated
        padding="4px 12px"
        use
        @click="upload"
      >
        <q-icon name="arrow_upward" class="q-px-xs" size="xs" />
        import
      </q-btn>
    </template>
  </q-file>
</template>

<script setup>
  import { ref } from "vue";
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
</script>
