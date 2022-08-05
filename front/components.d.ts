import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HelloWorld: typeof import('./src/components/HelloWorld.vue')['default']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    TestComponent: typeof import('./src/components/TestComponent.vue')['default']
  }
}

export {}
