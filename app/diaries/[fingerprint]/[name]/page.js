import axios from "axios";
import DiaryTemplate from "./template/diary";

export default async function DiaryPage({ params }) {
  const response = await fetch(
    `https://janus-api.vercel.app/api/diary/${params.fingerprint}`,
    { cache: "no-cache" }
  );

  const data = await response.json();
  return (
    <main className="w-full h-screen">
      <DiaryTemplate
        diaries={data.status_code != 200 ? [] : data.data.diaries}
        fingerprint={params.fingerprint}
        name={params.name}
      />
    </main>
  );
}
