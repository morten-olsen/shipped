import { useEffect, useState } from "react";
import { Frame } from "../frame";

type Props = {
  content: () => Promise<{ default: (props: any) => JSX.Element}>
}

const Page: React.FC<Props> = ({ content }) => {
  const [Component, setComponent] = useState<React.ReactComponentElement<any>>();
  useEffect(() => {
    const run = async () => {
      const component = await content();
      setComponent(component.default);
    }
    run();
  }, [content]);

  if (!Component) return null;

  return (
    <Frame>
      <article className="my-10">
        {Component}
      </article>
    </Frame>
  );
};

export { Page };