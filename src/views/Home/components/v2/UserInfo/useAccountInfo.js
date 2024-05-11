import { computed, ref } from "vue";
import pinia,  { useWeb3Store, useInviteCodePopup, useHomeStore } from "@/stores/index.js";

export function useAccountInfo() {
    const homeStore = useHomeStore(pinia);
    const web3Store = useWeb3Store(pinia);
    const inviteCodePopupStore = useInviteCodePopup(pinia);
    const myRank = computed(() => {
        return [
            {
                title: "MY POINTS",
                value: homeStore.v1PointMy.points,
                nft: true,
                nftTotalReward: homeStore.totalNftRewardPoint,
                type: 'points'
            },
            {
                title: "MY RANK",
                value: homeStore.v1PointMy.rank,
                type: 'rank'
            },
        ];
    });

    const mobileLeaderboardRef = ref();
    const pointsDetailPopupRef = ref();
    const userWalletPopupRef = ref();

    const handleItemClick = (type) => {
        if (type === 'rank' && window.innerWidth < 768) {
            return mobileLeaderboardRef.value.handleOpen();
        }
        if (type === 'points') {
            return pointsDetailPopupRef.value.handleOpen();
        }
    }

    const handleOpenWallet = () => {
        userWalletPopupRef.value.handleOpen();
    }

    return {
        myRank,
        web3Store,
        handleItemClick,
        mobileLeaderboardRef,
        pointsDetailPopupRef,
        userWalletPopupRef,
        handleOpenWallet,
        inviteCodePopupStore,
        homeStore
    }
}