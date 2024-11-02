<template>
  <div>
    <q-page-sticky
      style="z-index: 2"
      class="bg-main"
      position="top"
      expand
    >
      <q-toolbar>
        <div>
          <div class="text-h6">
            {{ $t("main-menu-items.dashboard") }}
          </div>
        </div>
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useQuasar } from "quasar";
</script>
