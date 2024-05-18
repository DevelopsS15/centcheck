import { env } from "~/env";

export function GetProductImageURL(fileName: string) {
  return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ProductImages/${fileName}`;
}
