

# Add Unique Email Constraint on webinar_registrations

## Overview
Add a database-level unique constraint on the `email` column to prevent duplicate registrations, and update the frontend to handle the duplicate error gracefully.

## Changes

### 1. Database Migration
Add a unique constraint on `webinar_registrations.email`:
```sql
ALTER TABLE public.webinar_registrations
ADD CONSTRAINT webinar_registrations_email_unique UNIQUE (email);
```

### 2. Update RegistrationForm.tsx
In the `handleSubmit` error handling, detect the unique violation error (Postgres code `23505`) and display a user-friendly message: "Cette adresse email est déjà inscrite."

