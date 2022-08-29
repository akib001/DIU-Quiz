import { SWRConfig } from 'swr';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../store'
import Layout from '../components/Layout/Layout';

axios.defaults.baseURL = 'http://localhost:8080';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SWRConfig value={{ fetcher: (url, token) => axios(url, { headers: { Authorization: "Bearer " + token } }).then((r) => r.data) }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
