<template>
  <div>
    <q-avatar
      v-if="item"
      :color="color"
      :text-color="textColor"
      :size="size"
      :class="{ 'border-radius-xs': square }"
      :style="helper.generateAvatarStyle(item)"
    >
      <img v-if="item.avatar" :src="item.avatar" />
      <div v-else :class="textHolderClass">
        {{ helper.getFirstChar(textHolder) }}
      </div>
    </q-avatar>

    <q-avatar
      v-else
      :size="size"
      :text-color="textColor"
      :class="{
        'border-radius-xs': square,
        shadow: avatar,
      }"
      :style="avatar ? null : helper.generateAvatarStyle(item)"
    >
      <img v-if="avatar" :src="avatar" />
      <div v-else :class="textHolderClass">
        <slot name="text-place-holder">
          {{ helper.getFirstChar(textHolder) }}
        </slot>
      </div>
    </q-avatar>
  </div>
</template>

<script setup>
  import { helper } from "src/helpers/helper";

  const props = defineProps({
    item: { type: Object, default: null },
    avatar: { type: String, default: "" },
    textHolder: { type: String, default: "" },
    style: { type: String, default: null },
    square: Boolean,
    size: String,
    color: String,
    textColor: String,
    textHolderClass: {
      type: String,
      default: "text-body2 text-bold",
    },
  });
</script>
