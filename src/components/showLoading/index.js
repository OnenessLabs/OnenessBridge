import { ElLoading } from "element-plus";

let loadingInstance;

const showLoading = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    background: "rgba(0,0,0,0.7)",
  });
};

const hideLoading = () => {
  loadingInstance.close();
};

export { showLoading, hideLoading };
