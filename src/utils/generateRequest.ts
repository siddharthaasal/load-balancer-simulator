import { type Server, type Request } from "../types.ts";
import pickServer from "./pickServer.ts";

interface generateRequestProps {
    servers: Server[];
    algorithm: string;
    setServers: React.Dispatch<React.SetStateAction<Server[]>>;
}

let requestId = 0;

export function generateRequest({ servers, algorithm, setServers }: generateRequestProps) {
    const request: Request = {
        id: requestId++,
        createdAt: Date.now(),
        assignedTo: -1,
    };

    const selectedServer = pickServer(servers, algorithm);

    if (!selectedServer) return;

    if (
        selectedServer.maxCapacity === undefined ||
        selectedServer.queue.length < selectedServer.maxCapacity
    ) {
        request.assignedTo = selectedServer.id;

        const updatedServers = servers.map(server => {
            if (server.id === selectedServer.id) {
                return {
                    ...server,
                    queue: [...server.queue, request]
                };
            }
            return server;
        });

        setServers(updatedServers);

        // Remove after 1 second
        setTimeout(() => {
            setServers(prev =>
                prev.map(server => {
                    if (server.id === selectedServer.id) {
                        return {
                            ...server,
                            queue: server.queue.slice(1)
                        };
                    }
                    return server;
                })
            );
        }, 1000);
    } else {
        console.log(`Server ${selectedServer.id} is full. Request ${request.id} dropped or requeued.`);
        // You can optionally queue it elsewhere here.
    }
}
