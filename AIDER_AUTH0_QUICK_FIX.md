# AIDER INSTRUCTIONS: Quick Auth0 Fix for 401 Error

## IMMEDIATE FIX NEEDED
The 401 Unauthorized error is caused by placeholder Auth0 credentials in .env.local

## FILES TO FIX:
1. `/Users/Apple/syncscript-frontend/.env.local` - Replace placeholder Auth0 values
2. `/Users/Apple/syncscript-frontend/src/app/layout.tsx` - Add error handling for missing Auth0

## QUICK FIX STRATEGY:
1. **Temporary Fix**: Disable Auth0 temporarily to get site working
2. **Proper Fix**: Set up real Auth0 credentials

## AIDER TASKS:

### Task 1: Create temporary .env.local without Auth0
- Remove all AUTH0_* variables temporarily
- Keep other working variables
- This will disable Auth0 and allow site to load

### Task 2: Update layout.tsx to handle missing Auth0 gracefully
- Add try-catch around UserProvider
- Show fallback UI when Auth0 is not configured
- Prevent 401 errors from breaking the site

### Task 3: Create fallback authentication
- Add simple login form without OAuth
- Allow users to access the site while Auth0 is being set up
- Maintain functionality

## EXPECTED RESULT:
- Site loads without 401 errors
- Users can access login/register pages
- Google/GitHub buttons show "Coming Soon" message
- Site remains functional while Auth0 is configured

## FILES TO EDIT:
1. `.env.local` - Remove Auth0 variables
2. `src/app/layout.tsx` - Add error handling
3. `src/app/login/page.tsx` - Add fallback message
4. `src/app/register/page.tsx` - Add fallback message
