<template>
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
              style="enable-background: new 0 0 28.1 80.6"
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
              style="enable-background: new 0 0 28.1 80.6"
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
              style="enable-background: new 0 0 28.1 80.6"
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
</template>

<style lang="scss" scoped>
  @mixin moveAndFadeAnimation($distance, $duration, $delay) {
    & {
      animation: move-and-fade $duration linear infinite;
      animation-delay: $delay;
    }
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
    width: 9px;
    height: 8px;
    display: inline-block;
  }

  .squiggle-container-1 {
    transform: translateY(10px);
    .squiggle {
      @include moveAndFadeAnimation(10px, 2.7s, 0.2s);
      & {
        width: 8px;
      }
    }
  }

  .squiggle-container-2 {
    transform: translateY(0px);
    .squiggle {
      @include moveAndFadeAnimation(20px, 2.7s, 0s);
      & {
        width: 8px;
      }
    }
  }

  .squiggle-container-3 {
    transform: translateY(15px);
    .squiggle {
      @include moveAndFadeAnimation(15px, 2.7s, 0.4s);
      & {
        width: 8px;
      }
    }
  }

  .squiggle {
    stroke-dasharray: 100;
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
  }
</style>
