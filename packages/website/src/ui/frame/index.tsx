import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Frame: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <span className="font-semibold text-xl tracking-tight">Shipped</span>
          </Link>
        </div>
      </nav>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  )
};

export { Frame }