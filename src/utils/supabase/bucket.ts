import { env } from "~/env";

export function GetProductImage(fileName: string) {
  return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${fileName}`;
}
