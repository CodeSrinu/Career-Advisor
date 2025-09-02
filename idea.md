# Career Advisor Plan

-----------------

## **1. Mission**

Create a **zero-cost, Native-friendly career platform** that helps **any learner—from absolute beginner to working professional—discover, validate, and pursue their ideal career path** without ever leaving the browser.

---

## **2. Audience & Entry Flow**

### **Table**

| **Persona** | **Entry Path** |
| --- | --- |
| **Beginner (No Goal)** | **Goal missing** → psychology-based persona quiz → domain & sub-role discovery |
| **Goal-Having Learner** | **Goal already set** → psychology validation → domain mapping → sub-role deep-dive |
| **Working Professional** | **Goal change request** → persona quiz → domain & sub-role discovery |

---

## **3. Global Rules**

- **Language**: 80% English + 20% **{user-selected native language}** (English script with native vocabulary/terms).
- **Zero PDFs** – everything rendered **in-app (pdfs only when necessary)**.
- **Zero backend cost** – local JSON + free APIs.
- **Mobile-first design** – responsive UI that works on all devices.
- **All content in-browser** – no downloads or external applications required.

---

## **4. Feature Stack**

### **4.1 Login & Onboarding**

- **Google OAuth only**.
- **State dropdown** → tailors salary bands & local resources.
- **Goal Status Radio**:
    - **Yes** → **Psychology Validation**
    - **No** → **Persona Quiz**

### **4.2 Goal Validation / Persona Quiz**

### **Table**

| **Purpose** | **Content** |
| --- | --- |
| **Psychology Validation** | 5 questions on intrinsic vs external motivation |
| **Persona Quiz** | 10 childhood + interest questions → skill depth 0–15 |

### **4.3 Domain & Sub-Role Deep-Dive**
────────────────────────────

A.  Digital & Core Tech
Software Engineer – Front / Back / Full-Stack, Mobile & Game Dev, DevOps / SRE / Cloud Architect, **Cyber-Security**: Pen-tester, SOC Analyst, GRC Specialist, **Network**: Network Architect, Wireless Engineer, **Sales & Support**: Tech Sales Engineer, Customer Success, Technical Support L1/L2, **Gig & Remote**: Freelance Developer, Upwork Top-Rated, **Govt**: NIC Engineer, ISRO Scientist, IES (IT), SSC CGL (IT Officer)

B.  Data, AI & Research
Data Scientist / ML Engineer / MLOps, AI Ethicist, Prompt Engineer, AR-VR Developer, **Basic Sciences**: Research Scientist (CSIR labs), University Professor (CS/Stats), **Govt**: ISS Officer, RBI Data Officer, NITI Aayog Fellow

C.  Healthcare & Life Sciences
**Clinical**: MBBS Doctor (Govt & Pvt), Dentist, Nurse, Pharmacist, Physiotherapist, **Allied**: Lab Technician, Radiologist, Nutritionist, **Tech-Medicine**: Medical Informatics, Health-Tech Product Manager, **Govt**: CMS Officer, State Health Dept roles, AIIMS Faculty

D.  Education & Academia (non-tech heavy)
**School**: Primary/Secondary Teacher (State & CBSE), Principal, **Higher Ed**: Professor, Research Scholar, Academic Counselor, **Ed-Tech**: Curriculum Designer, LMS Admin, Instructional Video Creator, **Govt**: Kendriya Vidyalaya PGT/TGT, UGC-NET Lecturer, Education Officer

E.  Business, Management & Support Functions
**Core Biz**: Business Analyst, Project Manager, Operations Lead, **Sales & Marketing**: Digital Marketer, Brand Manager, Inside Sales, Territory Sales, **People**: HR Generalist, Recruiter, L&D Specialist, **Finance**: Financial Analyst, Investment Banker, CA, CFA, **Legal**: Corporate Lawyer, Compliance Officer, Legal-tech Consultant, **Govt**: Civil Services (IAS/IPS/IRS), RBI Grade B, SEBI Grade A

F.  Creative, Media & Performing Arts
**Visual**: Graphic Designer, UI Artist, Illustrator, 3-D Artist, **Performance**: Musician, Dancer, Theatre Actor, Stand-up Comic, **Media**: Journalist, Content Writer, Copywriter, Video Editor, Podcast Host, **Fine Arts**: Painter, Sculptor, Art Director, **Govt**: Doordarshan Producer, AIR Presenter, Cultural Officer (State PSC)

G.  Skilled Trades, Services & Physical
**Trades**: Electrician, Plumber, AC Technician, Auto Mechanic, Welder, **Logistics**: Supply-Chain Manager, Warehouse Supervisor, Fleet Manager, **Hospitality**: Hotel Manager, Chef, Travel Consultant, Tour Guide, **Sports**: Athlete, Coach, Sports Nutritionist, Sports Psychologist, **Construction**: Site Engineer, Quantity Surveyor, Safety Officer, **Gig**: Swiggy/Zomato Delivery Partner, Urban Company Pro, Ola/Uber Fleet Owner, **Govt**: Railway Technician, PWD Junior Engineer, Police Constable, Forest Ranger

