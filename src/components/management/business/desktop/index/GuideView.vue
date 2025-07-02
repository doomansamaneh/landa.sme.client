<template>
  <q-dialog :position="position">
    <q-carousel
      navigation
      class="border-radius-lg"
      arrows
      padding
      control-color="primary"
      navigation-icon="radio_button_unchecked"
      navigation-active-icon="radio_button_checked"
      animated
      v-model="slide"
      ref="carousel"
    >
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <q-img src="src/assets/about-us-header.png" />
        <div class="text-center q-mt-lg q-px-xl">
          {{ $t("page.buttons.guide.slide1") }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <div class="flex items-center q-gutter-x-sm">
          <q-avatar
            class="primary-shadow primary-gradient"
            text-color="white"
            icon="o_person"
            size="lg"
          />

          <div class="text-body1">
            <span class="text-on-dark">دومان سامانه برای تست</span>
          </div>
        </div>

        <div class="q-mt-lg text-center">
          {{ $t("page.buttons.guide.slide2") }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap flex-center">
        <q-icon
          class="more-icon bg-on-dark2"
          name="more_vert"
          size="lg"
        />
        <div class="q-mt-lg text-center q-px-xl">
          {{ $t("page.buttons.guide.slide3") }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap flex-center">
        <q-avatar
          class="primary-shadow primary-gradient"
          text-color="white"
          icon="o_person"
          size="xl"
        />
        <div class="q-mt-lg text-center q-px-xl">
          {{ $t("page.buttons.guide.slide4") }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="5" class="column no-wrap flex-center">
        <q-btn
          no-caps
          class="green-shadow green-gradient no-pointer-events text-body3"
          rounded
          no-caps
          text-color="white"
          unelevated
          padding="6px 12px"
        >
          <q-icon name="add" class="q-pr-xs" size="16px" />
          {{ $t("pages.renew-subscription") }}
        </q-btn>
        <div class="q-mt-lg text-center q-px-xl">
          {{ $t("page.buttons.guide.slide5") }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="6" class="column no-wrap flex-center">
        <q-icon
          name="import_contacts"
          size="lg"
          :color="$q.dark.isActive ? 'white' : 'blue-grey-8'"
        />
        <div class="q-mt-lg text-center q-px-xl">
          {{ $t("page.buttons.guide.slide6") }}
        </div>
        <q-btn
          no-caps
          padding="4px 12px"
          unelevated
          label="دانشنامه"
          href="https://www.landa-sme.ir/LandaKnowledge"
          target="_blank"
          class="q-mt-md text-on-dark bordered-btn"
        />
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";

  const slide = ref(1);
  const position = ref("top");
</script>

<style lang="scss" scoped>
  .q-carousel {
    height: 270px;
    width: 60%;
  }

  .q-img {
    width: 50%;
  }

  .business-name-btn .q-focus-helper {
    display: none;
  }
</style>
