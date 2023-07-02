import Layout from "@/components/Layout";
import {useSession} from "next-auth/react"

export default function Home() {
	const {data: session} = useSession()

	if (!session) {
		return
	}

	return <Layout>
		<div className={'text-blue-900 flex justify-between'}>
			<h2>Hello, <b>{session?.user.email}</b></h2>
			<div className={'flex bg-gray-300 gap-1 text-black'}>
				<img className={'m-6 h-6'} src={session?.user?.image} alt={session?.user?.name}/>
				<span className={'py-1 px-2'}>
					{session?.user?.name}
				</span>
			</div>
		</div>
	</Layout>
}
