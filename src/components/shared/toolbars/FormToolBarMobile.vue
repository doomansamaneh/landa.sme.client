<template>
  <toolbar-observer ref="observer">
    <q-toolbar
      :style="
        $q.screen.gt.sm
          ? 'margin-top: 4px; margin-bottom: 4px; padding-left: 38px; padding-right: 38px;'
          : ''
      "
    >
      <div class="row items-center">
        <back-button
          v-if="!noBackButton"
          :class="$q.screen.xs ? 'q-mr-xs' : 'q-ml-sm'"
        />

        <slot name="header">
          <span
            :style="
              $q.screen.gt.xs ? 'width: auto;' : 'max-width: auto;'
            "
            class="ellipsis-2-lines text-weight-700"
            :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'"
          >
            <slot name="header-title">
              {{ title }}
            </slot>
          </span>
        </slot>
      </div>

      <q-space />

      <div v-if="buttons" class="q-gutter-x-sm">
        <slot name="buttons">
          <!-- <q-btn no-caps
            v-if="$q.screen.gt.xs"
            class="primary-gradient primary-shadow text-white text-body2 "
            padding="8px 16px"
            rounded
            unelevated
            @click="save"
          >
            <q-icon name="o_save" size="20px" class="q-mr-sm" />
            {{ $t("shared.labels.save") }}
          </q-btn> -->
          <!-- v-if="$q.screen.xs" -->

          <q-btn no-caps round unelevated @click="save">
            <q-icon name="o_save" />
          </q-btn>
        </slot>
      </div>
    </q-toolbar>
  </toolbar-observer>
</template>

<script setup>
  import { ref } from "vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import ToolbarObserver from "src/components/shared/toolbars/ToolBarObserver.vue";

  const props = defineProps({
    title: String,
    buttons: Boolean,
    noBackButton: Boolean,
  });

  const emit = defineEmits(["submit-call-back"]);

  const observer = ref(null);

  const save = () => {
    emit("submit-call-back");
  };
</script>
