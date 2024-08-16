import DailyClaim from 'components/Main/DailyClaim'
import Points from 'components/Main/Points'
import { ClientUser } from 'type/User'

export default function ({ user }: { user: ClientUser | null }) {
  return (
    <div className="flex flex-row justify-between items-center">
      <Points amount={user?.balance} />{' '}
      <DailyClaim timeToReward={user?.timeToReward} />
    </div>
  )
}
