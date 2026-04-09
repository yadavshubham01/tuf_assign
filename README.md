#  Wall Calendar Aesthetic 

![Wall Calendar Aesthetic](./public/Sample1.png)


##  Live Demo


> **URL:** [https://tuf-assign.vercel.app/](https://tuf-assign.vercel.app/)

---

##  Project Structure

```bash
frontend/
├── src/                      
│   │── index.jsx
│   │── app.jsx
│   │── index.css
│   ├── components/
│   │   │   ├── Calendar.jsx
│   │   │   ├── NotePanel.jsx
│   │   │   ├── CalendarHeader.jsx
│   │   │   ├── CalendarHeader.jsx
│   │   │   ├── ImageBanner.jsx
│   │   │
│   ├── utils/                    # Core logic
│   │  └── dateUtils.js
│   ├── hooks/                    # Custom Notes hook
│   │  └── useNotes.js
│
├── public/                       # Static assets & screenshots
│
├── README.md
├── package.json
└── tsconfig.json

```

---

##  Core Features

* **Wall Calendar UI** : Clean, aesthetic layout inspired by real-world wall calendars with image + notes + date grid.
* **Dynamic Image Banner** : Displays contextual images based on the current month with auto theme color extraction.
* **Date Range Selection** :Select start and end dates with visual highlighting and hover preview.
* **Integrated Notes System**: 
    1. Add notes for:
        1. Entire month
        2. Selected date range
        3. Notes are persisted using localStorage.
* **Notes Visualization** : Dates with notes are highlighted on the calendar with visual indicators.
* **Tooltip Preview** : Hover over dates to view note content instantly (desktop).
* **Mobile Friendly Interaction** : Tap on dates to view notes (mobile fallback for tooltip).
* **Real-Time Updates** : Notes reflect instantly without page reload using centralized state management.
* **Dynamic Theming** : UI adapts color based on image (Spotify-like experience).
* **Fully Responsive Design**: 
    1.  Desktop: Split layout (image + notes + calendar)
    2. Mobile: Stacked layout with touch-friendly interactions

---

##  Tech Stack

### Frontend

* **JavaScript**
* **React**

### Styling

* **Tailwind CSS**


##  Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/yadavshubham01/tuf_assign.git
cd financial Dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

App will be available at:
 `http://localhost:5173`


##  Author

**Shubham Yadav**
