declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'element-ui/lib/table' {
  export default Vue
}
declare module 'element-ui/lib/pagination' {
  export default Vue
}

declare module 'element-ui/lib/loading' {
  import { DirectiveFunction } from 'vue'
  const _default: DirectiveFunction
  export default _default
}
