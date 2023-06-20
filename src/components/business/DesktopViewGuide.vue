<template>
  <q-dialog :position="position">
    <q-carousel
      navigation
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
        <q-img src="../../assets/about-us-header.png" />
        <div class="text-center q-mt-lg q-px-xl">
          {{ $t("business-page.buttons.guide.slide1") }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <div class="flex items-center q-gutter-x-sm">
          <q-avatar
            color="blue-7"
            text-color="white"
            icon="o_person"
            size="xl"
          />

          <q-btn
            class="btn-fixed-width business-name-btn text-body2 text-weight-bold"
            align="left"
            no-caps
            flat
            text-color="dark"
            :ripple="false"
            label="دومان سامانه برای تست"
            icon="o_login"
          >
          </q-btn>
        </div>

        <div class="q-mt-lg text-center">
          {{ $t("business-page.buttons.guide.slide2") }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap flex-center">
        <div class="flex items-center q-gutter-x-sm"></div>
        <q-btn
          class="more-icon"
          style="color: grey"
          unelevated
          falt
          round
          :ripple="false"
          icon="more_vert"
          size="xl"
          dense
        />
        <div class="q-mt-lg text-center q-px-xl">
          {{ $t("business-page.buttons.guide.slide3") }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap flex-center">
        <q-avatar color="blue-7" text-color="white" icon="o_person" size="xl" />
        <div class="q-mt-lg text-center q-px-xl">
          {{ $t("business-page.buttons.guide.slide4") }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="5" class="column no-wrap flex-center">
        <q-btn
          class="service-extension q-pa-sm"
          round
          flat
          color="positive"
          icon="o_add_shopping_cart"
          size="xl"
          :ripple="false"
        />
        <div class="q-mt-lg text-center q-px-xl">
          {{ $t("business-page.buttons.guide.slide5") }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="6" class="column no-wrap flex-center">
        <q-icon name="import_contacts" size="xl" color="blue-grey-8" />
        <div class="q-mt-lg text-center q-px-xl">
          {{ $t("business-page.buttons.guide.slide6") }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue"

const slide = ref(1)
const position = ref("top")
</script>

<style lang="scss">
.q-carousel {
  height: 250px;
  width: 50%;
}

.q-img {
  width: 50%;
}

.business-name-btn .q-focus-helper {
  display: none;
}
</style>
