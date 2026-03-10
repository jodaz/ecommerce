import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fvknqjhganrfpedkspvg.supabase.co';
const supabaseKey = 'sb_publishable_whpITxiMtVAakZzqUkodDQ_7qoJYO_K';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@jodaz.xyz',
    password: 'password123',
    options: {
      data: {
        full_name: 'Admin Demo',
      }
    }
  });
  console.log("Signup Result:");
  console.dir({ data, error }, { depth: null });
}

main().catch(console.error);
