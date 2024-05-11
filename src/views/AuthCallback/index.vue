<template>
  <div>
    Auth callback
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { query } from "@/packages/utils/index.js";
// import {customNotification} from "@/packages/customNotification/index.js";
// import {hideLoading, showLoading} from "@/components/showLoading/index.js";

onMounted(() => {
  const err = query('err');
  // if (err) {
  //   showLoading();
  //   customNotification({
  //     message: err,
  //     type: 'error',
  //     onClose: () => {
  //       hideLoading();
  //       window.close();
  //     }
  //   });
  // } else {
  //   window.opener.postMessage({ message: err || 'Success!' , type: 'auth_callback' }, location.origin);
  //   window.close();
  // }

  const type = err? 'error' : 'success';
  const message =  err || 'Success!'

  if(window.opener) {
    window.opener.postMessage({
      type,
      message,
      author: 'auth_callback'
    }, location.origin);
    window.close();
  } else {
    window.location.href = '/';
    sessionStorage.setItem('auth_callback_type', type);
    sessionStorage.setItem('auth_callback_message', message);
  }
})
</script>
