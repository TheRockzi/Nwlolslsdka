/*
  # Add staff management capabilities

  1. Changes
    - Add staff management functions
    - Update admin user with CEO role
    - Add policies for staff management

  2. Security
    - Only staff members can manage other users
    - Maintains existing RLS policies
*/

-- Function to update user role
CREATE OR REPLACE FUNCTION update_user_role(
  target_user_id UUID,
  new_role TEXT,
  new_is_staff BOOLEAN,
  admin_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_is_staff BOOLEAN;
BEGIN
  -- Check if the admin user is staff
  SELECT is_staff INTO admin_is_staff
  FROM profiles
  WHERE id = admin_user_id;

  IF admin_is_staff THEN
    UPDATE profiles
    SET 
      staff_role = new_role,
      is_staff = new_is_staff
    WHERE id = target_user_id;
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$;

-- Set admin as CEO
UPDATE profiles
SET 
  is_staff = true,
  staff_role = 'CEO'
WHERE id = '9bf9515c-3461-4248-824c-22a9aecdd3ac';

-- Add policy for staff to update any profile
CREATE POLICY "Staff can update any profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    (SELECT is_staff FROM profiles WHERE id = auth.uid())
  );