<template>
  <toolbar-observer ref="observer">
    <q-toolbar
      :style="
        $q.screen.gt.sm
          ? 'margin-top: 4px; margin-bottom: 4px; padding-left: 38px; padding-right: 38px;'
          : ''
      "
    >
      <div class="q-gutter-x-sm">
        <slot name="buttons">
          <!-- v-if="$q.screen.gt.xs" -->
          <q-btn
            class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
            padding="6px 12px"
            rounded
            unelevated
            @click="save"
          >
            <q-icon name="o_save" size="20px" class="q-mr-sm" />
            {{ $t("shared.labels.save") }}
          </q-btn>
          <!-- 
          <q-btn v-if="$q.screen.xs" round unelevated @click="save">
            <q-icon name="o_save" />
          </q-btn> -->
        </slot>
      </div>
      <div class="q-space" />
      <div class="row items-center">
        <slot name="header">
          <span
            :style="
              $q.screen.gt.xs ? 'width: auto;' : 'max-width: 160px;'
            "
            class="ellipsis-2-lines text-weight-700 no-letter-spacing"
            :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'"
          >
            <slot name="header-title">
              {{ title }}
            </slot>
          </span>
          <back-button
            :class="$q.screen.xs ? 'q-mr-sm' : 'q-ml-sm'"
          />
        </slot>
      </div>
    </q-toolbar>
  </toolbar-observer>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import ToolbarObserver from "src/components/shared/ToolBarObserver.vue";

  const props = defineProps({
    title: String,
  });

  const emit = defineEmits(["submit-call-back"]);

  const observer = ref(null);

  const save = () => {
    emit("submit-call-back");
  };
</script>
