-- Remove the automatic profile creation trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function as well since it won't be needed
DROP FUNCTION IF EXISTS public.handle_new_user();