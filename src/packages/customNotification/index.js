/**
 *  重写ElementUI的ElNotification
 * 添加一个消息提示窗数量限制、最多5个，超出之后先关闭最开始的一个
 */
import {ElNotification} from "element-plus";

const instances = [];
const customStyle = {
    error: 'custom-notification custom-notification-error',
    success: 'custom-notification',
    info: 'custom-notification',
    warning: 'custom-notification'
}
const newElNotification = options => {
    options.customClass = customStyle[options?.type] || 'custom-notification';
    options.showClose = options.showClose || true;
    if (instances.length <= 4) {
        instances.push(ElNotification(options))
    } else {
        instances[0].close()
        instances.shift()
        instances.push(ElNotification(options))
    }
}

const messageList = ['error', 'success', 'info', 'warning']
messageList.forEach(type => {
    newElNotification[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            }
        }
        options.type = type
        return newElNotification(options)
    }
})
export const customNotification = newElNotification;

export const singletonNotification = ({ type, message }) => {
    window.ons_ElNotification_tag?.close();
    const customClass = customStyle[type] || 'custom-notification';
    window.ons_ElNotification_tag =  ElNotification({
        customClass,
        message,
        type,
        showClose: true
    })
}
