#!/usr/bin/env bash
# Optional: activate a virtual environment
# source .venv/bin/activate
# Ensure dependencies are installed (uncomment if needed)
# pip install -r $(dirname "$0")/../requirements.txt

uvicorn app.main:app --reload --port 8000
