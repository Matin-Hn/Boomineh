# 🎨 Boomineh



---

## 🚀 Features

- Browse, search, and filter paintings
- User authentication and registration
- Add paintings to cart and favorites
- Admin panel for managing paintings and users
- Responsive, modern UI
- RESTful API backend

---

## 📁 Project Structure

```text
Boomineh/
├── backend/      # Django backend (API, models, admin, media)
│   ├── config/   # Django project settings and URLs
│   ├── paintings/ # Paintings app (models, views, serializers)
│   ├── users/    # Users app (models, views, serializers)
│   ├── media/    # Uploaded images
│   └── ...
├── frontend/     # React frontend (Vite, TypeScript, Tailwind)
│   ├── src/      # Source code (components, pages, API, etc.)
│   ├── public/   # Static assets
│   └── ...
├── Dockerfile    # (Optional) Docker setup
└── README.md     # Project documentation
```

---


## ⚡ Getting Started

First, clone the repository:

```bash
git clone https://github.com/Matin-Hn/Boomineh.git
cd Boomineh
```

Choose one of the following setup options:

---

<details>
<summary><strong>🔧 1. Setup via Source Code</strong></summary>

### Backend Setup (Django)

1. **Create and activate a Python virtual environment:**
	```bash
	cd backend
	python3 -m venv venv
	source venv/bin/activate
	```
2. **Install dependencies:**
	```bash
	pip install -r requirements.txt
	```
3. **Apply migrations:**
	```bash
	python manage.py migrate
	```
4. **Create a superuser (for admin panel):**
	```bash
	python manage.py createsuperuser
	```
5. **Run the backend server:**
	```bash
	python manage.py runserver
	```
	The API will be available at [http://localhost:8000/](http://localhost:8000/)

---

### Frontend Setup (React + Vite)

1. **Navigate to the frontend directory:**
	```bash
	cd frontend
	```
2. **Install dependencies:**
	```bash
	npm install
	# or, if you use bun:
	bun install
	```
3. **Start the frontend server:**
	```bash
	npm run dev
	# or
	bun run dev
	```
	The app will be available at [http://localhost:5173/](http://localhost:5173/)

</details>

---

<details>
<summary><strong>🐳 2. Setup via Docker</strong></summary>

1. **Build the Docker image:**
	```bash
	docker build -t boomineh .
	```
2. **Run the container:**
	```bash
	# Replace this with your actual run command
	docker run -d --rm --name boomineh-app -p 8000:8000 \
	  -v $(pwd)/backend/media:/app/media \
	  -v $(pwd)/backend/db.sqlite3:/app/db.sqlite3 boomineh
	```

</details>

---

## 📚 API Endpoints

- The backend exposes a RESTful API for paintings, users, authentication, cart, etc.
- See `backend/paintings/serializers.py`, `backend/paintings/views.py`, and `backend/users/serializers.py` for details.

---

## ⚙️ Environment Variables

- **Backend:** Configure settings in `backend/config/settings.py` as needed.
- **Frontend:** API URLs and other config can be set in `frontend/src/api/` files.

---

## 🚢 Deployment

- Use the provided `Dockerfile` for containerized deployment.
- For production, configure static/media file serving and secure environment variables.

---

## 📄 License

MIT License

---

## 👤 Credits

Developed by Matin-Hn.
