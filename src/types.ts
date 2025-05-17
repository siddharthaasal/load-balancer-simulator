
export type Server = {
    id: number;
    weight: number;
    queue: Request[];
    maxCapacity?: number;
};

export type Request = {
    id: number;
    assignedTo: number;
    createdAt: number;
};