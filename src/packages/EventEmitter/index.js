class EventEmitter {
  constructor() {
    this._eventHandlers = {};
  }

  // 注册事件处理函数
  _on(eventName, handler) {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  }

  // 触发事件
  _emit(eventName, ...args) {
    const handlers = this._eventHandlers[eventName];
    if (handlers) {
      handlers.forEach((handler) => handler(...args));
    }
  }

  // 取消订阅事件
  off(eventName, handler) {
    const handlers = this._eventHandlers[eventName];
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }
}

export default EventEmitter;
