import OnsButton from "@/packages/ons-ui//ons-button.vue";
import OnsMessage from "@/packages/ons-ui/ons-message.vue";
import OnsPopup from "@/packages/ons-ui/ons-popup/index.vue";

const OnsUi = {
    install(Vue) {
        Vue.component("ons-button", OnsButton);
        Vue.component("ons-message", OnsMessage);
        Vue.component("ons-popup", OnsPopup);
    }
}

export default OnsUi;

export { OnsButton, OnsMessage, OnsPopup };