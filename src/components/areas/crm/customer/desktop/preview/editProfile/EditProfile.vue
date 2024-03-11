<template>
  <q-card class="edit-profile-card no-shadow">

    <q-card-section class="header z-top bg-dark row items-center q-pa-lg">
      <div class="text-h6">
        ویرایش مخاطب
      </div>
      <q-space />
      <q-btn
        icon="close"
        class="icon-hover dark-3"
        flat
        round
        dense
        v-close-popup
      />
    </q-card-section>

    <q-scroll-area
      style="height: 400px;"
      :thumb-style="helper.thumbStyle"
      :bar-style="helper.barStyle"
    >
      <q-card-section>
        <q-form
          ref="form"
          autofocus
        >
          <master-section />

          <q-tabs
            v-model="tab"
            class="border-radius-xl bg-primary text-white text-weight-700 text-body2 no-letter-spacing q-mt-xl q-mx-lg"
            indicator-color="white"
            align="start"
            inline-label
            narrow-indicator
          >
            <q-tab
              name="personal-info"
              label="اطلاعات شخصی"
              icon="o_accessibility"
            />
            <q-tab
              name="business-info"
              label="اطلاعات کسب و کار"
              icon="o_business"
            />
            <q-tab
              name="location-info"
              label="نشانی"
              icon="o_my_location"
            />
            <q-tab
              name="contact-info"
              label="تماس"
              icon="o_headset_mic"
            />
          </q-tabs>

          <q-tab-panels
            class="no-border no-shadow border-radius-lg q-mt-lg q-mx-lg"
            v-model="tab"
            animated
          >
          <q-tab-panel class="no-padding" name="personal-info">
            <personal-info />
          </q-tab-panel>

            <q-tab-panel class="no-padding" name="business-info">
              <business-info />
            </q-tab-panel>

            <q-tab-panel class="no-padding" name="location-info">
              <location-info/>
            </q-tab-panel>

            <q-tab-panel class="no-padding" name="contact-info">
              <contact-info/>
            </q-tab-panel>

          </q-tab-panels>
        </q-form>
      </q-card-section>
    </q-scroll-area>

    <actions
      @ok-clicked="submitForm"
      class="footer q-px-lg"
    >
      <template #ok-label>ذخیره</template>
    </actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue"
import { helper } from "src/helpers/helper.js"

import Actions from "src/components/shared/forms/FormCardActions.vue"
import MasterSection from "src/components/areas/crm/customer/desktop/preview/editProfile/master/IndexView.vue"
import PersonalInfo from "src/components/areas/crm/customer/desktop/preview/editProfile/detail/tabPanels/PersonalInfo.vue"
import BusinessInfo from "src/components/areas/crm/customer/desktop/preview/editProfile/detail/tabPanels/BusinessInfo.vue"
import LocationInfo from "src/components/areas/crm/customer/desktop/preview/editProfile/detail/tabPanels/LocationInfo.vue"
import ContactInfo from "src/components/areas/crm/customer/desktop/preview/editProfile/detail/tabPanels/ContactInfo.vue"

const tab = ref('personal-info')

</script>

<style scoped>
.edit-profile-card {
  min-width: 950px;
}

.header {
  position: sticky;
  top: 0;
}

.footer {
  position: sticky;
  bottom: 0;
}
</style>
