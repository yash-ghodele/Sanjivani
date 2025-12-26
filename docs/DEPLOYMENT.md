# SANJIVANI 2.0 - Deployment Guide

Complete deployment instructions for production environments.

---

## 🚀 Deployment Options

| Platform | Best For | Difficulty | Cost |
|----------|----------|------------|------|
| **Vercel + Railway** | Quick demo | ⭐ Easy | Free tier |
| **Netlify + Render** | Portfolio showcase | ⭐ Easy | Free tier |
| **Docker** | Full control | ⭐⭐ Medium | Any VPS |
| **AWS/GCP** | Enterprise | ⭐⭐⭐ Hard | Pay-as-you-go |

---

## Option 1: Vercel (Frontend) + Railway (Backend)

### Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free $5 credit)

### 1. Deploy Backend to Railway

```bash
# In backend/
# Create railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Deploy Steps:**
1. Go to [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Select `Sanjivani-MVP` → Select `backend/` as root
4. Add environment variables:
   - `PYTHON_VERSION=3.11`
   - `PORT=8000`
5. Deploy! Get URL: `https://sanjivani-api.up.railway.app`

### 2. Deploy Frontend to Vercel

```bash
# Update .env in root
VITE_API_URL=https://sanjivani-api.up.railway.app
```

**Deploy Steps:**
1. Go to [vercel.com](https://vercel.com)
2. "New Project" → Import from GitHub
3. Select `Sanjivani-MVP`
4. Root directory: `./` (root)
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add environment variable:
   - `VITE_API_URL=https://sanjivani-api.up.railway.app`
8. Deploy! Get URL: `https://sanjivani.vercel.app`

---

## Option 2: Docker Deployment

### Prerequisites
- Docker & Docker Compose installed
- VPS with 2GB+ RAM

### 1. Build and Run

```bash
# Clone repository
git clone https://github.com/yash-ghodele/Sanjivani-MVP.git
cd Sanjivani-MVP

# Build and start
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### 2. Access Application

- Frontend: `http://your-server-ip`
- Backend API: `http://your-server-ip:8000`
- API Docs: `http://your-server-ip:8000/api/docs`

### 3. Update Environment Variables

```bash
# Edit docker-compose.yml
services:
  backend:
    environment:
      - API_URL=http://your-domain.com:8000
  
  frontend:
    environment:
      - VITE_API_URL=http://your-domain.com:8000
```

---

## Option 3: Manual VPS Deployment

### Prerequisites
- Ubuntu 22.04 LTS server
- Domain name (optional)
- SSH access

### 1. Server Setup

```bash
# SSH into server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y python3.11 python3.11-venv nodejs npm nginx
```

### 2. Deploy Backend

```bash
# Clone and setup
git clone https://github.com/yash-ghodele/Sanjivani-MVP.git
cd Sanjivani-MVP/backend

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install gunicorn for production
pip install gunicorn

# Run with gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### 3. Setup systemd Service

```bash
# Create service file
sudo nano /etc/systemd/system/sanjivani-api.service
```

```ini
[Unit]
Description=SANJIVANI API
After=network.target

[Service]
User=your-user
WorkingDirectory=/home/your-user/Sanjivani-MVP/backend
Environment="PATH=/home/your-user/Sanjivani-MVP/backend/venv/bin"
ExecStart=/home/your-user/Sanjivani-MVP/backend/venv/bin/gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start
sudo systemctl enable sanjivani-api
sudo systemctl start sanjivani-api
sudo systemctl status sanjivani-api
```

### 4. Deploy Frontend

```bash
# Build frontend
cd ../
npm install
npm run build

# Copy to nginx
sudo cp -r dist/ /var/www/sanjivani
```

### 5. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/sanjivani
```

```nginx
server {
    listen 80;
    server_name your-domain.com;  # or your-server-ip

    # Frontend
    location / {
        root /var/www/sanjivani;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/sanjivani /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Environment Variables

### Backend (.env in backend/)

```bash
# API Configuration
PORT=8000
HOST=0.0.0.0

# Firebase (optional - for persistence)
FIREBASE_CREDENTIALS_PATH=serviceAccountKey.json

# Model Configuration
MODEL_PATH=models/plant_disease_v2.h5
```

### Frontend (.env in root)

```bash
# API URL
VITE_API_URL=http://localhost:8000  # Dev
VITE_API_URL=https://api.sanjivani.com  # Production
```

---

## Firebase Setup (Optional)

### 1. Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create new project: "SANJIVANI"
3. Enable Firestore Database

### 2. Get Service Account Key

1. Project Settings → Service Accounts
2. Generate new private key
3. Download JSON file
4. Rename to `serviceAccountKey.json`
5. Place in `backend/`

### 3. Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /scans/{scanId} {
      allow read, write: if true;  // Public for demo
      // For production, add authentication
    }
  }
}
```

---

## SSL/HTTPS Setup (Production)

### Using Certbot (Free SSL)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## Performance Optimization

### 1. Enable Gzip (Nginx)

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### 2. Add Caching Headers

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Backend Workers

```bash
# Adjust gunicorn workers based on CPU
workers = (2 * CPU_cores) + 1
```

---

## Monitoring & Logging

### View Backend Logs

```bash
# systemd service
sudo journalctl -u sanjivani-api -f

# Docker
docker-compose logs -f backend
```

### View Nginx Logs

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 8000
sudo lsof -i :8000

# Kill process
sudo kill -9 <PID>
```

### CORS Errors

Update `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Model Not Loading

```bash
# Check model path
ls -l backend/models/plant_disease_v2.h5

# Check permissions
chmod 644 backend/models/plant_disease_v2.h5
```

---

## Health Checks

### Backend API

```bash
curl http://your-domain.com/api/v2/health
```

Expected response:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "knowledge_base_loaded": true,
  "knowledge_version": "2.0.0"
}
```

### Frontend PWA

1. Open DevTools → Application → Service Workers
2. Should show "activated and running"
3. Test offline mode

---

## Scaling Considerations

### Horizontal Scaling

- Use load balancer (nginx, HAProxy)
- Multiple backend instances
- Shared model cache (Redis)

### Database Scaling

- Firebase auto-scales
- For high traffic: Consider MongoDB/PostgreSQL

### CDN

- Cloudflare for frontend assets
- Reduces server load
- Improves global latency

---

## Cost Estimates

| Platform | Traffic | Cost/Month |
|----------|---------|------------|
| Vercel + Railway | <10k requests | Free |
| VPS (Digital Ocean) | Unlimited | $6-12 |
| AWS (t3.small) | Variable | $15-30 |

---

## Production Checklist

- [ ] Environment variables configured
- [ ] Firebase credentials added (if using)
- [ ] SSL certificate installed
- [ ] CORS origins updated
- [ ] Model trained and uploaded
- [ ] Service worker caching configured
- [ ] Error monitoring setup (Sentry optional)
- [ ] Backup strategy defined
- [ ] Load testing performed

---

**Deployment support:** Open an issue on GitHub if you encounter problems.

---

*Ready for production!* 🚀
