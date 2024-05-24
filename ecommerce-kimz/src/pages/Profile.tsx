import { useAppSelector } from '@store/hooks'
import { Heading } from '@components/shared/'

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user)
  return (
    <div>
      <Heading title='Account Info' />
      <ul>
        <li>First Name: {user?.firstName}</li>
        <li>Last Name: {user?.lastName}</li>
        <li>Email: {user?.email}</li>
      </ul>
    </div>
  )
}

export default Profile
