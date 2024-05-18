"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { createClient } from "~/utils/supabase/client";

export default function Page() {
  const supabase = createClient();
  const router = useRouter();
  const [loaded, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const run = async () => {
      const session = await supabase.auth.getSession();
      setLoading(false);
      if (!!session.error || !!!session.data) {
        router.push("/login");
        return;
      }
      console.log("Logged in", session.data);
    };
    void run();
  }, []);

  return loaded ? (
    <div>
      <button onClick={() => void supabase.auth.signOut()}>Logout</button>
    </div>
  ) : (
    <div>Loading session</div>
  );
}
