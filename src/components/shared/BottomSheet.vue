<template>
  <q-dialog
    ref="bottomSheet"
    :model-value="status"
    auto-close
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >

    <q-card
      class="no-border"
      position="bottom"
      style="height:100vh; margin-top: 200px;"
    >

      <q-card-section>
        <sloth name="header">
          Header
        </sloth>
      </q-card-section>

      <q-card-section>
        <sloth name="body">
          <q-btn>
            Hello from child
          </q-btn>
        </sloth>
      </q-card-section>

    </q-card>

  </q-dialog>
</template>


<script setup>
import { ref, watch } from "vue"

const bottomSheet = ref(null)

const props = defineProps({
  status: Boolean
})

const onBottomSheetShow = () => {
  bottomSheet.value.show()
}

const onBottomSheetHide = () => {
  bottomSheet.value.hide()
}

</script>
