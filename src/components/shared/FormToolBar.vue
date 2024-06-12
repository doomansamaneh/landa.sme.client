<template>
  <div>
    <q-page-sticky
      class="z-1 bg-main"
      position="top"
      :class="[
        $q.screen.xs ? 'q-py-xs' : 'q-py-md',
        !isAtTop && $q.screen.xs ? 'mobile-toolbar-gradient' : '',
      ]"
      expand
    >
      <q-toolbar
        :style="
          $q.screen.gt.sm
            ? 'padding-left: 38px; padding-right: 38px;'
            : 'padding-left: 20px; padding-right: 20px;'
        "
      >
        <div class="q-gutter-x-sm">
          <slot name="buttons">
            <q-btn
              v-if="$q.screen.gt.xs"
              class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
              padding="6px 12px"
              rounded
              unelevated
              @click="save"
            >
              <q-icon name="o_save" size="20px" class="q-mr-sm" />
              {{ $t("shared.labels.save") }}
            </q-btn>

            <q-btn v-if="$q.screen.xs" round unelevated @click="save">
              <q-icon name="o_save" />
            </q-btn>
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
            <back-button class="q-ml-md" />
          </slot>
        </div>
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";

  const isAtTop = ref(true);
  let previousScrollPosition = 0;

  const props = defineProps({
    title: String,
  });

  const emit = defineEmits(["submit-call-back"]);

  const save = () => {
    emit("submit-call-back");
  };

  const handleScroll = () => {
    const currentPosition =
      window.scrollY || document.documentElement.scrollTop;
    isAtTop.value = currentPosition === 0;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>
