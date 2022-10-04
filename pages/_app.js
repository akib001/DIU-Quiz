import { SWRConfig } from 'swr';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../store'
import Layout from '../components/Layout/Layout';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';

// axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.baseURL = 'https://diuquiz-server.onrender.com';
axios.defaults.withCredentials = true;

const progress = new ProgressBar({
  size: 4,
  color: '#FE595E',
  className: 'z-50',
  delay: 100,
});

// Router.events.on whenever there is a change on router it dispatches a action
Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

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
