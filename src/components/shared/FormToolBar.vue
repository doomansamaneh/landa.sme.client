<template>
  <div>
    <q-page-sticky
      class="z-1 bg-main q-py-md"
      position="top"
      expand
    >
      <q-toolbar
        :style="$q.screen.gt.sm ? 'padding-left: 38px; padding-right: 38px;' : 'padding-left: 24px; padding-right: 24px;'"
      >
        <div class="q-gutter-x-sm">
          <slot name="buttons">
            <q-btn
              class="bg-primary primary-shadow text-white text-caption"
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
            <span :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'">
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
