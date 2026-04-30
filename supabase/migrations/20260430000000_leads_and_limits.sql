CREATE TABLE IF NOT EXISTS rate_limits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_address TEXT NOT NULL,
    endpoint TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attack_surface_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    domain_scanned TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS to allow inserts from anon keys if we are using anon key.
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE attack_surface_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts to rate_limits" ON rate_limits FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous reads to rate_limits" ON rate_limits FOR SELECT USING (true);

CREATE POLICY "Allow anonymous inserts to attack_surface_leads" ON attack_surface_leads FOR INSERT WITH CHECK (true);
