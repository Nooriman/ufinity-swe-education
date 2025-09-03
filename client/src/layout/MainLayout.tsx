import type { ReactNode } from "react";
import "./MainLayout.css";

interface MainLayoutProp {
  title: ReactNode;
  children: ReactNode;
}

const MainLayout = ({ title, children }: MainLayoutProp) => {
  return (
    <div className="layout-box">
      <span className="layout-title">{title}</span>

      {children}
    </div>
  );
};

export default MainLayout;
