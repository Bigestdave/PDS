#!/usr/bin/env python3
"""
Bitget AI Trading Desk — Turnkey Launcher
Starts both the FastAPI Backend and the React Frontend simultaneously.
"""

import os
import sys
import subprocess
import time
import webbrowser
import signal

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(CURRENT_DIR, "backend")
FRONTEND_DIR = os.path.join(CURRENT_DIR, "frontend")

def print_banner():
    print("=" * 75)
    print("      BITGET AI TRADING DESK — TURNKEY SYSTEM LAUNCHER")
    print("  Track 3: Human-in-the-Loop Microstructure Intelligence Workstation")
    print("=" * 75)
    print(" [1] Backend:  FastAPI + Bitget Connector on http://127.0.0.1:8000")
    print(" [2] Frontend: React 19 + Tailwind CSS on     http://127.0.0.1:5174")
    print("=" * 75)

def main():
    print_banner()
    processes = []

    try:
        # 1. Start Backend
        print("[*] Starting FastAPI Backend on port 8000...")
        backend_cmd = [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"]
        backend_proc = subprocess.Popen(
            backend_cmd,
            cwd=BACKEND_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )
        processes.append(("Backend", backend_proc))
        print("    [+] Backend process started (PID: {})".format(backend_proc.pid))

        # 2. Start Frontend
        print("[*] Starting React / Vite Frontend on port 5174...")
        npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
        frontend_cmd = [npm_cmd, "run", "dev", "--", "--port", "5174"]
        frontend_proc = subprocess.Popen(
            frontend_cmd,
            cwd=FRONTEND_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )
        processes.append(("Frontend", frontend_proc))
        print("    [+] Frontend process started (PID: {})".format(frontend_proc.pid))

        print("[*] Waiting 3 seconds for services to initialize...")
        time.sleep(3)

        print("\n" + "=" * 75)
        print(" [SUCCESS] BITGET AI TRADING DESK IS LIVE!")
        print(" -> Access Desk Workstation: http://127.0.0.1:5174/")
        print(" -> Access API Swagger Docs: http://127.0.0.1:8000/docs")
        print("=" * 75)
        print("[!] Press Ctrl+C at any time to gracefully terminate both services.\n")

        # Open browser automatically
        try:
            webbrowser.open("http://127.0.0.1:5174/")
        except Exception:
            pass

        # Keep alive
        while True:
            time.sleep(1)
            # Check if any process terminated unexpectedly
            for name, proc in processes:
                if proc.poll() is not None:
                    print(f"[!] Warning: {name} process exited with code {proc.returncode}")
                    sys.exit(1)

    except KeyboardInterrupt:
        print("\n[*] Shutting down services gracefully...")
    finally:
        for name, proc in processes:
            try:
                print(f"[*] Terminating {name} (PID: {proc.pid})...")
                proc.terminate()
                proc.wait(timeout=3)
            except Exception:
                try:
                    proc.kill()
                except Exception:
                    pass
        print("[+] All services stopped. Goodbye!")

if __name__ == "__main__":
    main()
