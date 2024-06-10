import React, { useEffect, useState } from 'react'

// Components :
import PreLoader from '../components/PreLoader'
import { UserRewardsTable } from '../components/RewardsTable'

// Models :
import { UserReward } from '../models/user_reward'

// Helpers :
import { userRewardsList } from '../helpers/api'
import { computeUserRewardBalance } from '../helpers/user_reward'

export function UserRewards() {
    const [rows, setRows] = useState<UserReward[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await userRewardsList()
                const computed = computeUserRewardBalance(data)
                setRows(computed)
            } catch (e) {
                console.error(e)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    return isLoading ? (
        <PreLoader />
    ) : (
        <React.Fragment>
            <h1>Tus Recompensas</h1>
            <UserRewardsTable rows={rows} />
        </React.Fragment>
    )
}
