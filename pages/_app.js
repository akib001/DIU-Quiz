import AdminLayout from '../components/Admin/AdminDashboard';
import UserDashboard from '../components/user/UserDashboard';
import { SWRConfig } from 'swr';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../store'
import Layout from '../components/Layout/Layout';

axios.defaults.baseURL = 'http://localhost:8080';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SWRConfig value={{ fetcher: (url) => axios(url).then((r) => r.data) }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
