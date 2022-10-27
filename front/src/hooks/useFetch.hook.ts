import {ref, watch, unref, Ref} from 'vue';
import {AxiosError, AxiosResponse} from 'axios';
import { computedEager } from '@vueuse/core';

export type anyFunc = (...args: any[]) => any;
export type AsyncFunc = anyFunc | Ref<anyFunc>;
export interface options {
  watchVar?: Ref<any>;
  immediately: boolean;
}

export function useFetchAPI<T, D>(
  asyncFunc?: AsyncFunc,
  params?: object | Ref<object>,
  options: options = {immediately: true}
) {

  const loading = ref<boolean>(false);
  const error = ref<D>();
  const data = ref<T>();

  const isError = computedEager(() => Boolean(error.value));
  const isLoading = computedEager(() => loading.value);
  const isSuccess = computedEager(() => !isLoading.value && !isError.value && Boolean(data.value));

  async function load() {
    try {
      if (!asyncFunc) return;

      loading.value = true;

      const resp = await unref(asyncFunc)(unref(params));

      loading.value = false;
      data.value = resp;
      console.log('error', resp)
      return resp;
    } catch (e) {
      console.log('error', e)
      if (e instanceof AxiosError) {
        error.value = e.response?.data;
      } 
    } finally {
      loading.value = false;
    }
  }

  if (options?.immediately) {
    load();
  }

  if (options?.watchVar) {
    watch(options.watchVar, (v) => {
      if (!v && v !== undefined) return;
      load();
    });
  }

  return {
    isError,
    isLoading,
    isSuccess,
    data,
    loading,
    error,
    load,
  };
}