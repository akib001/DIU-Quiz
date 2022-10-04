import {useSelector} from "react-redux";
import AdminStatistics from "../components/Admin/AdminStatistics";
import UserStatistics from "../components/user/UserStatistics";

export default function Home() {
    const stateUserRole = useSelector((state) => state.profile.role);
  return (
    <>
        {stateUserRole === 'user' ? <UserStatistics/> : stateUserRole === 'admin' ? <AdminStatistics/> : <p>You don't have permission</p>}
    </>
  )   
}
