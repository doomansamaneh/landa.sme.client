<template>
  <q-dialog
    persistent
    transition-duration="600"
    transition-show="slide-down"
    transition-hide="slide-up"
     v-model="store.congratsDialog.value"
  >
    <q-card class="congrats-card q-pa-lg q-rounded-xl shadow-4">
      <q-card-section class="text-center q-py-lg q-pb-md">
        <q-img
          spinner-color="primary"
          width="100px"
          src="celebration.svg"
          class="sunshine-animation"
          :style="
            $q.dark.isActive
              ? 'filter: drop-shadow(0 0 15px #FFFF0090);'
              : 'filter: drop-shadow(0 0 15px #FFFF00);'
          "
        />
        <div class="text-h6 q-mt-lg text-weight-bold">
          به لاندا خوش آمدید
        </div>
        <div class="text-body1 q-mt-sm text-grey-7">
          ممنون میشیم بگی چطور با ما آشنا شدی 😊
        </div>
      </q-card-section>

      <q-form
        @submit.prevent="store.submitForm"
        ref="formRef"
        class="q-card-section q-pa-none"
      >
        <q-list separator class="rounded-borders">
          <q-item
            v-for="option in store.options.value"
            :key="option.value"
            clickable
            v-ripple
            @click="store.selectOption(option.value)"
            :active="store.selectedOption.value === option.value"
            active-class="bg-primary text-white"
            class="q-px-md q-py-sm"
          >
            <q-item-section avatar>
              <q-icon
                :name="option.icon"
                size="24px"
                class="q-mr-sm"
              />
            </q-item-section>
            <q-item-section>
              <div class="text-subtitle1">{{ option.label }}</div>
            </q-item-section>
            <q-item-section
              side
              v-if="store.selectedOption.value === option.value"
            >
              <q-icon name="check" color="white" />
            </q-item-section>
          </q-item>

          <q-item
            v-if="store.selectedOption.value === 'other'"
            class="q-pt-sm q-pb-md q-px-md bg-grey-1"
          >
            <q-item-section>
              <custom-input
                v-model="store.otherText.value"
                outlined
                type="textarea"
                :placeholder="$t('shared.labels.subject')"
                required
              />
            </q-item-section>
          </q-item>
        </q-list>

        <q-card-actions align="right" class="q-mt-md">
          <q-btn
            type="submit"
            unelevated
            rounded
            padding="10px 24px"
            class="primary-gradient primary-shadow text-white text-weight-medium"
            color="primary"
            :label="$t('shared.labels.save')"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useCongrats } from "src/composables/useCongrats";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const store = useCongrats();
</script>

<style scoped lang="scss">
  .congrats-card {
    width: 650px;
    max-width: 95vw;
  }

  .sunshine-animation {
    animation: sunshine 3s infinite;
  }

  @keyframes sunshine {
    0%,
    100% {
      filter: drop-shadow(0 0 15px #ffff00e6);
    }
    50% {
      filter: drop-shadow(0 0 30px #ffff0090);
    }
  }
</style>
