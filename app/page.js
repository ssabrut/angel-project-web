import FormName from "./component/form-name.js";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center align-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <FormName />
        </div>
      </div>
    </main>
  )
}
