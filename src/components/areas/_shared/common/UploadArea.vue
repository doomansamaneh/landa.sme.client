<template>
  <q-card
    flat
    style="border: 2px dashed #00000040"
    class="relative-position q-pa-md row items-center justify-center q-hoverable cursor-pointer"
    @click="triggerFileInput"
  >
    <span class="q-focus-helper" />

    <q-card-section class="no-pointer-events">
      <q-file
        ref="inputArea"
        v-model="file"
        class="absolute fit"
        accept=".xlsx,.csv"
        style="opacity: 0"
      />

      <div class="flex items-center justify-center q-gutter-sm">
        <q-icon name="attach_file" size="56px" color="grey" />
        <div v-if="file">
          <div class="text-weight-500">
            <span class="text-roboto text-body1">{{ fileName }}</span>
            <a
              href="#"
              class="text-body1 text-primary q-ml-sm"
              @click="clearFile"
            >
              اصلاح فایل
            </a>
          </div>
          <div class="q-mt-xs">
            حجم فایل شما:
            <span>{{ formattedSize }}</span>
          </div>
        </div>
        <div v-else>
          <div class="text-body1 text-center text-weight-500">
            می‌توانید
            <a href="#" class="text-primary">فایل بارگذاری کنید</a>
            یا آن را اینجا بکشید و رها کنید.
          </div>
          <div class="text-body3 q-mt-xs text-center">
            فقط پسوندهای
            <span class="text-roboto">XLSX & CSV</span>
            پشتیبانی می‌شوند.
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <slot name="actions">
    <div v-if="file" class="row q-gutter-md q-mt-none">
      <slot name="upload-button">
        <q-btn
          rounded
          class="col primary-gradient text-white primary-shadow"
          unelevated
          padding="12px"
          @click="upload"
        >
          <q-icon size="20px" name="arrow_upward" class="q-mr-xs" />
          <div class="text-body1">ارسال اطلاعات</div>
        </q-btn>
      </slot>

      <slot name="clear-button">
        <q-btn
          class="col"
          unelevated
          rounded
          padding="12px"
          @click="clearFile"
        >
          <q-icon size="20px" name="delete" class="q-mr-xs" />
          <div class="text-body1">حذف</div>
        </q-btn>
      </slot>
    </div>
  </slot>
</template>

<script setup>
  import { ref, computed } from "vue";

  const emits = defineEmits(["upload"]);
  const file = ref(null);
  const inputArea = ref(null);

  const fileName = computed(() => file.value?.name || "");

  const formattedSize = computed(() => {
    if (!file.value) return "";
    const size = file.value.size;
    const units = ["بایت", "کیلوبایت", "مگابایت", "گیگابایت"];
    let unitIndex = 0;
    let value = size;

    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }

    return `${value.toFixed(unitIndex === 3 ? 2 : 0)} ${
      units[unitIndex]
    }`;
  });

  const triggerFileInput = () => {
    inputArea?.value.pickFiles();
  };

  const upload = () => {
    if (!file.value) return;
    emits("upload", file);
  };

  const clearFile = () => {
    file.value = null;
  };
</script>
