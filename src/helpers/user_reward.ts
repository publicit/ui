import { UserReward } from '../models/user_reward'
import dayjs from 'dayjs'

// sorts user rewards and calculates the balance for each row
export function computeUserRewardBalance(rows: UserReward[]): UserReward[] {
    const result: UserReward[] = rows.sort((a: UserReward, b: UserReward) =>
        isBefore(a.created_at, b.created_at) ? -1 : 1
    )
    let balance = 0
    return result.map((x: UserReward) => {
        balance += x.amount
        x.balance = balance
        return x
    })
}

function isBefore(a: Date, b: Date): boolean {
    return dayjs(a).isBefore(b)
}
