import { Features } from './pages/features';
import { Frontpage } from './pages/frontpage';
import { Game } from './pages/game';
import { Page } from './ui/page'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const pageImports = import.meta.glob("./pages/articles/**/main.mdx");
const pages: any = Object.entries(pageImports).map(([path, page]) => ({
  path: path.replace("./pages/articles/", "").replace("/main.mdx", ""),
  element: <Page content={page as any} />,
}))

const router = createHashRouter([
  {
    path: "/",
    element: <Frontpage />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/articles",
    children: pages,
  },
  {
    path: "/game",
    element: <Game />,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
