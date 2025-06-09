<template>
  <div
    class="relative-position border-radius-lg q-pa-xl dashed row items-center justify-center text-center"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
    @click="triggerFileInput"
  >
    <input
      id="fileInput"
      type="file"
      class="input-upload"
      @change="handleFileUpload"
      accept="file/*.xlsx"
    />
    <div class="column items-center">
      <q-icon
        class="q-pb-lg q-mr-sm cursor-pointer"
        name="attach_file"
        size="180px"
        color="grey"
      />
      <q-btn unelevated padding="12px 24px" rounded color="primary">
        <q-icon size="20px" class="q-mr-xs" name="arrow_upward" />
        <span class="text-body1">بارگزاری از فایل اکسل</span>
      </q-btn>
    </div>
  </div>

  <q-item
    v-if="fileName"
    class="q-py-md dashed border-radius-md q-my-sm"
  >
    <q-item-section avatar>
      <q-avatar size="32px">
        <q-icon size="20px" name="o_upload_file" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <div class="text-body2 ellipsis">
        {{ fileName }}
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row items-center q-gutter-xs">
        <q-btn
          padding="6px 12px"
          color="primary"
          rounded
          unelevated
          dense
          @click="upload"
        >
          <span class="text-body2">ارسال اطلاعات</span>
        </q-btn>

        <q-btn
          unelevated
          dense
          round
          icon="o_close"
          @click="clearFile"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
  import { ref } from "vue";

  const emits = defineEmits(["upload"]);
  const file = ref(null);
  const fileName = ref("");
  const fileFormat = ref("");

  const handleFileUpload = (event) => {
    file.value = event.target.files[0];
    if (file.value) {
      fileName.value = file.value.name;
      fileFormat.value = file.value.type || "Unknown format";
    }
  };

  const upload = () => {
    emits("upload", file);
  };

  const clearFile = () => {
    fileName.value = null;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    const file = event.dataTransfer.files[0];
    if (file) {
      fileName.value = file.name;
      fileFormat.value = file.type || "Unknown format";
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };
</script>

<style lang="scss" scoped>
  .cursor-crosshair {
    cursor: crosshair;
  }

  .dashed {
    border: 2px dashed #00000040;
  }

  .input-upload {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .file-info {
    text-align: center;
    color: #555;
  }
</style>
