import styled from 'styled-components';
import { FC, useEffect, useRef, useState } from "react";
import MonacoEditor from '@monaco-editor/react';
import { usePlaygroundRun } from "../hooks";
import { FleetMap } from "@shipped/fleet-map";
import { typings } from './types';

type Props = {
  value: string,
  onValueChange: (value: string) => void,
  className?: string,
  onRun?: () => void,
}

const Wrapper = styled.div`
  position: relative;
`;

const EditorWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Button = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
  color: #222;
  background: #badc58;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Editor: FC<Props> = ({ className, value, onValueChange, onRun }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<any>(null);
  useEffect(() => {
    if (!ref.current || !editor) return;
    console.log('init')
    const observer = new ResizeObserver(() => {
      console.log('changed')
      editor.layout();
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [editor]);
  return (
    <Wrapper className={className} ref={ref}>
        <EditorWrapper>
          <MonacoEditor
            value={value}
            path="file:///src/index.tsx"
            onChange={(value) => onValueChange(value || '')}
            beforeMount={(monaco) => {
              for (let [path, typing] of Object.entries(typings)) {
                monaco.languages.typescript.typescriptDefaults.addExtraLib(
                  typing,
                  `file:///node_modules/${path}`,
                )
              }
              monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ESNext,
                allowNonTsExtensions: true,
                moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                module: monaco.languages.typescript.ModuleKind.CommonJS,
                noEmit: true,
                esModuleInterop: true,
                typeRoots: ["node_modules/@types"]
              });

            }}
            onMount={(editor) => {
              setEditor(editor);
            }}
            theme="vs-dark"
            language="typescript"
            height="100%"
            width="100%"
            options={{
              minimap: {
                enabled: false
              }
            }}
          />
        </EditorWrapper>
        {onRun && (
          <Button
            onClick={() => onRun()}
          >
            Run
          </Button>
        )}
    </Wrapper>
  )
};

export { Editor };