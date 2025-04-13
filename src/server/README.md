
# Disease Insight Server

An API server for disease information and community posts built with Express, TypeScript, and MongoDB.

## API Endpoints

### Disease Information

- `GET /api/disease/{DiseaseName}` - Get detailed information about a specific disease
- `GET /api/disease` - Get a list of all available diseases (names only)
- `POST /api/disease` - Add a new disease (admin only)

### Posts

- `GET /api/post/{postID}` - Get a specific post by ID
- `GET /api/post` - Get all root-level posts
- `POST /api/post/make` - Create a new post, comment, or reply

## Data Models

### Disease Object

```json
{
  "name": "Disease Name",
  "overview": {
    "description": "Description text",
    "causes": ["factor1", "factor2"],
    "risk_factors": ["factor1", "factor2"]
  },
  "symptoms": ["symptom1", "symptom2"],
  "diagnosis": {
    "criteria": "Diagnostic criteria",
    "methods": ["method1", "method2"]
  },
  "treatment": [
    {"Treatment1": "Treatment Description"},
    {"Treatment2": "Treatment Description"}
  ],
  "prevalence": {
    "global": "global estimate",
    "by_region": {
      "Africa": "percentage",
      "Asia": "percentage",
      "Europe": "percentage",
      "North America": "percentage",
      "South America": "percentage",
      "Oceania": "percentage"
    }
  },
  "last_updated": "2025-04-13"
}
```

### Post Object

```json
{
  "PostID": "unique-id",
  "PostType": "Post|Comment|Reply",
  "PostTitle": "Post Title",
  "PostBody": "Post content",
  "PostChildrenIds": ["child-id-1", "child-id-2"],
  "Likes": 5,
  "Dislikes": 1
}
```

## Setup

1. Ensure MongoDB is installed and running
2. Create a `.env` file with `MONGODB_URI=your_connection_string`
3. Run `npm install`
4. Start the server with `npm run start:server`

## Development

- Run in development mode with auto-restart: `npm run dev:server`