H.  Entrepreneurship & Self-Employment
Tech-startup Founder (SaaS, D2C, Marketplace), Non-tech Founder (Cloud kitchen, Boutique, Agri-trading), Franchise Owner (Amul, DTDC, Lenskart), Freelancer (Photography, Fitness Trainer, Legal Consultant)

**Deep-dive page includes**:

- **Native-Language-subtitled 60-sec video**
- **Day-to-day life** timeline
- **Salary bands** (₹/month)
- **3-5 yr career trajectory**
- **Transformation paths**
- Potential of the job role

### **4.4 Skill-Level Test**

- **15 Yes/No + story + resume**
- **Output**: `{level: 0|1|2|3|4, gaps: [...]}`

### **4.5 Prerequisite Mini-Course *(if needed)***

- **Auto-injected** only if skill depth < 3
- **1 in-app page (80% English + 20% native)**
- **≤ 10 min Native-Language video**
- **10 MCQs + 1 micro-task**

### **4.6 Level Map (Dynamic)**

### Number of levels depend on the complexity of the subject that required for the job role and as well as the length of the subject/concept

| **Complexity** | **Levels** | **Content Pack** |
| --- | --- | --- |
| **Beginner (0–4 h)** | 3–4 levels | in-app page (video + quiz + task) |
| **Intermediate (4–8 h)** | 4–5 levels | same |
| **Advanced (8–20 h)** | 5–6 levels | same |

### **4.7 Content Engine (RAG Pipeline)**

- **Retriever**: YouTube Data API + GitHub READMEs + job boards
- **Vector Store**: **local Chroma** (free)
- **Generator**: **Gemini Pro** (free tier)
- **Output**: JSON (PDF-free) → `./levels/{sub-role}/{level}.json`

### **4.8 Gamification**

- **Checkmarks**, progress bars, **leaderboard**, **streak tracker**
- **Unlock next level** on **≥ 85 % quiz + task submission**

### **4.9 Auto-Resume Builder**

- **Input**: GitHub repo, quiz scores, GitHub profile
- **Output**: **ATS-friendly PDF + JSON resume** (download button)

### **4.10 Real Internship Feed**

- **Sources**: LinkedIn, Internshala, AngelList, CutShort and other genuine platforms
- **Filters**: stipend ≥ ₹0, entry/intermediate, remote/on-site
- **Weekly refresh** → JSON feed displayed as cards

### **4.11 Enhanced Features**

#### **4.11.1 User Feedback Loop**
- **Rating system** for content quality and relevance
- **Comment section** for each learning module
- **Report feature** for inaccurate or outdated information

#### **4.11.2 Community Features**
- **Peer discussions** for each domain/sub-role
- **Mentorship matching** with professionals in the field
- **Progress sharing** on social platforms
- **Study groups** for collaborative learning

#### **4.11.3 Offline Capability**
- **PWA support** for offline access to completed content
- **Downloadable modules** for offline study
- **Sync functionality** to resume progress when online

#### **4.11.4 Accessibility Features**
- **Screen reader support** for visually impaired users
- **Keyboard navigation** for users with motor disabilities
- **High contrast mode** for better visibility
- **Text-to-speech** for content consumption

---

## **5. Tech Stack**

- **Front-End**: Next.js 14 + Tailwind CSS + NextAuth.js (Google OAuth)
- **Content Engine**: Python (Gemini SDK) + YouTube Data API
- **Storage**: Local JSON + localStorage (IndexedDB for scalability)
- **Deployment**: Vercel (free tier)
- **Future Scaling**: Node.js for content engine when traffic > 10k users

-----------------

## **6. Flow**

From the moment a learner lands on Career-Advisor, the journey is crystal-clear and language-smart: after a quick Google login, they choose their state and native language mix, then answer a simple radio: "Goal already set?"
If their goal already exists, the app maps it to domains and sub-roles, showing real day-to-day videos, salary bands, and 3-5-year career trajectories before the first line of code is written.
If the goal is missing, a lightweight 10-question persona quiz surfaces matching domains and sub-roles, each with native-language-subtitled videos and market insights.
Once a sub-role is locked, a 15-question skill-level test + open story + optional resume pinpoints the exact starting difficulty, then injects a prerequisite micro-course (in-app page + video) only if needed.
From there, dynamic levels unfold: AI-generated PDF-free lessons, auto-graded quizzes, and hands-on tasks, all locked until ≥ 85 % completion, culminating in an auto-generated ATS resume and real, stipend-bearing internships scraped weekly from LinkedIn, Internshala, and AngelList — all zero-cost, and native-language-ready.

-----------------

## **7. Legal Compliance**

- **User-agents** + rate-limits for web scraping
- **Review TOS** of all data sources before launch
- **Attribution** for all content sources
- **Privacy policy** for user data handling

-----------------

## **8. Hackathon MVP Focus**

For the hackathon, we will build a core MVP that solves the primary problem:
1. **User Authentication** - Google OAuth login
2. **Language Selection** - Native language preference
3. **Goal Discovery/Validation** - Psychology questions and persona quiz
4. **Domain/Sub-role Mapping** - Career path recommendation
5. **Skill Assessment** - Basic skill level test
6. **Learning Path** - Dynamic level system with content delivery
7. **Progress Tracking** - Gamification elements

All other features (community, offline, etc.) will be planned for post-hackathon implementation.