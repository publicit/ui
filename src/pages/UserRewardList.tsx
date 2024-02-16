import {useEffect, useState} from "react";
import {userRewardsList} from "../helpers/api";
import {Title} from "@mantine/core";
import {UserReward} from "../models/user_reward";
import {UserRewardsTable} from "../components/RewardsTable";
import {computeUserRewardBalance} from "../helpers/user_reward";


export function UserRewards() {
    const [rows, setRows] = useState<UserReward[]>([])
    useEffect(() => {
        async function loadData() {
            try {
                const data = await userRewardsList()
                const computed = computeUserRewardBalance(data)
                setRows(computed)
            } catch (e) {
                console.error(e)
            }
        }

        loadData();
    }, []);


    return (
        <div>
            <Title>Tus Recompensas</Title>

            <UserRewardsTable rows={rows}/>
        </div>
    )
}
