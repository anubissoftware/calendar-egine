
export interface EventInterface{
    [person: string]: {
        [day: string]: EventData[]
    }
}

export interface EventData{
    id: number;
    dscp: string;
    cta?: string;
    hours?: {
        start: string;
        end: string;
    }
}