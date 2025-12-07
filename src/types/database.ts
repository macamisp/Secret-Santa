export type Profile = {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    created_at: string;
};

export type Group = {
    id: string;
    name: string;
    budget_limit: string | null;
    exchange_date: string | null;
    admin_user_id: string;
    created_at: string;
    status: 'planning' | 'drawn' | 'completed';
};

export type GroupMember = {
    id: string;
    group_id: string;
    user_id: string;
    wishlist: string | null;
    joined_at: string;
    // Joins
    profiles?: Profile;
};

export type Match = {
    id: string;
    group_id: string;
    santa_user_id: string;
    recipient_user_id: string;
    is_revealed: boolean;
    created_at: string;
    // Joins
    santa?: Profile;
    recipient?: Profile;
};
