import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app-layout">
        <Outlet />
    </div>
  );
};

export default Layout;
