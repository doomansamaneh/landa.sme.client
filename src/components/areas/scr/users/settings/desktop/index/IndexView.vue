<template>
  <div :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''">
    <div>
      <div class="text-h6 no-letter-spacing q-mb-md">تنظیمات</div>
      <q-card class="bordered" :class="$q.screen.gt.sm ? 'settings-card' : 'full-width'">
        <q-card-section class="no-padding">
          <q-item class="q-py-md" clickable>
            <q-item-section class="q-mr-sm" top avatar>
              <q-avatar size="56px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-on-dark text-body2 no-letter-spacing">خشایار شمالی</q-item-label>
              <q-item-label class="caption-on-dark text-body3 no-letter-spacing">shomalikhashayar@gmail.com</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn round dense unelevated>
                <q-icon name="chevron_left" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="0.5px" />

          <q-item class="q-py-sm" clickable to="/settings/appearance">

            <q-item-section>
              <q-item-label class="text-on-dark text-body2 no-letter-spacing"> رنگ تم‌ و زبان</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn round dense unelevated>
                <q-icon name="chevron_left" size="24px" />
              </q-btn>
            </q-item-section>

          </q-item>

          <q-separator />

          <q-item class="q-py-sm" clickable>

            <q-item-section>
              <q-item-label class="text-on-dark text-body2 no-letter-spacing">تغییر رمز عبور</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn round dense unelevated>
                <q-icon name="chevron_left" size="24px" />
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
import { useMeta } from "quasar"

// import ProfileSection from "src/components/management/settings/desktop/index/ProfileSection.vue"
// import ThemeColor from "src/components/management/settings/desktop/index/ThemeColor.vue"
// import SwitchLanguage from "src/components/shared/SwitchLanguage.vue";

const metaData = {
  title: 'لاندا',
  titleTemplate: title => `${title} - تنظیمات`,
};

useMeta(metaData);
</script>

<style lang="scss">
.settings-card {
  width: 900px;
}
</style>
