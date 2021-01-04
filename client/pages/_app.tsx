import 'bootstrap/dist/css/bootstrap.css';

import type { AppProps } from "next/app";
import buildClient from "../api/build-client";
import Header from '../components/header'

interface myAppProps {
  Component;
  pageProps;
  currentUser: CurrentUser;
}

interface CurrentUser {
  id: string;
  email: string;
}
function AppComponent({ Component, pageProps, currentUser }: myAppProps) {
  return (
    <div>
      <Header currentUser={ currentUser } />
      <Component {...pageProps} />
    </div>
  );
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }
  return {
    pageProps,
    ...data
  };
}

export default AppComponent;