/*
  # Update profiles table policies

  1. Changes
    - Safely recreate policies by first dropping existing ones
    - Ensure RLS is enabled
    - Add policies for:
      - Reading any profile (authenticated users)
      - Updating own profile (authenticated users)
      - Inserting own profile (authenticated users)

  2. Security
    - Maintains row level security
    - Ensures proper access control for profiles
*/

DO $$ 
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can read any profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
END $$;

-- Enable RLS (idempotent operation)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
    -- Only create policies if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can read any profile'
    ) THEN
        CREATE POLICY "Users can read any profile"
          ON profiles
          FOR SELECT
          TO authenticated
          USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can update their own profile'
    ) THEN
        CREATE POLICY "Users can update their own profile"
          ON profiles
          FOR UPDATE
          TO authenticated
          USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can insert their own profile'
    ) THEN
        CREATE POLICY "Users can insert their own profile"
          ON profiles
          FOR INSERT
          TO authenticated
          WITH CHECK (auth.uid() = id);
    END IF;
END $$;