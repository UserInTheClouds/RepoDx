# RepoDx 
RepoDx is a tool designed for developers who need to quickly evaluate the dependency versions, visual graph of commit count, PR velocity and bus factor of a public repository.

### 🔗 Link
https://www.repodx.software/

### Tech Stack

*   **Frontend**: React, Tailwindcss
*   **Backend (Authentication & Data Fetching)**: Node.js, Express, Passport.js
*   **Data Analysis API**: FastAPI, Python, Numpy, Pandas
*   **Database**: PostgreSQL

![Dashboard Overview](./Frontend/src/assets/ss1.png)
![](./Frontend/src/assets/ss2.png)

## To Run It Locally

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
