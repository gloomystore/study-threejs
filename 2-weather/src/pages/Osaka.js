import { useLoaderData } from "react-router-dom"
import Content from "../compnents/Content"

export default function Osaka() {
  const data = useLoaderData()
  return (
    <div className='layout-detail'>
      <section className="left">
        <img src="/images/04.jpg" alt="Osaka" />
      </section>
      <section className="right">
        <Content data={data} />
      </section>
    </div>
  )
}
