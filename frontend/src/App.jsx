import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AnalysisReview from "./pages/AnalysisReview";
import AddImages from "./pages/AddImages";
import Reviewer from "./pages/Reviewer.jsx";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: 'addImages',
          element: <AddImages />
        },
        {
          path: 'analysisReview',
          element: <AnalysisReview />
        },
        {
          path: 'review',
          element: <Reviewer />
        }
      ]
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}