# Cron Expression Visualizer & Pattern Generator

A React application aimed at helping developers understand complex cron expressions and generate human-readable recurrence schedules. This tool was built using **React** and **TypeScript**.

## 🚀 Features

### Part 1: Cron Expression Visualizer
* **Input Parsing:** Accepts standard cron strings (e.g., `0 15 10 * * ?`).
* **Field Breakdown:** Instantly breaks down the expression into 6 components:
    * Seconds
    * Minutes
    * Hours
    * Days
    * Month
    * Day of Week
* **Active State Detection:** Highlights specific values as `(active)` while marking wildcards (`*`) as generic.
* **Error Handling:** Resets fields to defaults if the input format is invalid.

### Part 2: Recurrence Pattern Generator
* **Interactive UI:** User-friendly form to create schedules without knowing cron syntax.
* **Supported Patterns:**
    * **Daily:** Runs every day at a specific time.
    * **Weekly:** Runs on selected days of the week (e.g., Mon, Wed, Fri).
    * **Monthly:** Runs on a specific day of the month.
* **Dynamic Description:** Generates a real-time English sentence describing the schedule (e.g., *"Runs every week on Monday and Friday at 08:00"*).

## 🛠️ Tech Stack

* **Frontend Library:** React (v18+)
* **Language:** TypeScript
* **Styling:** CSS3 (Custom responsive design)
* **Tooling:** Create React App / Vite

## 📦 Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone <repository-url>
cd cron-visualizer
