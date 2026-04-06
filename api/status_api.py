from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psutil
import platform
import time
import os

app = FastAPI()

# Anti-abuse: CORS restriction
# Add your production domain to this list
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://lenvx.dev", "http://localhost:3000", "http://192.168.88.2:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Optional: Basic API Key check
API_KEY = os.getenv("STATUS_API_KEY", "howmuchsigma")

def get_size(bytes, suffix="B"):
    # Convert bytes to other units (not strictly needed since frontend handles it, but good for local debugging)
    factor = 1024
    for unit in ["", "K", "M", "G", "T", "P"]:
        if bytes < factor:
            return f"{bytes:.2f}{unit}{suffix}"
        bytes /= factor

@app.get("/api/status")
async def get_status(x_api_key: str = Header(None)):
    # Simple anti-abuse: Check for API key if configured
    if os.getenv("REQUIRE_API_KEY") == "true" and x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")

    # Host Info
    uptime = time.time() - psutil.boot_time()
    
    os_name = f"{platform.system()} {platform.release()}"
    if platform.system() == "Linux":
        try:
            os_info = platform.freedesktop_os_release()
            os_name = os_info.get("PRETTY_NAME", os_name)
        except Exception:
            pass

    # Memory Info
    mem = psutil.virtual_memory()
    
    # Storage Info (assuming root partition / or C:\)
    # On Windows, you might want to specify 'C:\\'
    path = "/" if platform.system() != "Windows" else "C:\\"
    usage = psutil.disk_usage(path)
    
    # Network Info
    net_io = psutil.net_io_counters()
    
    # CPU Info (optional, but we include it in API for completeness)
    # psutil.cpu_percent(interval=1) might block for 1s, better to use non-blocking
    cpu_usage = psutil.cpu_percent()

    return {
        "host": {
            "os": os_name,
            "hostname": platform.node(),
            "uptime": int(uptime)
        },
        "memory": {
            "total": mem.total,
            "available": mem.available
        },
        "storage": {
            "OS": {
                "total": usage.total,
                "available": usage.free
            }
        },
        "network": {
            "rx": net_io.bytes_recv,
            "tx": net_io.bytes_sent,
            "interface": "Auto-detected"
        },
        "cpu": {
            "model": platform.processor(),
            "cores": psutil.cpu_count(logical=True),
            "utilisation": cpu_usage / 100
        }
    }

if __name__ == "__main__":
    import uvicorn
    # Make sure to provide the actual paths to your SSL certificate and key
    # You can get these via Certbot (Let's Encrypt)
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8000,
        ssl_keyfile="/etc/letsencrypt/live/srv.leafmc.cc/privkey.pem",
        ssl_certfile="/etc/letsencrypt/live/srv.leafmc.cc/fullchain.pem"
    )
