# Testing Guide

## Automated Backend Test

Folder location: `server/`

Command:

```bash
npm test
```

What it checks:

- Express app loads
- Health route responds

## Automated Frontend Test

Folder location: `client/`

Commands:

```bash
npm test
npm run build
```

What it checks:

- Vitest is configured
- React production build works

## Manual Testing Checklist

1. Register as seeker.
2. Login as seeker.
3. Create a request.
4. View request in My Requests.
5. Register as volunteer.
6. Login as volunteer.
7. Open Nearby Tasks.
8. Filter by category, status, distance, and search.
9. Accept a pending task.
10. Open Accepted Tasks.
11. Upload proof image and completion note.
12. Complete task.
13. Confirm volunteer help score increases by 10.
14. Confirm badge changes after completed task thresholds.
15. Register/login as admin.
16. View analytics cards and charts.
17. Ban a user.
18. Delete a task.
19. Submit survey.
20. View survey analytics as admin.
21. Register NGO.
22. Switch language to Hindi.
23. Switch language to Gujarati.
24. Turn on large text mode.
25. Turn on high contrast mode.
26. Navigate using keyboard Tab and Enter.

## Bug Testing Checklist

1. Try duplicate email registration.
2. Try wrong password login.
3. Try seeker opening admin page.
4. Try volunteer creating seeker request.
5. Try completing task without proof.
6. Try uploading non-image file.
7. Try nearby task lookup with denied location permission.
8. Try empty required fields.
9. Try banned user login.
10. Try expired reset password token.

## User Acceptance Testing

Acceptance criteria:

- A beginner user can create an account without help.
- A seeker can create a government-service request in less than 2 minutes.
- A volunteer can find nearby pending tasks on a map.
- A volunteer can complete a task with proof and note.
- Admin can see total users, volunteers, seekers, tasks, and completed tasks.
- Interface remains usable on mobile.
- Interface supports English, Hindi, and Gujarati.
- Large text and high contrast modes visibly change the UI.
