import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

function CommonLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}

      <Footer />
    </div>
  );
}

export default CommonLayout;
