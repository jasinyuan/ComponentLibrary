import { createNamespace } from '@jasin-y/utils/create'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'YVirtualList',
  props: {
    size: {
      type: Number,
      default: 35
    },
    remain: {
      default: 8,
      type: Number
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  setup(props, { slots }) {
    const bem = createNamespace('vl')
    const wrapperRef = ref<HTMLElement>()
    const barRef = ref<HTMLElement>()
    const state = reactive({
      start: 0,
      end: props.remain
    })

    const prev = computed(() => {
      return Math.min(state.start, props.remain)
    })

    const next = computed(() => {
      return Math.min(props.remain, props.items.length - state.end)
    })
    //多展示，上8条和下8条，保证用户在快速滚动不会白屏
    const visibleData = computed(() => {
      return props.items.slice(state.start - prev.value, state.end + next.value)
    })
    function initWrapper() {
      wrapperRef.value!.style.height = props.remain * props.size + 'px'
      barRef.value!.style.height = props.items.length * props.size + 'px'
    }
    watch(
      () => props.items,
      () => {
        initWrapper()
      }
    )
    onMounted(() => {
      initWrapper()
    })
    const offset = ref(0)

    const handleScroll = () => {
      //根据当前滚动的距离来计算过去了几个
      const scrollTop = wrapperRef.value!.scrollTop

      state.start = Math.floor(scrollTop / props.size) //划过去的个数

      state.end = state.start + props.remain
      offset.value = state.start * props.size - props.size * prev.value //滚过去的个数
    }
    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          <div class={bem.e('scroll-bar')} ref={barRef}></div>
          <div
            class={bem.e('scroll-list')}
            style={{ transform: `translate3d(0,${offset.value}px,0)` }}
          >
            {visibleData.value.map((node, idx) => slots.default!({ node }))}
          </div>
        </div>
      )
    }
  }
})
