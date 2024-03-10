import { useLoaderData } from "react-router-dom"
import Content from "../compnents/Content"

export default function Losangeles() {
  const data = useLoaderData()
  return (
    <div className='layout-detail'>
      <section className="left">
        <img src="/images/05.jpg" alt="Losangeles" />
      </section>
      <section className="right">
        <Content data={data} />
      </section>
    </div>
  )
}
