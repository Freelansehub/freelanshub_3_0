import { Outlet } from "react-router-dom";
import HeaderContainer from "../components/Header/HeaderContainer";

export default function Layout(): React.ReactElement {

  return (
    <>
      <HeaderContainer className="header"/>
      <main data-testid='main-container' className="content">
        <Outlet />
      </main>
    </>
  );
}
