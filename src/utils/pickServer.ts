import { type Server } from "../types";

let roundRobinIndex = 0;

export default function pickServer(servers: Server[], algorithm: string): Server | null {
    switch (algorithm) {
        case "Round Robin":
            const server = servers[roundRobinIndex % servers.length];
            roundRobinIndex++;
            return server;
        default:
            return null;
    }
} 