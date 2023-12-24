<template>
  <q-header
    v-if="$q.screen.gt.xs"
    bordered
    class="q-py-md"
    style="padding-left: 38px; padding-right: 38px;"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-toolbar class="text-dark row justify-between no-padding">
      <div class="column items-center">

        <div class="aligner">
          <div class="aligner-item coffee-container">
            <div class="steam-container">
              <div class="squiggle-container squiggle-container-1">
                <div class="squiggle">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 28.1 80.6"
                    style="enable-background:new 0 0 28.1 80.6;"
                    xml:space="preserve"
                  >
                    <path
                      class=""
                      fill="none"
                      stroke-width="11"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1"
                    />
                  </svg>
                </div>
              </div>
              <div class="squiggle-container squiggle-container-2">
                <div class="squiggle">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 28.1 80.6"
                    style="enable-background:new 0 0 28.1 80.6;"
                    xml:space="preserve"
                  >
                    <path
                      class=""
                      fill="none"
                      stroke="#fff"
                      stroke-width="11"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1"
                    />
                  </svg>
                </div> <!-- end .squiggle-->
              </div>
              <div class="squiggle-container squiggle-container-3">
                <div class="squiggle">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 28.1 80.6"
                    style="enable-background:new 0 0 28.1 80.6;"
                    xml:space="preserve"
                  >
                    <path
                      class=""
                      fill="none"
                      stroke="#fff"
                      stroke-width="11"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1"
                    />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

        <q-btn
          @click="$emit('toggle-menubar')"
          round
          unelevated
          dense
          size="16px"
          class="text-on-dark"
        >
          <q-icon
            size="sm"
            name="o_lunch_dining"
          />

        </q-btn>



      </div>

      <q-toolbar-title class="text-subtitle2 text-bold row justify-start items-center">
        <div class="column">
          <span class="text-on-dark">{{ selectedBusiness.title }}</span>
          <today-date />
        </div>


      </q-toolbar-title>



      <div class="row items-center q-gutter-x-md">
        <q-btn
          padding="4px 12px"
          unelevated
          label="دانشنامه"
          href="https://www.landa-sme.ir/LandaKnowledge"
          target="_blank"
          class="bordered-btn"
        />
        <fiscal-year />
        <switch-theme />
        <notification />

        <q-btn
          @click="contactDrawerStore.toggle"
          flat
          dense
          round
          icon="o_person_search"
          class="btn-icon text-on-dark gt-xs"
          :class="activeButton"
          size="14px"
        />

        <profile />

      </div>
    </q-toolbar>
  </q-header>

  <q-header
    v-if="$q.screen.xs"
    bordered
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-toolbar
      style="padding-left: 20px; padding-right: 20px;"
      class="row justify-between q-py-md"
    >
      <div class="q-gutter-xs">
        <q-btn
          @click="$emit('toggle-menubar')"
          round
          unelevated
          dense
          color="primary"
          size="16px"
          class="primary-shadow text-on-dark"
        >

          <q-icon
            size="xs"
            name="o_lunch_dining"
          />

        </q-btn>
      </div>

      <q-toolbar-title class="text-subtitle2 text-bold row justify-start items-center">
        <div class="column">
          <span class="text-on-dark">{{ selectedBusiness.title }}</span>
          <today-date />
        </div>


      </q-toolbar-title>




    </q-toolbar>

    <q-separator />

    <q-toolbar
      style="padding-left: 20px; padding-right: 20px;"
      class="row items-center q-py-md"
    >
      <div class="col-8 row items-center q-gutter-sm">
        <switch-theme />
        <fiscal-year />
        <q-btn
          @click="contactDrawerStore.toggle"
          flat
          dense
          round
          icon="o_person_search"
          class="btn-icon text-on-dark"
          :class="activeButton"
          size="14px"
        />
        <notification />
        <profile />
      </div>

      <div class="col row items-center justify-end">
        <q-btn
          padding="4px 12px"
          unelevated
          label="دانشنامه"
          href="https://www.landa-sme.ir/LandaKnowledge"
          target="_blank"
          class="text-on-dark bordered-btn"
        />
      </div>


    </q-toolbar>

  </q-header>
</template>

<script setup>
import { ref, computed } from "vue"
import { useQuasar } from "quasar"
import { useSelectedBusinessStore } from "src/stores/selected-business.js"
import { useContactDrawer } from "src/composables/useContactDrawer"
import FiscalYear from "./ToolbarFiscalYear.vue"
import Notification from "./ToolbarNotification.vue"
import Profile from "./ToolbarProfile.vue"
import SwitchTheme from "src/components/shared/SwitchTheme.vue"
import TodayDate from "src/components/shared/TodayDate.vue"

const contactDrawerStore = useContactDrawer()
const $q = useQuasar()

const selectedBusiness = useSelectedBusinessStore()

const emit = defineEmits(["toggle-menubar"])

const activeButton = computed(() => (contactDrawerStore.state.value == true ? 'btn-active' : ''));
</script>


<style lang="scss" scoped>
@mixin moveAndFadeAnimation($distance, $duration, $delay) {

  animation: move-and-fade $duration linear infinite;
  animation-delay: $delay;

  @keyframes move-and-fade {
    0% {
      opacity: 0;
      transform: translateY(0);
    }

    50% {
      opacity: 1;
    }

    75% {
      opacity: 0;
    }

    100% {
      transform: translateY(-$distance);
      opacity: 0;
    }
  }
}

$border-color: #c3c3c372;

.aligner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}


.coffee-container {
  position: absolute;
}

.squiggle-container {
  width: 10px;
  height: 10px;
  display: inline-block;
}

.squiggle-container-1 {
  transform: translateY(10px);

  .squiggle {
    @include moveAndFadeAnimation(10px, 2.5s, .2s);
    width: 10px;
  }
}

.squiggle-container-2 {
  transform: translateY(0px);

  .squiggle {
    @include moveAndFadeAnimation(20px, 2.5s, 0s);
    width: 10px;
  }
}

.squiggle-container-3 {
  transform: translateY(15px);

  .squiggle {
    @include moveAndFadeAnimation(15px, 2.5s, .4s);
    width: 10px;
  }
}




.squiggle {
  stroke-dasharray: 100;
  //animation: dash 10s linear infinite;

  path {
    stroke: $border-color;
  }
}




@keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }

  50% {
    stroke-dashoffset: 500;
  }

  100% {
    stroke-dashoffset: 0;
  }
}</style>

