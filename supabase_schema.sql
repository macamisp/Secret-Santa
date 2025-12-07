-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Extends Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Groups Table
create table groups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  budget_limit text, -- e.g. "$50"
  exchange_date date,
  admin_user_id uuid references profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'planning' check (status in ('planning', 'drawn', 'completed'))
);

-- 3. Group Members Table
create table group_members (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references groups(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  wishlist text,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(group_id, user_id)
);

-- 4. Matches Table
create table matches (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references groups(id) on delete cascade not null,
  santa_user_id uuid references profiles(id) not null,
  recipient_user_id uuid references profiles(id) not null,
  is_revealed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(group_id, santa_user_id)
);

-- RLS (Row Level Security) Policies
alter table profiles enable row level security;
alter table groups enable row level security;
alter table group_members enable row level security;
alter table matches enable row level security;

-- Profiles: Public read, Self update
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Groups: Visible if member or admin (simplified to public for joining demo, but ideally strictly scoped)
create policy "Groups viewable by members" on groups for select using (
  auth.uid() = admin_user_id or 
  exists (select 1 from group_members where group_members.group_id = groups.id and group_members.user_id = auth.uid())
);
create policy "Admins can create groups" on groups for insert with check (auth.uid() = admin_user_id);
create policy "Admins can update groups" on groups for update using (auth.uid() = admin_user_id);

-- Members: Viewable by group members
create policy "Members viewable by group" on group_members for select using (
  exists (
    select 1 from group_members gm 
    where gm.group_id = group_members.group_id 
    and gm.user_id = auth.uid()
  ) 
  or 
  exists (
    select 1 from groups g 
    where g.id = group_members.group_id 
    and g.admin_user_id = auth.uid()
  )
);
create policy "Users can join groups" on group_members for insert with check (auth.uid() = user_id);
create policy "Users can update own member details" on group_members for update using (auth.uid() = user_id);

-- Matches: Santa can see their recipient, Admin can see all
create policy "Santa can view their match" on matches for select using (
  auth.uid() = santa_user_id 
  or 
  exists (select 1 from groups where id = matches.group_id and admin_user_id = auth.uid())
);

-- Trigger to create profile after signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
