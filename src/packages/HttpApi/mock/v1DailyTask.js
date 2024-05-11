export default {
    "code": 0,
    "data": {
        "nft": [
            {
                "id": 5,
                "action": "holding",
                "point": 5,
                "status": 0,
                "title": "专属NFT积分加成任务",
                "buttonText": "领取",
                "extra": {
                    "target": "_blank",
                    "target_url": "https://twitter.com/intent/post?text=%40oneness%20%23oneness%20Twitter%20Web%20Intent%20https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FGHofVllboAAGZJt%3Fformat%3Djpg%26name%3Dlarge",
                    "need_check": 0, // 控制页面是否有刷新按钮
                    "check_url": "url"  // 如果need_check: 1, 用户行为发生后, 调用该接口验证
                }
            }
        ],
        "twitter": [
            {
                "id": 6,
                "action": "post",
                "point": 5,
                "status": 0,
                "title": "发送推文",
                "describe": "需要@Oneness并带上Oneness的标签",
                "buttonText": "Post",
                "extra": {
                    "target": "_blank",
                    "target_url": "https://twitter.com/intent/post?text=%40oneness%20%23oneness%20Twitter%20Web%20Intent%20https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FGHofVllboAAGZJt%3Fformat%3Djpg%26name%3Dlarge",
                    "need_check": 1, // 控制页面是否有刷新按钮
                    "check_url": "url"  // 如果need_check: 1, 用户行为发生后, 调用该接口验证
                }
            },
            {
                "id": 7,
                "action": "rename",
                "point": 5,
                "status": 0,
                "title": "修改昵称",
                "describe": "需要带上Oneness的前缀",
                "buttonText": "Go",
                "extra": {
                    "target": "_blank",
                    "target_url": "https://twitter.com/settings/profile",
                    "need_check": 1, // 控制页面是否有刷新按钮
                    "check_url": "url"  // 如果need_check: 1, 用户行为发生后, 调用该接口验证
                }
            },
            {
                "id": 8,
                "action": "reply",
                "point": 5,
                "status": 0,
                "title": "评论推文",
                "describe": "需要@Oneness并带上Oneness的标签",
                "buttonText": "Reply",
                "extra": {
                    "target": "_blank",
                    "target_url": "https://twitter.com/intent/tweet?in_reply_to=1763911418716557374&text=%23oneness%20%40oneness",
                    "need_check": 0, // 控制页面是否有刷新按钮
                    "check_url": ""  // 如果need_check: 1, 用户行为发生后, 调用该接口验证
                }
            },
            {
                "id": 9,
                "action": "retweet",
                "point": 5,
                "status": 0,
                "title": "转发推文",
                "describe": "",
                "buttonText": "Retweet",
                "extra": {
                    "target": "_blank",
                    "target_url": "https://twitter.com/intent/retweet?tweet_id=1762502940961722677",
                    "need_check": 0, // 控制页面是否有刷新按钮
                    "check_url": ""  // 如果need_check: 1, 用户行为发生后, 调用该接口验证
                }
            },
            {
                "id": 10,
                "action": "like",
                "point": 5,
                "status": 0,
                "title": "点赞推文",
                "describe": "",
                "buttonText": "Like",
                "extra": {
                    "target": "_blank",
                    "target_url": "https://twitter.com/intent/like?tweet_id=1763778041824805023",
                    "need_check": 0, // 控制页面是否有刷新按钮
                    "check_url": ""  // 如果need_check: 1, 用户行为发生后, 调用该接口验证
                }
            }
        ]
    },
    "message": "",
    "timestamp": 1709362185,
    "trace_id": ""
}