/*
  # Update profiles table policies

  1. Changes
    - Drop existing policies if they exist
    - Recreate policies with proper permissions for:
      - Reading any profile
      - Updating own profile
      - Inserting own profile

  2. Security
    - Ensure RLS is enabled
    - Set up proper authentication checks
*/

DO $$ BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can read any profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
END $$;

-- Enable RLS (idempotent operation)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Users can read any profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);