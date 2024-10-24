export interface GamesDTO {
    _id: string;
    title: string;
    description?: string;
    release_date: Date;
    genre_id: string;
    publisher_id: string;
    platforms: { platform_id: string; release_date: string }[];
    requirements_id?: string;
    created_at: Date;
}