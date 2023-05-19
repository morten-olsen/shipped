import { useCallback, useContext } from "react";
import { GameContext } from "./context";

const initial = `
import { CaptainAI, CaptainCommand } from "@shipped/engine";

const captain: CaptainAI = ({ vessel, ports, map, currentPort }) => {
  const commands: CaptainCommand[] = [];
  
  // Logic goes here

  return commands;
}

export default captain;
`;

const Sidebar: React.FC = () => {
  const { all, selected, setSelected, create, remove } = useContext(GameContext);

  const createAI = useCallback(() => {
    const name = prompt('Name');
    if (!name) return;
    create(name, initial);
  }, [create]);

  const removeAI = useCallback((name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    remove(name);
  }, [remove]);


  return (
    <div className='flex flex-col w-64 h-full bg-gray-800'>
      <div className='flex-1 overflow-y-auto'>
        <ul className='flex flex-col'>
          {Object.entries(all).map(([name]) => (
            <li

              key={name}
              className={`flex px-4 py-2 cursor-pointer items-center hover:bg-gray-700 ${selected === name ? 'bg-gray-700' : ''}`}
              onClick={() => setSelected(name)}
            >
              <span className="text-gray-300 mr-2">
                {name}
              </span>
              <div className='flex-1' />
              <div className='flex-none'>
                <div className='flex items-center justify-center px-2 text-white py-1 bg-red-600 hover:bg-red-500 text-xs rounded-full w-4 h-4' onClick={() => removeAI(name)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" stroke="#fff" />
                      </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex-none'>
        <button className='w-full px-4 py-2 bg-gray-700 text-white hover:bg-gray-600' onClick={() => createAI()}>
          New
        </button>
      </div>
    </div>
  );
}

export { Sidebar }