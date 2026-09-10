import { createBrowserRouter } from 'react-router-dom';
import Layout from '../shared/layouts/Layout';
import Home from '../modules/landing/pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      }
    ]
  }
]);

export default router;
