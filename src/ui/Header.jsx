import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-yellow-400 shadow-md">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-widest text-stone-800 transition-colors duration-300 hover:text-stone-900"
        >
          <span className="text-2xl">🍕</span>
          Fast React Pizza Co.
        </Link>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-semibold text-stone-700 underline-offset-4 transition-colors duration-300 hover:text-stone-900 hover:underline"
          >
            Menu
          </Link>
          <Link
            to="/history"
            className="font-semibold text-stone-700 underline-offset-4 transition-colors duration-300 hover:text-stone-900 hover:underline"
          >
            History
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <SearchOrder />
          <Username />

          {/* Mobile Menu Link */}
          <Link
            to="/history"
            className="font-semibold text-stone-700 transition-colors duration-300 hover:text-stone-900 md:hidden"
            title="Order History"
          >
            📋
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
