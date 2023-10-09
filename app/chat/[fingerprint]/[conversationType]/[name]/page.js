import HomeArea from "./component/home";



export default function Page({params}) {
    return (
        <main className="flex flex-col w-full h-screen">
            <HomeArea name={params.name} conversationType={params.conversationType} fingerprint={params.fingerprint} />
        </main>
    )
}