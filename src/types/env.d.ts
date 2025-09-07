// types/env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: string
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: string
    NEXT_PUBLIC_APPWRITE_DATABASE_ID?: string
    NEXT_PUBLIC_APPWRITE_COLLECTION_ID?: string
    NEXT_PUBLIC_APPWRITE_BUCKET_ID?: string
    APPWRITE_SECRET_KEY: string
    APPWRITE_API_KEY: string
    OPENAI_API_KEY: string
  }
}