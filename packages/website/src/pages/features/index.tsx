import { useEffect, useState } from "react";
import { Octokit } from '@octokit/rest'
import { Frame } from "@/ui/frame";
import ReactMarkdown from 'react-markdown'

const getData = async () => {
  const octokit = new Octokit();
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: 'morten-olsen',
    repo: 'shipped',
    labels: 'idea',
    state: 'open',
  });
  return data;
}

type Data = NonNullable<typeof getData extends () => Promise<infer T> ? T : never>;

const Features = () => {
  const [features, setFeatures] = useState<Data>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const data = await getData();
      setFeatures(data);
      setLoading(false);
    }
    run();
  }, []);

  return (
    <Frame>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Ideas</h1>
        <p className="text-gray-700 text-base">This is a list of ideas for features that could be added to the game. If you see something you like, please give it a thumbs up!</p>
        <div className="mt-4">
          {loading && <p>Loading...</p>}
          {!loading && features.map((feature) => (
            <div key={feature.id} className="rounded overflow-hidden shadow-md mb-10 px-6 px-4 bg-white">
              <a href={feature.html_url}>
                <h2 className="font-bold text-xl my-2">{feature.title}</h2>
              </a>
              {feature.body && <ReactMarkdown className="text-gray-700 text-base">{feature.body}</ReactMarkdown>}
              <div className="flex flex-wrap mt-2 mb-4">
                {feature.reactions && feature.reactions['+1'] > 0 && (
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">
                    {feature.reactions?.['+1']} 👍
                  </span>
                )}
                {feature.labels?.map((label) => (
                  <span key={typeof label === 'string' ? label : label.id} className="inline-block border border-gray-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">
                    {typeof label === 'string' ? label : label.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export { Features }