import { useOutletContext } from 'react-router';
import HomePage from '../home/home';

export default function Home() {
  const [texts]: [Record<string, Record<string, any>>] = useOutletContext();

  return <HomePage texts={texts} />
}
