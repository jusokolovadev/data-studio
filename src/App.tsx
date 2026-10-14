import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Dropzone } from './components/Dropzone';

function App() {
  return (
    <MantineProvider>
      <Dropzone />
    </MantineProvider>
  )
}

export default App
