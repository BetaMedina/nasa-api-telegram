import 'dotenv'
export const NASA_FEED = {
  ENDPOINT_API: `https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=${process.env.NASA_API_KEY}`,
  LAMBDA_URL: process.env.LAMBDA_URL
}
