<template>
  <div class="bg-dark text-center">
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <div></div>
          <div class="warning-text q-pt-sm text-weight-700">404</div>
        </div>
        <div style="width: 330px">
          <div class="text-on-dark text-h4 text-weight-700 q-pt-lg">
            {{ $t("shared.labels.pageNotFound") }}
          </div>
          <div class="text-on-dark text-body1">
            {{ $t("shared.labels.wrongAddress") }}
          </div>
          <q-btn
            no-caps
            to="/dashboard"
            class="primary-gradient primary-shadow text-on-dark q-mt-lg text-body1"
            rounded
            unelevated
            text-color="white"
          >
            {{ $t("shared.labels.backToDashboard") }}
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useTheme } from "src/components/layouts/main/_composables/useTheme.js";

  const theme = useTheme();

  onMounted(() => {
    theme.store();
  });
</script>
