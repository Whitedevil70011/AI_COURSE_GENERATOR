# AI Course Generator

An AI-powered course generation platform. Give it a topic, and it builds out a full course structure — modules, lessons, and rich lesson content (headings, paragraphs, code blocks, quizzes, and videos) — automatically.

Built as a single full-stack project with a **React** frontend and a **Node/Express + MongoDB** backend.

---

## ✨ Features

- AI-generated course layout (title, description, category, difficulty, modules)
- Course thumbnail upload
- Lesson content generation, one lesson at a time or for the whole course sequentially
- Lesson content blocks: headings, paragraphs, code, MCQ quizzes, embedded video
- YouTube video enrichment per lesson
- Mark lessons as complete, track progress
- PDF export and audio playback for lessons
- Ask-AI sidebar for in-lesson help
- Auth0-based user profiles

---

## 🧱 Tech Stack

| Layer      | Tech                          |
|------------|--------------------------------|
| Frontend   | React, React Router, Tailwind CSS, Lucide Icons |
| Backend    | Node.js, Express                |
| Database   | MongoDB (Mongoose)              |
| Auth       | Auth0                           |
| AI         | Custom AI service layer (course + lesson layout generation) |
| Storage    | Local disk uploads via Multer   |

---

## 📁 Project Structure

```
/backend
  /controllers
    courseController.js     # course CRUD, thumbnail upload, generateLessonsForCourse
    lessonController.js     # single lesson fetch, generate, complete, video enrich
    userController.js       # Auth0 profile
  /models
    Course.js
    Module.js
    Lesson.js
  /routes
    courseRoutes.js
    lessonRoutes.js
  /services
    aiService.js             # generates course layout
    aiservice1.js             # generates lesson layout
    youtubeService.js
    auth0Service.js
  /uploads                    # course thumbnails (auto-created)

/frontend
  /src
    /components
      CourseCard.jsx
      LessonRenderer.jsx
      /Blocks
        HeadingBlock.jsx
        ParagraphBlock.jsx
        CodeBlock.jsx
        VideoBlock.jsx
        MCQBlock.jsx
        LessonAudioPlayer.jsx
      LessonPDFExporter.jsx
      Askaisidebar.jsx
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Whitedevil70011/AI_COURSE_GENERATOR.git
cd <your-repo-folder>
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
YOUTUBE_API_KEY=your_youtube_api_key
AI_API_KEY=your_ai_provider_key
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

The app should now be running at `http://localhost:5173` (frontend) with the API on `http://localhost:5000` (backend).

---

## 🧠 Course Generation Flow

Course creation happens in **three stages**:

### Step 1 — Course Details
The user submits a topic, category, and difficulty. The AI generates the course's core metadata: title, description, category, topic, difficulty, and duration.

```
POST /api/courses/generate
```

### Step 2 — Generate Modules
Based on the course details, the AI breaks the course into modules (chapters), each with a title, description, duration, and a list of lesson titles. Modules and lesson placeholders are saved to the database.

*(Handled as part of the same generation call above — modules and lesson stubs are created together with the course.)*

### Step 3 — Generate Course Content
Once modules and lesson stubs exist, lesson content is generated:

- **One lesson at a time** — triggered from the lesson page ("Generate Lesson Content" button):
  ```
  POST /api/lessons/:lessonId/generate
  ```
- **All lessons in the course, one by one** — triggered from the lesson page ("Generate All Course Lessons" button). This walks through every module and every lesson sequentially, skipping any lesson that already has content, so nothing is regenerated or overwritten twice:
  ```
  POST /api/courses/:courseId/generate-lessons
  ```

---

## 🔑 Key Endpoints

| Method | Endpoint                              | Description                          |
|--------|----------------------------------------|---------------------------------------|
| POST   | `/api/courses/generate`                | Generate course + modules + lesson stubs |
| GET    | `/api/courses/:courseId`               | Get course with modules & lessons     |
| GET    | `/api/courses/user/:userId`            | Get all courses by a user             |
| PUT    | `/api/courses/:courseId`               | Update course details                 |
| DELETE | `/api/courses/:courseId`               | Delete a course                       |
| POST   | `/api/courses/:courseId/thumbnail`     | Upload course thumbnail               |
| POST   | `/api/courses/:courseId/generate-lessons` | Generate all lessons in a course, one by one |
| GET    | `/api/lessons/:lessonId`               | Get a single lesson                   |
| POST   | `/api/lessons/:lessonId/generate`      | Generate content for a single lesson  |
| POST   | `/api/lessons/:lessonId/enrich-video`  | Attach a matching YouTube video       |
| POST   | `/api/lessons/:lessonId/complete`      | Mark a lesson complete                |
| GET    | `/api/users/profile`                   | Get authenticated user's profile      |

---

## 📝 Notes

- Lesson content is only generated **once** per lesson — regenerating the whole course skips lessons that already have content, so nothing gets silently overwritten.
- Thumbnails are stored locally under `/backend/uploads` and served as static files — swap in S3/Cloudinary for production.
- Make sure `VITE_API_BASE_URL` in the frontend `.env` matches wherever your backend is actually running.

---

## 🛠️ Scripts

**Backend**
```bash
npm run dev      # start with nodemon
npm start        # start normally
```

**Frontend**
```bash
npm run dev      # start Vite dev server
npm run build    # production build
```
