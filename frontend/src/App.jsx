import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AnalysisReview from "./pages/AnalysisReview";
import ImageUpload from "./pages/ImageUpload";
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
          path: 'uploadCar',
          element: <ImageUpload />
        },
        {
          path: 'analysisReview',
          element: <AnalysisReview />
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