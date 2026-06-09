# Future Scope Architecture

No external AI API is required in the current project. The backend exposes placeholder endpoints under `/api/ai`.

## AI Scheme Recommendation

Future input:

- User age
- Income group
- Disability status
- Widow status
- Student status
- Location

Future output:

- Suggested government schemes
- Required documents
- Nearest office
- Volunteer preparation checklist

Current placeholder:

`GET /api/ai/future-modules`

## AI Task Categorization

Future input:

- Request title
- Request description

Future output:

- Predicted category
- Confidence score
- Suggested form checklist

Current placeholder:

`POST /api/ai/task-categorization`

## WhatsApp Bot Integration

Future architecture:

1. WhatsApp user sends request.
2. Bot asks category, address, phone, and consent.
3. Backend creates task.
4. Nearby volunteers receive notification.
5. Volunteer accepts task.

Current placeholder:

`POST /api/ai/whatsapp-bot`

## Voice Request Support

Future architecture:

1. User records voice request.
2. Speech-to-text converts to text.
3. AI categorizes request.
4. Backend creates task.
5. Volunteer sees request in nearby feed.

Current placeholder:

`POST /api/ai/voice-request`
