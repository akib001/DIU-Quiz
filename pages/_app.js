import AdminLayout from '../components/Admin/AdminDashboard';
import UserDashboard from '../components/user/UserDashboard';

function MyApp({ Component, pageProps }) {
  return (
    <UserDashboard>
      <Component {...pageProps} />
    </UserDashboard>
  );
}

export default MyApp;
