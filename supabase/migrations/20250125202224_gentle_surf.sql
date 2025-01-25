/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text)
      - `created_at` (timestamp)
      - `role` (text)
      - `web_challenges_completed` (integer)
      - `programming_challenges_completed` (integer)
      - `crypto_challenges_completed` (integer)
      - `is_staff` (boolean)
      - `staff_role` (text)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  role text DEFAULT 'Beginner',
  web_challenges_completed integer DEFAULT 0,
  programming_challenges_completed integer DEFAULT 0,
  crypto_challenges_completed integer DEFAULT 0,
  is_staff boolean DEFAULT false,
  staff_role text
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

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