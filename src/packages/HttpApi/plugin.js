import HttpApi from "./index.js";
import TokenManage from "./tokenManage.js";

export const httpApiPlugin = {
    install(app) {
        app.config.globalProperties.$httpApi = new HttpApi();
    }
};

export const tokenManagePlugin = {
    install(app) {
        app.config.globalProperties.$tokenManage = new TokenManage();
    }
};