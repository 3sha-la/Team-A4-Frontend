import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AllProductsPage from './pages/AllProductsPage';
import WishlistPage from './pages/WishlistPage';
import { useWishlist, WishlistProvider } from './context/WishlistContext';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = useWishlist();
  const showSidebar = ['/products', '/wishlist'].includes(location.pathname);

  const handleSidebarNavigation = (key) => {
    const routes = {
      home: '/',
      products: '/products',
      wishlist: '/wishlist',
    };

    if (routes[key]) navigate(routes[key]);
  };

  return (
    <>
      {!showSidebar && <Navbar />}
      {showSidebar && (
        <header className="flex items-center justify-between border-b border-[#e7e0d5] bg-[#f6f3ee] px-5 py-4 lg:hidden">
          <button onClick={() => navigate('/')} className="font-serif text-lg font-semibold text-[#28231d]">
            House of Salaga
          </button>
          <nav className="flex items-center gap-4 text-xs font-semibold text-[#6c675e]">
            <button onClick={() => navigate('/products')} className={location.pathname === '/products' ? 'text-[#a8780c]' : ''}>
              Shop
            </button>
            <button onClick={() => navigate('/wishlist')} className={location.pathname === '/wishlist' ? 'text-[#a8780c]' : ''}>
              Wishlist{items.length > 0 ? ` (${items.length})` : ''}
            </button>
          </nav>
        </header>
      )}
      <div className={showSidebar ? 'flex min-h-screen bg-neutral-100' : ''}>
        {showSidebar && (
          <Sidebar
            active={location.pathname === '/wishlist' ? 'wishlist' : 'products'}
            onNavigate={handleSidebarNavigation}
            wishlistCount={items.length}
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
          {!showSidebar && <Footer />}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <WishlistProvider>
      <Router>
        <AppLayout />
      </Router>
    </WishlistProvider>
  );
}

export default App;