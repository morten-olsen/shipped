import { Editor as PlaygroundEditor } from '@shipped/playground';
import { useContext } from 'react';
import { GameContext } from './context';

const Editor = () => {
  const { value, setValue, selected } = useContext(GameContext);

  if (!selected) return (
    <div className='flex-1 flex items-center justify-center'>
      Select an AI to edit
    </div>
  );

  return (
    <div className='flex-1 h-full'>
      <PlaygroundEditor className='h-full' value={value || ''} onValueChange={setValue} />
    </div>
  );
}

export { Editor }