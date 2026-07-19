import { getProperties } from "@/app/actions/properties"
import { HomeClient } from "@/components/home-client"

export default async function Page() {
  const properties = await getProperties()
  return <HomeClient initialProperties={properties} />
}
