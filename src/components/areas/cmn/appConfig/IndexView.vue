<template>
    <div :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''">
      <div>
        <div>
          <div class="text-h6 text-weight-700 no-letter-spacing q-mb-md">پیکربندی سامانه</div>
          <q-card class="bordered" :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']">
            <q-card-section class="no-padding">
  
              <q-item class="top-radius-xl q-py-sm" :class="$q.screen.gt.xs ? '' : 'q-px-none'" clickable
                to="/cmn/appConfig/basicInfo">
  
                <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
                  <q-item-label class="text-on-dark text-body2 no-letter-spacing">اطلاعات اصلی</q-item-label>
                </q-item-section>
  
                <q-item-section side :class="$q.screen.lt.sm ? 'q-mx-sm' : ''">
                  <q-btn round dense unelevated>
                    <q-icon :name="expandIcon()" size="24px" />
                  </q-btn>
                </q-item-section>
  
              </q-item>
  
              <q-separator size="0.5px" />
  
              <q-item class="q-py-sm" :class="$q.screen.gt.xs ? '' : 'q-px-none'" clickable
                to="/cmn/appConfig/contactInfo">
  
                <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
                  <q-item-label class="text-on-dark text-body2 no-letter-spacing">تماس</q-item-label>
                </q-item-section>
  
                <q-item-section side :class="$q.screen.lt.sm ? 'q-mx-sm' : ''">
                  <q-btn round dense unelevated>
                    <q-icon :name="expandIcon()" size="24px" />
                  </q-btn>
                </q-item-section>
  
              </q-item>

              <q-separator size="0.5px" />

              <q-item class="q-py-sm" :class="$q.screen.gt.xs ? '' : 'q-px-none'" clickable
                to="/cmn/appConfig/VATInfo">
  
                <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
                  <q-item-label class="text-on-dark text-body2 no-letter-spacing">مالیات</q-item-label>
                </q-item-section>
  
                <q-item-section side :class="$q.screen.lt.sm ? 'q-mx-sm' : ''">
                  <q-btn round dense unelevated>
                    <q-icon :name="expandIcon()" size="24px" />
                  </q-btn>
                </q-item-section>
  
              </q-item>
  
              <q-separator size="0.5px" />

              <q-item class="q-py-sm" :class="$q.screen.gt.xs ? '' : 'q-px-none'" clickable
                to="/cmn/appConfig/insuranceInfo">
  
                <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
                  <q-item-label class="text-on-dark text-body2 no-letter-spacing">بیمه</q-item-label>
                </q-item-section>
  
                <q-item-section side :class="$q.screen.lt.sm ? 'q-mx-sm' : ''">
                  <q-btn round dense unelevated>
                    <q-icon :name="expandIcon()" size="24px" />
                  </q-btn>
                </q-item-section>
  
              </q-item>
  
              <q-separator size="0.5px" />

              <q-item class="q-py-sm" :class="$q.screen.gt.xs ? '' : 'q-px-none'" clickable
                to="/cmn/appConfig/salaryInfo">
  
                <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
                  <q-item-label class="text-on-dark text-body2 no-letter-spacing">حقوق و دستمزد</q-item-label>
                </q-item-section>
  
                <q-item-section side :class="$q.screen.lt.sm ? 'q-mx-sm' : ''">
                  <q-btn round dense unelevated>
                    <q-icon :name="expandIcon()" size="24px" />
                  </q-btn>
                </q-item-section>
  
              </q-item>
  
              <q-separator size="0.5px" />

              <q-item class="q-py-sm" :class="$q.screen.gt.xs ? '' : 'q-px-none'" clickable
                to="/cmn/appConfig/salesInfo">
  
                <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
                  <q-item-label class="text-on-dark text-body2 no-letter-spacing">بازرگانی، خرید و فروش</q-item-label>
                </q-item-section>
  
                <q-item-section side :class="$q.screen.lt.sm ? 'q-mx-sm' : ''">
                  <q-btn round dense unelevated>
                    <q-icon :name="expandIcon()" size="24px" />
                  </q-btn>
                </q-item-section>
  
              </q-item>
  
              <q-separator size="0.5px" />

              <q-item class="bottom-radius-xl q-py-sm" :class="$q.screen.gt.xs ? '' : 'q-px-none'" clickable
                to="/cmn/appConfig/logoInfo">
  
                <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
                  <q-item-label class="text-on-dark text-body2 no-letter-spacing">لوگو</q-item-label>
                </q-item-section>
  
                <q-item-section side :class="$q.screen.lt.sm ? 'q-mx-sm' : ''">
                  <q-btn round dense unelevated>
                    <q-icon :name="expandIcon()" size="24px" />
                  </q-btn>
                </q-item-section>
  
              </q-item>
  
              <q-separator size="0.5px" />
  
            </q-card-section>
          </q-card>
        </div>
  
        <q-card class="q-mt-xl bordered" :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']">
          <q-card-section class="no-padding">
  
            <q-item class="top-radius-xl q-py-sm" :class="$q.screen.gt.xs ? '' : 'q-px-none'" clickable to="/business">
  
              <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
                <q-item-label class="text-on-dark text-body2 no-letter-spacing">واردات</q-item-label>
              </q-item-section>
  
              <q-item-section :class="$q.screen.lt.sm ? 'q-mx-sm' : ''" side>
                <q-btn round dense unelevated>
                  <q-icon :name="expandIcon()" size="24px" />
                </q-btn>
              </q-item-section>
  
            </q-item>
  
            <q-separator size="0.5px" />
  
            <q-item class="bottom-radius-xl q-py-sm" :class="$q.screen.gt.xs ? '' : 'q-px-none'" clickable
              to="">
  
              <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
                <q-item-label class="text-on-dark text-body2 no-letter-spacing">پلاگین‌ها</q-item-label>
              </q-item-section>
  
              <q-item-section side :class="$q.screen.lt.sm ? 'q-mx-sm' : ''">
                <q-btn round dense unelevated>
                  <q-icon :name="expandIcon()" size="24px" />
                </q-btn>
              </q-item-section>
  
            </q-item>
  
          </q-card-section>
        </q-card>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from "vue"
  import { useMeta, useQuasar } from "quasar"
  
  // import ProfileSection from "src/components/management/settings/desktop/index/ProfileSection.vue"
  // import ThemeColor from "src/components/management/settings/desktop/index/ThemeColor.vue"
  // import SwitchLanguage from "src/components/shared/SwitchLanguage.vue";
  
  const $q = useQuasar()
  
  const metaData = {
    title: 'لاندا',
    titleTemplate: title => `${title} - تنظیمات`,
  };
  
  useMeta(metaData);
  
  const expandIcon = () => {
    if ($q.lang.rtl) {
      return "chevron_left"
    } else {
      return "chevron_right"
    }
  }
  
  const logoutIcon = () => {
    if ($q.lang.rtl) {
      return "o_logout"
    } else {
      return "o_logout"
    }
  }
  
  </script>
  
  <style lang="scss">
  .settings-card {
    width: 900px;
  }
  </style>
  