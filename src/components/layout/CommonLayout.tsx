import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

function CommonLayout({ children }: Props) {
  return (
    <div className="dark">
      <Navbar />
      {children}

      <Footer />
    </div>
  );
}

export default CommonLayout;
