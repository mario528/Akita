<template>
  <Teleport :to="teleportId">
    <transition name="overlay-fade">
      <div
        v-show="visible"
        :class="overlayCls"
        :style="overlayStyle"
        @click="handleClickOverlay"
      >
        <slot></slot>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import { computed } from "@vue/runtime-core";
import processComponent from "../../utils/base";
const { warpComponent } = processComponent("overlay");
export default warpComponent({
  props: {
    teleportId: {
      type: String,
      default: "body",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: [Number, String],
      default: 0.2,
    },
    backgroundColor: {
      type: String,
      default: "rgba(0,0,0,.2)",
    },
    closeAble: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["overlay:click"],
  setup(props, { emit }) {
    const overlayCls = computed(() => {
      return {
        "overlay-container": true,
      };
    });
    const overlayStyle = computed(() => {
      return {
        animationDuration: `${props.duration}s`,
        backgroundColor: props.backgroundColor,
      };
    });
    const handleClickOverlay = () => {
      if (props.closeAble) {
        emit("overlay:click");
      }
    };
    return {
      overlayCls,
      overlayStyle,
      handleClickOverlay,
    };
  },
});
</script>

<style scoped>
.overlay-fade-enter-active {
  animation: fade-in;
}
.overlay-fade-leave-active {
  animation: fade-out;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.overlay-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
