import { PropsWithChildren } from 'react';

import Footer from './components/footer';
import Header from './components/header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="container pt-14 pb-9">
        <div className="py-8">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
