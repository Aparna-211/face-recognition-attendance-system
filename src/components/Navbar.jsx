import { Link, useLocation } from 'react-router-dom';
import { Home, UserPlus, Camera, ShieldCheck, LayoutDashboard, ClipboardList, Users } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/register', label: 'Register', icon: UserPlus },
  { to: '/recognition', label: 'Camera', icon: Camera },
  { to: '/od', label: 'OD', icon: ShieldCheck },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/records', label: 'Records', icon: ClipboardList },
  { to: '/team', label: 'Team', icon: Users },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-logo">📷</div>
        <div>
          <h1>FaceAttend AI</h1>
        </div>
      </div>

      <nav className="nav-icons">
        {items.map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to} className={location.pathname === to ? 'nav-link active' : 'nav-link'} title={label}>
            <Icon size={22} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
