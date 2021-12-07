import React, { ReactNode } from 'react';
import Head from 'next/head';
import Sidebar from './sidebar';
import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
`;

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = "Trace"
}: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Main>
      <Sidebar />
      {children}
    </Main>
  </>
);

export default Layout;