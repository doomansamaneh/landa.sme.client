<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
  >
    <q-card class="no-shadow no-border">
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-body1 text-weight-700">
            {{ $t("shared.labels.userGuide") }}
          </div>
          <q-btn
            no-caps
            round
            icon="o_close"
            dense
            unelevated
            class="text-body2"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-card-section
        class="q-px-md q-pb-xl absolute-center full-width"
      >
        <div v-show="slide === 1">
          <div class="row items-center justify-center">
            <q-img
              class="q-mb-md"
              src="src/assets/about-us-header.png"
            />
            <div class="text-center text-body1">
              {{ $t("page.buttons.guide.slide1") }}
            </div>
          </div>
        </div>
        <div v-show="slide === 2">
          <div class="row items-center q-gutter-md justify-center">
            <q-avatar
              class="primary-shadow primary-gradient"
              text-color="white"
              icon="o_person"
              size="lg"
            />

            <div class="text-body1">
              <span class="text-on-dark">دومان سامانه برای تست</span>
            </div>

            <div class="q-mt-lg text-body1 text-center">
              {{ $t("page.buttons.guide.slide2") }}
            </div>
          </div>
        </div>
        <div v-show="slide === 3">
          <div class="row items-center justify-center">
            <q-icon
              class="more-icon bg-on-dark2"
              name="more_vert"
              size="lg"
            />
            <div class="q-mt-lg text-center text-body1">
              {{ $t("page.buttons.guide.slide3") }}
            </div>
          </div>
        </div>
        <div v-show="slide === 4">
          <div class="row items-center justify-center">
            <q-avatar
              class="primary-shadow primary-gradient"
              text-color="white"
              icon="o_person"
              size="50px"
            />
            <div class="q-mt-lg text-center text-body1">
              {{ $t("page.buttons.guide.slide4") }}
            </div>
          </div>
        </div>
        <div v-show="slide === 5">
          <div class="row items-center justify-center">
            <q-btn
              no-caps
              class="green-gradient green-shadow no-pointer-events"
              rounded
              padding="8px 12px"
              text-color="white"
              dense
              unelevated
            >
              <span class="text-body2">تمدید</span>
            </q-btn>

            <div class="q-mt-lg text-center text-body1">
              {{ $t("page.buttons.guide.slide5") }}
            </div>
          </div>
        </div>
        <div v-show="slide === 6">
          <div class="row items-center justify-center">
            <q-icon
              name="import_contacts"
              size="lg"
              :color="$q.dark.isActive ? 'white' : 'blue-grey-8'"
            />
            <div class="q-mt-lg text-center text-body1">
              {{ $t("page.buttons.guide.slide6") }}
            </div>

            <q-btn
              no-caps
              padding="8px 16px"
              unelevated
              :label="$t('shared.labels.encyclopedia')"
              href="https://www.landa-sme.ir/LandaKnowledge"
              target="_blank"
              class="q-mt-md text-on-dark bordered-btn"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="q-mb-xl absolute-bottom" align="center">
        <div class="row items-center q-gutter-sm justify-center">
          <q-btn
            no-caps
            v-for="buttonLabel in [1, 2, 3, 4, 5, 6]"
            :key="buttonLabel"
            :round="true"
            :dense="true"
            :unelevated="slide !== buttonLabel"
            :class="
              slide === buttonLabel
                ? 'text-white primary-gradient primary-shadow'
                : 'bg-dark text-on-dark'
            "
            :label="buttonLabel.toString()"
            @click="changeSlide(buttonLabel)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";

  const slide = ref(1);

  const changeSlide = (newSlide) => {
    slide.value = newSlide;
  };
</script>

<style lang="scss">
  .q-img {
    width: 80%;
  }
</style>
