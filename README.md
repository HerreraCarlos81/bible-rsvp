# Bíblia RSVP - Final Production-Ready Files

## Deploy Instructions (AWS S3 + CloudFront)

1. Upload all files in this folder to your S3 bucket.
2. Create CloudFront distribution pointing to the S3 origin (with OAC).
3. (Optional) Add your Google AdSense code in the ad-container section of index.html.
4. For production: Replace the bible-api.com calls with static JSON files hosted on the same S3/CloudFront for unlimited scalability.

## Key Features Added

- **PWA Support**: Installable as app (manifest + service worker). Works offline for the shell.
- **Verse Navigation**: "Previous Verse" / "Next Verse" buttons + automatic verse display in RSVP mode. Current verse is highlighted.
- **Reading History & Streaks**: Automatically saves every chapter you load. Shows last 5 reads + calculates consecutive day streak (🔥).
- **Ad Container**: Bottom advertising section visible only when NOT in active RSVP reading mode. Ready for Google AdSense.
- **Enhanced RSVP**: Better verse tracking, smoother controls, keyboard arrows for verse navigation.

## Scalability of Bible API (Important Decision)

**Current bible-api.com limits** (from official site):
- **15 requests every 30 seconds** per IP address.
- Explicit warning: "Do not use this API to download an entire bible".
- It's a small personal/free service (Ruby/Sinatra on limited infrastructure).

**For your use case**:
- Fine for personal / low-traffic MVP (one chapter load per user session is ~1 request).
- **Risky for production with ads/revenue**: If you get 100+ concurrent users or people rapidly browsing chapters, many will hit rate limits. The service can slow down or block requests.
- No SLA, no guaranteed uptime, no easy way to scale.

**Recommendation**: 
**Yes, migrate to static files on S3 + CloudFront** for the final production version.

**Why**:
- Bible text is tiny (~4-8 MB total for full KJV or similar).
- Infinite scalability, global edge caching, near-zero cost.
- Works perfectly offline after first load.
- No rate limits ever.
- You control the data (use public domain KJV + licensed PT version if needed).

I can provide a Python script (boto3) to download open Bible JSONs and upload structured files to S3 in one command.

For now, the API version lets you launch immediately and test with real users.

## Next Steps (Python Backend)

If you want user accounts, saved plans, or analytics:
- Add AWS Lambda (Python) + API Gateway + DynamoDB.
- I can generate the full serverless backend code.

Thank you for building this meaningful project! 

— Grok
