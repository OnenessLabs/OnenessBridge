export default {
    "code": 0,
    "data": {
        "twitter": [
            {
                "id": 1,
                "action": "bind",
                "point": 5,
                "status": 0,
                "title": "绑定推特账号",
                "describe": "",
                "buttonText": "Bind",
                "extra": {
                    "check_button_type": 1, // 刷新按钮类型 1: 图标按钮 2: 文字按钮
                    "check_button_text": "", // 按钮文案
                    "target": "fetch_blank",
                    "target_url": "https://api.twitter.com/oauth/authorize?oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0",
                    "need_check": 1, // 控制页面是否有刷新按钮
                    "check_url": "url"  // 如果need_check: 1, 用户行为发生后, 调用该接口验证
                }
            },
            {
                "id": 2,
                "action": "follow",
                "point": 5,
                "status": 0,
                "title": "关注Oneness官方账号",
                "describe": "",
                "buttonText": "Follow",
                "extra": {
                    "target":"_blank",
                    "user_id": "", // 被关注用户ID
                    "target_url": "https://twitter.com/intent/follow?screen_name=username", // 被关注用户twitter用户主页地址, 打开PC即可关注
                    "need_check": 1, // 控制页面是否有刷新按钮
                    "check_url": "url"  // 如果need_check: 1, 用户行为发生后, 调用该接口验证
                }
            }
        ],
        "discord": [
            {
                "id": 3,
                "action": "bind",
                "point": 5,
                "status": 0,
                "title": "绑定discord账号",
                "describe": "",
                "buttonText": "Bind",
                "extra": {
                    "target": "fetch_blank",
                    "need_check": 1, // 控制页面是否有刷新按钮
                    "target_url": "https://discord.com/oauth2/authorize?response_type=code&client_id=157730590492196864&scope=identify%20guilds.join&state=15773059ghq9183habn&redirect_uri=https%3A%2F%2Fnicememe.website&prompt=consent"
                }
            },
            {
                "id": 4,
                "action": "follow",
                "point": 5,
                "status": 0,
                "title": "加入discord官方频道",
                "describe": "",
                "buttonText": "Follow",
                "extra": {
                    "target": "_blank",
                    "guild_id": "", // 社区ID
                    "target_url": "https://discord.gg/XYZ123" // discord社区加入链接, 打开该页面进行加入
                }
            }
        ],
    },
    "message": "",
    "timestamp": 1709362185,
    "trace_id": ""
}