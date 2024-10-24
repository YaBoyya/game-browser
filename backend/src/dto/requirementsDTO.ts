export interface RequirementsDTO {
    _id: string;
    min_cpu: string;
    min_ram: string;
    min_gpu: string;
    min_storage: string;
    rec_cpu?: string;
    rec_ram?: string;
    rec_gpu?: string;
    rec_storage?: string;
}