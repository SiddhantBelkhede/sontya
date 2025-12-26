# Sontya - Vaccination & Health Management System

## Project Overview
Sontya is a comprehensive ecosystem designed to bridge the gap between hospitals and parents regarding child vaccination and health monitoring. It consists of a web portal for hospitals and a mobile application for parents, powered by AI for health queries.

## Tech Stack
* **Hospital Portal (Web):** React.js (Vite), Tailwind CSS, Firebase SDK.
* **Parent App (Mobile):** React Native (Expo), NativeWind, Firebase SDK.
* **Backend & Database:** Google Firebase (Firestore, Authentication, Cloud Functions).
* **AI Integration:** Google Gemini API + LangChain (for side-effect analysis and medical Q&A).
* **Maps:** Google Maps API (for finding nearby hospitals).

---

## Architecture

### 1. Database Schema (Firestore)
* **`hospitals`**: Collection for hospital profiles and credentials.
* **`parents`**: Collection for parent profiles.
* **`children`**: Linked to parents, contains `unique_id`, `dob`, `blood_group`.
* **`vaccinations`**: Sub-collection in `children` or root collection linking `child_id` to `vaccine_status`.
* **`appointments`**: Stores booking details, status (pending, confirmed, completed).

### 2. AI Agent Workflow
1.  Parent asks a question (e.g., "My child has a fever after Polio drops").
2.  App fetches child's recent vaccination history from Firestore.
3.  Prompt constructed: *Context: Child took Polio vaccine yesterday. Symptom: Fever. Question: Is this normal?*
4.  Gemini API processes the prompt.
5.  Response displayed to the parent.

---

## Phase 1: Hospital Portal Development Plan
*The initial focus is on building the hospital-facing web dashboard.*

### Features Breakdown
1.  **Authentication**: 
    * Hospital Login/Signup using Firebase Auth.
    * Profile setup (Location, Name, Contact).
2.  **Dashboard**:
    * View upcoming appointments.
    * Quick stats (Vaccines administered today, Pending appointments).
3.  **Child Registration**:
    * Form to input newborn details.
    * **Auto-generate Unique ID** (UUID/ShortID).
    * Generate a QR code for the ID (optional future feature).
4.  **Vaccination Management**:
    * Search child by Unique ID.
    * View vaccination checklist.
    * Mark vaccines as "Completed" (updates history).

---

## Development Roadmap
1.  **Repo Setup & Architecture** (Current)
2.  **Hospital Portal Setup** (React + Firebase Config)
3.  **Hospital Auth & Dashboard UI**
4.  **Child Registration Logic**
5.  **Parent App Initialization**
6.  **AI Integration**