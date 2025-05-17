import { type Server, type Request } from "../types.ts";
import pickServer from "./pickServer.ts";

interface generateRequestProps {
    servers: Server[];
    algorithm: string;
    updateServers: (servers: Server[]) => void;
};

let requestId = 0;

export function generateRequest({ servers, algorithm, updateServers }: generateRequestProps) {
    const request: Request = {
        id: requestId++,
        createdAt: Date.now(),
        assignedTo: -1,
    }

    const selectedServer = pickServer(servers, algorithm);

    if (selectedServer) {
        request.assignedTo = selectedServer.id;
        selectedServer.queue.push(request);

        setTimeout(
            () => {
                selectedServer.queue.shift();
                updateServers([...servers]);
            },
            1000
        );
    }

    updateServers([...servers]);
}