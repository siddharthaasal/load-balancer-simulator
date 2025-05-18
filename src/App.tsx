import { useEffect, useState } from 'react'
import './App.css'

import AlgorithmSelector from './components/AlgorithmSelector.tsx';
import ServerSelector from './components/ServerSelector.tsx';
import RPSSelector from './components/RPSSelector.tsx';
import ServerPowerVariance from './components/ServerPowerVariance.tsx';
import { type Server } from "./types.ts"
import { generateRequest } from './utils/generateRequest.ts';
import { generateServerWeight } from './utils/generateServerWeight.ts';

function App() {

  const [servers, setServers] = useState<Server[]>([]);
  const [algorithm, setAlgorithm] = useState("Round Robin");
  const [serverCount, setServerCount] = useState(5);
  const [rps, setRps] = useState(6);
  const [serverPowerVariance, setServerPowerVariance] = useState(2);

  useEffect(
    () => {
      console.log("Re-initializing servers for serverCount = ", serverCount);
      const newServers: Server[] = Array.from({ length: serverCount }, (_, i) => ({
        id: i,
        weight: generateServerWeight(algorithm, serverPowerVariance),
        queue: [],
        maxCapacity: 2,
      }));
      setServers(newServers);
      // console.log(newServers);
    },
    [serverCount, serverPowerVariance, algorithm]
  );

  // Generate requests at RPS rate
  useEffect(() => {
    const interval = setInterval(() => {
      generateRequest({ servers, algorithm, setServers });
    }, 1000 / rps);

    return () => clearInterval(interval);
  }, [rps, servers, algorithm]);





  return (
    <>
      <div className='text-3xl'>In Browser Load Balancer</div>
      <div className='flex justify-between ml-7 mr-7'>
        <div className='mt-10 space-y-6'>
          <AlgorithmSelector value={algorithm} setValue={setAlgorithm} />
          <ServerSelector value={serverCount} setValue={setServerCount} />
          <RPSSelector value={rps} setValue={setRps} />
          <ServerPowerVariance value={serverPowerVariance} setValue={setServerPowerVariance} algorithm={algorithm} />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {servers.map((server) => (
            <div
              key={server.id}
              className="border p-4 rounded bg-gray-100 shadow"
            >
              <p className="font-semibold">Server {server.id + 1}</p>
              <p className="font-semibold">Weight {server.weight}</p>
              <p>Queue Size: {server.queue.length}</p>
              <div className="flex space-x-1 mt-2">
                {server.queue.map((req) => (
                  <div
                    key={req.id}
                    className="w-4 h-4 bg-blue-500 rounded-full"
                    title={`Req ${req.id}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default App;
