# RepoDx 
RepoDx is a tool designed for developers who need to quickly evaluate the dependency versions, visual graph of commit count, PR velocity and bus factor of a public repository.

### 🔗 Link
https://www.repodx.software/

### Tech Stack

*   **Frontend**: React, Vite, Tailwindcss, Recharts
*   **Backend (Authentication & Data Fetching)**: Node.js, Express, Passport.js, Octokit
*   **Data Analysis API**: FastAPI, Python, Numpy, Pandas
*   **Database**: PostgreSQL

![Dashboard Overview](./Frontend/src/assets/ss1.png)
![](./Frontend/src/assets/ss2.png)

## To Run It Locally

(In order to use this tool on private repositories, open Backend/src/routes/auth.route.js and on line 9, change "public_repo" to "repo")


To run it locally, first clone the repository

```
git clone https://github.com/UserInTheClouds/RepoDx.git
```
- Node Backend

```
cd RepoDx/Backend
npm install
npx prisma generate
npx prisma db push
npm run dev
 ```
 - Python Backend
 ``` 
 cd RepoDx/backend-python
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
- Frontend
``` 
cd RepoDx/Frontend
npm install
npm run dev
```
