<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div>
      <div>
        <div class="text-h6 text-weight-700 q-mb-md">
          {{ $t("shared.labels.systemConfiguration") }}
        </div>

        <q-card
          class="bordered overflow-hidden"
          :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
        >
          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/basicInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2">
                {{ $t("shared.labels.basicInfo") }}
              </q-item-label>
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn no-caps round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="1px" />

          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/contactInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2">
                {{ $t("shared.labels.contact") }}
              </q-item-label>
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn no-caps round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="1px" />

          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/VATInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2">
                {{ $t("shared.labels.tax") }}
              </q-item-label>
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn no-caps round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="1px" />

          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/salaryInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2">
                {{ $t("shared.labels.salaryAndWages") }}
              </q-item-label>
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn no-caps round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="1px" />

          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/salesInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2">
                {{ $t("shared.labels.commercePurchaseSale") }}
              </q-item-label>
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn no-caps round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="1px" />

          <q-item
            class="q-py-md"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/cmn/appConfig/logoInfo"
          >
            <q-item-section :class="itemClass">
              <q-item-label class="text-on-dark text-body2">
                {{ $t("shared.labels.logo") }}
              </q-item-label>
            </q-item-section>

            <q-item-section side :class="itemClass">
              <q-btn no-caps round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <q-card
        class="q-mt-xl bordered overflow-hidden"
        :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
      >
        <q-item
          class="q-py-md"
          :class="$q.screen.gt.xs ? '' : 'q-px-none'"
          clickable
          to="/cmn/appConfig/import"
        >
          <q-item-section :class="itemClass">
            <q-item-label class="text-on-dark text-body2">
              {{ $t("shared.labels.dataImport") }}
            </q-item-label>
          </q-item-section>

          <q-item-section :class="itemClass" side>
            <q-btn no-caps round dense unelevated>
              <q-icon :name="expandIcon()" size="24px" />
            </q-btn>
          </q-item-section>
        </q-item>

        <q-separator size="1px" v-access="`cmn.appConfig.api`" />

        <q-item
          v-access="`cmn.appConfig.api`"
          class="q-py-md"
          :class="$q.screen.gt.xs ? '' : 'q-px-none'"
          clickable
          to="/cmn/appConfig/plugin"
        >
          <q-item-section :class="itemClass">
            <q-item-label class="text-on-dark text-body2">
              {{ $t("shared.labels.plugins") }}
            </q-item-label>
          </q-item-section>

          <q-item-section side :class="itemClass">
            <q-btn no-caps round dense unelevated>
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
  import { useI18n } from "vue-i18n";

  const $q = useQuasar();
  const { t } = useI18n();

  const expandIcon = () => {
    if ($q.lang.rtl) {
      return "chevron_left";
    } else {
      return "chevron_right";
    }
  };

  const itemClass = computed(() =>
    $q.screen.lt.sm ? "q-mx-md" : "q-mx-sm"
  );
</script>

<style lang="scss">
  .settings-card {
    width: 900px;
  }
</style>
