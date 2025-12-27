# Sontya - Vaccination & Health Management System

## Project Overview

Sontya is a comprehensive ecosystem designed to bridge the gap between hospitals and parents regarding child vaccination and health monitoring. It consists of a web portal for hospitals and a mobile application for parents, powered by AI for health queries.

## Tech Stack

* **Hospital Portal (Web):** React.js (Vite), Tailwind CSS, Firebase SDK.

* **Parent App (Mobile):** React Native (Expo), NativeWind, Firebase SDK.

* **Backend & Database:** Google Firebase (Firestore, Authentication, Cloud Functions).

* **AI Integration:** Google Gemini API (for side-effect analysis and medical Q&A).

* **Maps:** Google Maps / Geolocation API (for finding nearby hospitals).

## Architecture

### 1. Database Schema (Firestore)

* **`hospitals`**: Collection for hospital profiles and credentials.

* **`parents`**: Collection for parent profiles.

* **`children`**: Linked to parents, contains `unique_id`, `dob`, `blood_group`.

* **`vaccinations`**: Stored within `children` documents as `vaccinationHistory` array.

* **`appointments`**: Stores booking details, status (pending, confirmed, completed).

### 2. AI Agent Workflow

1. Parent asks a question (e.g., "My child has a fever after Polio drops").

2. App fetches child's recent vaccination history from Firestore.

3. Prompt constructed: *Context: Child took Polio vaccine yesterday. Symptom: Fever. Question: Is this normal?*

4. Gemini API processes the prompt.

5. Response displayed to the parent.

## Phase 1: Hospital Portal (Completed)

*The hospital-facing web dashboard is fully functional.*

### Features Implemented

1. **Authentication**:

   * Hospital Login/Signup using Firebase Auth.

   * Dynamic Location detection using Geolocation API.

2. **Dashboard**:

   * Sidebar navigation.

   * Quick stats view (Total Registered Children).

3. **Child Registration**:

   * Form to input newborn details.

   * **Auto-generate Unique ID** (e.g., SON-X92Z).

   * Validation logic (e.g., weight cannot be negative).

4. **Vaccination Management**:

   * Search child by Unique ID.

   * View standard vaccination checklist (WHO/Indian Schedule).

   * Mark vaccines as "Completed" (updates history in Firestore).

## Phase 2: Parent Mobile App (In Progress)

*The focus is now on building the mobile app for parents.*

### Planned Features

1. **App Setup**: Initialize Expo project with NativeWind (Tailwind for mobile).

2. **Authentication**: Parent Login/Signup.

3. **Link Child Profile**: Enter Unique ID to connect to the child registered by the hospital.

4. **Vaccination Tracker**: Read-only view of the child's status.

5. **AI Health Chatbot**: Gemini integration.

## Development Roadmap

1. [x] **Repo Setup & Architecture**

2. [x] **Hospital Portal Setup** (React + Firebase Config)

3. [x] **Hospital Auth & Dashboard UI**

4. [x] **Child Registration & Medical Records**

5. [ ] **Parent App Initialization** (Next Step)

6. [ ] **Parent Auth & Child Linking**

7. [ ] **AI Integration**