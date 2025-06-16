<template>
  <ul :class="timelineClasses">
    <slot></slot>
  </ul>
</template>

<script setup>
  import { computed, provide } from "vue";
  import { useQuasar } from "quasar";

  const props = defineProps({
    color: {
      type: String,
      default: "primary",
    },
    side: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right"].includes(v),
    },
    layout: {
      type: String,
      default: "dense",
      validator: (v) => ["dense", "comfortable", "loose"].includes(v),
    },
  });

  const $q = useQuasar();

  const timelineClasses = computed(() => {
    return `custom-timeline custom-timeline--${props.layout} custom-timeline--${props.layout}--${props.side}`;
  });

  // Provide timeline context to children
  provide("timeline", {
    color: props.color,
    side: props.side,
    layout: props.layout,
  });
</script>

<style lang="scss">
  .custom-timeline {
    padding: 0;
    width: 100%;
    list-style: none;

    h6 {
      line-height: inherit;
    }

    &--dark {
      color: #fff;
      .custom-timeline__subtitle {
        opacity: 0.7;
      }
    }

    &__content {
      padding-bottom: 24px;
    }

    &__title {
      margin-top: 0;
      margin-bottom: 16px;
    }

    &__subtitle {
      font-size: 0.75rem;
      margin-bottom: 8px;
      opacity: 0.6;
      text-transform: uppercase;
      letter-spacing: 0.0375em;
      font-weight: 700;
    }

    &__dot {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 150px;

      &:before,
      &:after {
        content: "";
        background: currentColor;
        display: block;
        position: absolute;
      }

      &:before {
        // border: 3px solid transparent;
        // border-radius: 100%;
        // height: 15px;
        // width: 15px;
        // top: 4px;
        // left: 0;
        // transition: background 0.3s ease-in-out,
        //   border 0.3s ease-in-out;
      }

      &:after {
        width: 3px;
        opacity: 0.4;
        top: 40px;
        bottom: -8px;
        left: 12px;
      }

      .q-icon {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        font-size: 1.5rem;
        height: 38px;
        line-height: 38px;
        width: 100%;
        color: #fff;

        > svg,
        > img {
          width: 1em;
          height: 1em;
        }
      }
    }

    &__dot-img {
      position: absolute;
      top: 4px;
      left: 0;
      right: 0;
      height: 31px;
      width: 31px;
      background: currentColor;
      border-radius: 50%;
    }

    &__heading {
      position: relative;

      &:first-child .custom-timeline__heading-title {
        padding-top: 0;
      }

      &:last-child .custom-timeline__heading-title {
        padding-bottom: 0;
      }
    }

    &__heading-title {
      padding: 32px 0;
      margin: 0;
    }

    &__entry {
      position: relative;
      line-height: 22px;

      &:last-child {
        padding-bottom: 0 !important;
        .custom-timeline__dot:after {
          content: none;
        }
      }

      &--icon {
        .custom-timeline__dot {
          width: 31px;
          &:before {
            height: 31px;
            width: 31px;
          }
          &:after {
            top: 41px;
            left: 14px;
          }
        }
        .custom-timeline__subtitle {
          padding-top: 8px;
        }
      }
    }

    // Dense layout
    &--dense--right {
      .custom-timeline__entry {
        padding-left: 40px;

        &--icon .custom-timeline__dot {
          left: -8px;
        }
      }

      .custom-timeline__dot {
        left: 0;
      }
    }

    &--dense--left {
      .custom-timeline__heading {
        text-align: right;
      }

      .custom-timeline__entry {
        padding-right: 40px;

        &--icon .custom-timeline__dot {
          right: -8px;
        }
      }

      .custom-timeline__content,
      .custom-timeline__title,
      .custom-timeline__subtitle {
        text-align: right;
      }

      .custom-timeline__dot {
        right: 0;
      }
    }

    // Comfortable layout
    &--comfortable {
      display: table;

      .custom-timeline__heading {
        display: table-row;
        font-size: 1.25rem;
        > div {
          display: table-cell;
        }
      }

      .custom-timeline__entry {
        display: table-row;
        padding: 0;
        &--icon .custom-timeline__content {
          padding-top: 8px;
        }
      }

      .custom-timeline__subtitle,
      .custom-timeline__dot,
      .custom-timeline__content {
        display: table-cell;
        vertical-align: top;
      }

      .custom-timeline__subtitle {
        width: 35%;
      }

      .custom-timeline__dot {
        position: relative;
        min-width: 31px;
      }
    }

    &--comfortable--right {
      .custom-timeline__heading .custom-timeline__heading-title {
        margin-left: -50px;
      }

      .custom-timeline__subtitle {
        text-align: right;
        padding-right: 30px;
      }

      .custom-timeline__content {
        padding-left: 30px;
      }

      .custom-timeline__entry--icon .custom-timeline__dot {
        left: -8px;
      }
    }

    &--comfortable--left {
      .custom-timeline__heading {
        text-align: right;

        .custom-timeline__heading-title {
          margin-right: -50px;
        }
      }

      .custom-timeline__subtitle {
        padding-left: 30px;
      }

      .custom-timeline__content {
        padding-right: 30px;
      }

      .custom-timeline__content,
      .custom-timeline__title {
        text-align: right;
      }

      .custom-timeline__entry--icon .custom-timeline__dot {
        right: 0;
      }

      .custom-timeline__dot {
        right: -8px;
      }
    }

    // Loose layout
    &--loose {
      .custom-timeline__heading-title {
        text-align: center;
        margin-left: 0;
      }

      .custom-timeline__entry,
      .custom-timeline__subtitle,
      .custom-timeline__dot,
      .custom-timeline__content {
        display: block;
        margin: 0;
        padding: 0;
      }

      .custom-timeline__dot {
        position: absolute;
        left: 50%;
        margin-left: -7.15px;
      }

      .custom-timeline__entry {
        padding-bottom: 24px;
        overflow: hidden;

        &--icon {
          .custom-timeline__dot {
            margin-left: -15px;
          }
          .custom-timeline__subtitle {
            line-height: 38px;
          }
          .custom-timeline__content {
            padding-top: 8px;
          }
        }

        &--left {
          .custom-timeline__content,
          .custom-timeline__subtitle {
            float: left;
            padding-right: 30px;
            text-align: right;
          }
        }

        &--right {
          .custom-timeline__content,
          .custom-timeline__subtitle {
            float: right;
            text-align: left;
            padding-left: 30px;
          }
        }
      }

      .custom-timeline__subtitle,
      .custom-timeline__content {
        width: 50%;
      }
    }
  }
</style>
