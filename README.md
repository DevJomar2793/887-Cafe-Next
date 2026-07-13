# 887 Cafe

887 Cafe is a full-stack pickup-ordering application with a Next.js storefront and a FastAPI administration API.

## Structure

- `frontend/app`: route-level composition for the storefront, ordering, and dashboard screens.
- `frontend/components`: reusable presentation grouped by feature, including `order` and `dashboard`.
- `frontend/lib/api`: typed frontend API client modules.
- `backend/app/api`: HTTP endpoints and dependency wiring.
- `backend/app/services`: testable business operations that receive database sessions explicitly.
- `backend/app/schemas`: domain-specific request and response models.
- `backend/tests`: API contract and service regression tests.

## Run locally

Start the API:

```bash
cd backend
python3 -m pip install -r requirements.txt
uvicorn main:app --reload
```

Start the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend uses `http://localhost:8000` by default. Set `NEXT_PUBLIC_API_BASE_URL` to use another API origin. Backend configuration is read from `DATABASE_URL`, `ALLOWED_ORIGINS`, and `PAYMONGO_SECRET_KEY`.

## Validate changes

```bash
cd frontend
npm run lint
npx tsc --noEmit
npm run build
```

```bash
cd backend
python3 -m unittest discover -s tests -v
python3 -m compileall -q .
```
