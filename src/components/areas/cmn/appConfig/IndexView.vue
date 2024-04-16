<template>
  <div :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''">
    <div>
      <div>
        <div class="text-h6 text-weight-700 no-letter-spacing q-mb-md">
          پیکربندی سامانه
        </div>

        <q-card
          class="bordered"
          :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
        >
          <q-item
            class="top-radius-xl q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/basicInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2 no-letter-spacing"
                >اطلاعات اصلی</q-item-label
              >
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="0.5px" />

          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/contactInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2 no-letter-spacing"
                >تماس</q-item-label
              >
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="0.5px" />

          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/VATInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2 no-letter-spacing"
                >مالیات</q-item-label
              >
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="0.5px" />

          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/insuranceInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2 no-letter-spacing"
                >بیمه</q-item-label
              >
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="0.5px" />

          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/salaryInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2 no-letter-spacing"
                >حقوق و دستمزد</q-item-label
              >
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="0.5px" />

          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/salesInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2 no-letter-spacing"
                >بازرگانی، خرید و فروش</q-item-label
              >
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="0.5px" />

          <q-item
            class="bottom-radius-xl q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/logoInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2 no-letter-spacing"
                >لوگو</q-item-label
              >
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <q-card
        class="q-mt-xl bordered"
        :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
      >
        <q-item
          class="top-radius-xl q-py-md"
          :class="$q.screen.gt.xs ? '' : 'q-px-none'"
          clickable
          to=""
        >
          <q-item-section :class="itemClass">
            <q-item-label class="text-on-dark text-body2 no-letter-spacing"
              >واردات</q-item-label
            >
          </q-item-section>

          <q-item-section :class="itemClass" side>
            <q-btn round dense unelevated>
              <q-icon :name="expandIcon()" size="24px" />
            </q-btn>
          </q-item-section>
        </q-item>

        <q-separator size="0.5px" />

        <q-item
          class="bottom-radius-xl q-py-md"
          :class="$q.screen.gt.xs ? '' : 'q-px-none'"
          clickable
          to=""
        >
          <q-item-section :class="itemClass">
            <q-item-label class="text-on-dark text-body2 no-letter-spacing"
              >پلاگین‌ها</q-item-label
            >
          </q-item-section>

          <q-item-section side :class="itemClass">
            <q-btn round dense unelevated>
              <q-icon :name="expandIcon()" size="24px" />
            </q-btn>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const expandIcon = () => {
  if ($q.lang.rtl) {
    return "chevron_left";
  } else {
    return "chevron_right";
  }
};

const itemClass = computed(() => ($q.screen.lt.sm ? "q-mx-md" : "q-mx-sm"));
</script>

<style lang="scss">
.settings-card {
  width: 900px;
}
</style>
