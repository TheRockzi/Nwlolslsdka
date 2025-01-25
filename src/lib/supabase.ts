import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Ranks {
  web: string;
  programming: string;
  crypto: string;
}

export const getRankFromChallenges = (
  webChallenges: number = 0,
  programmingChallenges: number = 0,
  cryptoChallenges: number = 0
): Ranks => {
  const ranks: Ranks = {
    web: 'Unranked',
    programming: 'Unranked',
    crypto: 'Unranked'
  };

  // Web Pentesting ranks
  if (webChallenges >= 75) ranks.web = 'Vendetta';
  else if (webChallenges >= 45) ranks.web = 'Guru';
  else if (webChallenges >= 30) ranks.web = 'Elite Hacker';
  else if (webChallenges >= 10) ranks.web = 'Pro Hacker';
  else if (webChallenges >= 5) ranks.web = 'Hacker';

  // Programming ranks
  if (programmingChallenges >= 70) ranks.programming = 'Lovelace';
  else if (programmingChallenges >= 50) ranks.programming = 'God Scripter';
  else if (programmingChallenges >= 35) ranks.programming = 'Senior Scripter';
  else if (programmingChallenges >= 25) ranks.programming = 'Elite Scripter';
  else if (programmingChallenges >= 15) ranks.programming = 'Pro Scripter';
  else if (programmingChallenges >= 10) ranks.programming = 'Scripter';
  else if (programmingChallenges >= 5) ranks.programming = 'Skiddie';

  // Cryptography ranks
  if (cryptoChallenges >= 65) ranks.crypto = 'God Cryptographer';
  else if (cryptoChallenges >= 50) ranks.crypto = 'Crazy Cryptographer';
  else if (cryptoChallenges >= 35) ranks.crypto = 'Elite Cryptographer';
  else if (cryptoChallenges >= 25) ranks.crypto = 'Pro Cryptographer';
  else if (cryptoChallenges >= 10) ranks.crypto = 'Cryptographer';
  else if (cryptoChallenges >= 5) ranks.crypto = 'Noob Cryptographer';

  return ranks;
};