import type { ReactNode } from "react";

interface MainLayoutProp {
  title: ReactNode;
  children: ReactNode;
}

const MainLayout = ({ title, children }: MainLayoutProp) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "24px 49px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <span
        style={{
          fontWeight: "800",
          fontSize: "24px",
          lineHeight: "36px",
          color: "#333",
        }}
      >
        {title}
      </span>

      {children}
    </div>
  );
};

export default MainLayout;
