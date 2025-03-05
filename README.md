# Book List

This is a Book List application built with Vite, React, TypeScript, SCSS, and JSON Server.

## How to Run the Project

Follow these steps to launch the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/MakksymSly/book-list.git
cd book-list
```
2. Install Dependencies
```bash
npm install
```
3. Create .env file using this command or manualy aslo check env.example
```bash
echo "VITE_API_URL=http://localhost:3001/books" > .env
```
4. Start JSON Server

In one terminal, run JSON Server on port 3001:
```bash
npm run server
```
Keep this terminal running.
5. Start the Vite Development Server

In a new terminal, start the Vite server:

```bash
npm run dev
```
6. Open the App

Open your browser and go to:
```bash
http://localhost:5173
```
Notes

    Ensure db.json exists in the root directory with the books data.
    The app uses VITE_API_URL=http://localhost:3001/books from the .env file.
    Keep both terminals running (JSON Server and Vite).



db.json example
```json

{
  "books": [
    {
      "id": "1",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "category": "Huita",
      "isbn": "0-7432-7356-7",
      "created": "2022-08-02T12:00:00.000Z",
      "modified": "2025-03-05T13:03:12.287Z",
      "isActive": false
    }
]
}
```
