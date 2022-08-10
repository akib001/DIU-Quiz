import AdminLayout from '../components/Admin/AdminDashboard';

function MyApp({ Component, pageProps }) {
  return (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  );
}

export default MyApp;
