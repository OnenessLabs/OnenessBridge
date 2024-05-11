import Request from "@/packages/request/index.js";
import v1SocialTask from "@/packages/HttpApi/mock/v1SocialTask.js";
import v1DailyTask from "@/packages/HttpApi/mock/v1DailyTask.js";

class HttpApi extends Request {
  constructor() {
    super(import.meta.env.VITE_APP_API_BASE_URL);
  }

  async login(params = {}) {
    return this.post('/v1/login', params)
  }

  async v1PointMy() {
    return this.get('/v1/point/my', '');
  }

  // 社交平台任务列表
  async v1SocialTask(type = 'social') {
    return this.get(`/v1/task`, { type });
  }

  // 日常任务列表
  async v1DailyTask() {
    return this.get(`/v1/task/daily`, '');
  }

  // 我的邀请信息
  async v1Invite() {
    return this.get('/v1/invite', '');
  }

  // 绑定邀请关系
  async v1InviteBind(code) {
    return this.post('/v1/invite/bind', { code }, { showToast: false });
  }

  // 我的积分记录
  async v1PointMyLog(page, page_size) {
    return this.get(`/v1/point/my_log`, { page, page_size });
  }
  // 积分榜单
  async v1PointRank(page, page_size) {
    return this.get('/v1/point/rank', { page, page_size });
  }
  // 邀请记录
  async v1InviteMyLog(page, page_size) {
    return this.get('/v1/invite/my_log', { page, page_size });
  }
  async v1InviteTaskStatus() {
    return this.get('/v1/invite/task', '');
  }
}

export default HttpApi;
