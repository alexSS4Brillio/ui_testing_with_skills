import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Users', description: 'User Management' },
        { path: '/posts', label: 'Posts', description: 'Social Media Posts' },
        { path: '/albums', label: 'Albums', description: 'Album collections by user' },
        // Add more navigation items here as pages are created
        // { path: '/user/:id', label: 'User Details', description: 'Individual User Details' },
        // { path: '/about', label: 'About', description: 'About Page' },
        // { path: '/dashboard', label: 'Dashboard', description: 'Dashboard' },
    ];

    return (
        <div className="layout">
            <header className="layout-header">
                <div className="header-content">
                    <h1 className="app-title">UI Testing App</h1>
                    <nav className="main-nav">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-button ${location.pathname === item.path ? 'active' : ''}`}
                                title={item.description}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>
            <main className="layout-main">
                <Outlet />
            </main>
        </div>
    );
}