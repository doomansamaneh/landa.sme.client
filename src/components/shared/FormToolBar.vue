<template>
  <div>
    <q-page-sticky
      class="z-1 bg-main" :class="$q.screen.gt.xs ? 'q-py-md' : 'q-py-sm'"
      position="top"
      expand
    >
      <q-toolbar
        :style="$q.screen.gt.sm ? 'padding-left: 38px; padding-right: 38px;' : 'padding-left: 20px; padding-right: 20px;'"
      >
        <div class="q-gutter-x-sm">
          <slot name="buttons">
            <q-btn
              class="bg-primary primary-shadow text-white text-body2 no-letter-spacing"
              padding="6px 12px"
              rounded
              unelevated
              @click="callbackSave"
            >
              <q-icon
                name="o_save"
                class="q-mr-xs"
              />
              {{ $t("shared.labels.save") }}
            </q-btn>
          </slot>
        </div>
        <div class="q-space" />
        <div class="row items-center">
          <slot name="header">
            <span class="text-weight-700" :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'">
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
import { useRouter } from 'vue-router'
import BackButton from "src/components/shared/buttons/GoBackLink.vue"

const props = defineProps({
  title: String,
  submitCallBack: Function
})
const router = useRouter()

const callbackSave = async function () {
  if (props.submitCallBack) {
    const response = await props.submitCallBack()
    if (response?.data?.code === 200) router.back()
  }
}
</script>
