<template>
  <div class="q-mb-lg">
    <q-page-sticky
      :style="xPadding"
      class="bg-main q-py-xs"
      position="top"
      expand
    >
      <q-toolbar class="no-padding">
        <div class="row items-center q-gutter-sm">
          <div class="text-h6 text-weight-700 text-on-dark">
            {{ $t("main-menu-items.dashboard") }}
          </div>
          <div>
            <q-btn
              no-caps
              dense
              class="text-body2"
              round
              unelevated
              no-caps
            >
              <q-icon size="20px" name="o_tune" />
            </q-btn>

            <q-btn
              no-caps
              class="text-body2"
              rounded
              unelevated
              no-caps
            >
              <q-icon class="q-mr-xs" size="20px" name="o_refresh" />
              <div class="text-body2">حالت پیشفرض</div>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useQuasar } from "quasar";

  const xPadding = computed(() => {
    return "z-index: 2; padding-left: 38px; padding-right: 38px;";
  });
</script>
