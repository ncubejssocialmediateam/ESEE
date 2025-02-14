-- Create articles table
create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  status text not null default 'draft',
  category text,
  tags text[],
  author_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table articles enable row level security;

-- Create policies
create policy "Public articles are viewable by everyone"
  on articles for select
  using (status = 'published');

create policy "Users can create articles"
  on articles for insert
  with check (auth.role() = 'authenticated');

create policy "Users can update their own articles"
  on articles for update
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Users can delete their own articles"
  on articles for delete
  using (auth.uid() = author_id);

-- Create function to automatically update updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger articles_updated_at
  before update on articles
  for each row
  execute procedure handle_updated_at();
