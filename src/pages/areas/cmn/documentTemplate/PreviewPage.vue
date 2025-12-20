<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1 q-mb-sm">کد HTML قالب</div>
            <q-input
              v-model="templateHtml"
              type="textarea"
              outlined
              autogrow
              style="
                min-height: 200px;
                font-family: monospace;
                font-size: 12px;
              "
              class="rtl"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-6">
        <q-card>
          <q-card-section>
            <div class="preview-container" v-html="previewHtml" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { ref, computed } from "vue";

  const templateHtml = ref("");

  const previewHtml = computed(() => {
    return templateHtml.value.trim() || "";
  });
</script>
