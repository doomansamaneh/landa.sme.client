<template>
  <h6 class="q-mb-md">
    <slot name="header">
      {{ title }}
    </slot>
  </h6>
  <a
    v-if="fileTemplate"
    class="no-decoration"
    :href="`${baseUrl}/excelTemplate/import/${fileTemplate}`"
  >
    <q-icon
      name="file_download"
      class="q-pr-xs"
      size="xs"
      :class="hrefColor"
    />
    <span class="decoration-on-hover" :class="hrefColor">
      دانلود الگوی بارگزاری
    </span>
  </a>

  <q-file outlined clearable v-model="file">
    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
    <template v-slot:append>
      <q-btn
        :disabled="!file"
        color="primary"
        class="text-lowercase primary-shadow q-ml-xs"
        rounded
        unelevated
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
  const hrefColor = computed(() =>
    $q.dark.isActive ? "text-yellow" : "text-primary"
  );
</script>
