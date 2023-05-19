import { Link } from 'react-router-dom';

type Props = {
  links: {
    title: string;
    href: string;
  }[];
}

const Bottom: React.FC<Props> = ({ links }) => {
  return (
    <div className="pt-8 flex px-8">
      <div className="flex-grow"></div>
      {links.map((link) => (
        <Link
          key={link.title}
          to={link.href}
        >
          <button className="button">
            {link.title}
          </button>
        </Link>
      ))}
    </div>
  )
}

export { Bottom };
