# Lister — Simple and Efficient List & Device Manager

![Lister Logo](./assets/icon.png)  
_A minimalist mobile app for managing lists and their devices, with quick adding and data export features._

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Installation & Running](#installation--running)

---

## Project Overview

Lister is a lightweight React Native (Expo) mobile app designed to help you create and manage lists and the devices assigned to them. With a clean and intuitive interface, users can easily create new lists, add devices manually or by scanning QR codes, delete items, and export lists as plain text summaries.

---

## Features

- **Create and manage multiple lists**
- **Add devices to lists manually or via QR code scanning**
- **Delete lists and devices**
- **Export lists as plain text for easy sharing or copying**
- **User-friendly UI with floating action buttons (scan, export, close)**
- **Local storage with SQLite for fast and offline access**
- **Modern navigation using Expo Router with modals and stack navigation**

---

## Technologies

- **React Native** — Cross-platform mobile development framework
- **Expo & Expo Router** — Tools for fast development and intuitive navigation
- **Expo SQLite** — Local device database for persistent storage
- **React Native SwipeListView** — Swipeable list items with delete actions
- **TypeScript** — Type safety and improved developer experience
- **Ionicons** — Vector icon library for consistent UI elements

---

## Architecture

- **RootLayout.tsx** — Main layout with navigation stack and global header button logic
- **Screens:**
  - `index` — Overview of all lists
  - `list/[listId]` — Detail view showing devices in a selected list
  - `createListScreen` — Modal for creating a new list
  - `cameraScreen` — QR code scanner for adding devices
  - `exportScreen` — Modal for exporting list data
- **Components:**
  - `HeaderButton` — Consistent header buttons (back, add, close)
  - `RoundButton` — Circular action buttons (scan, export, close)
  - `ListItem`, `DeviceItem` — Individual list and device components
  - `EmptyList`, `ListHiddenItem` — UI for empty states and swipe-to-delete actions

---

## Installation & Running

1. **Clone the repository**

   ```bash
   git clone https://github.com/superstan777/lister
   cd lister
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the app**

   ```bash
   npx expo start
   ```

4. **Run the app on your device or simulator**
# lister
