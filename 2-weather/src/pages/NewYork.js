import { useLoaderData } from "react-router-dom"
import Content from "../compnents/Content"

export default function NewYork() {
  const data = useLoaderData()
  return (
    <div className='layout-detail'>
      <section className="left">
        <img src="/images/02.jpg" alt="new york" />
      </section>
      <section className="right">
        <Content data={data} />
      </section>
    </div>
  )
}
