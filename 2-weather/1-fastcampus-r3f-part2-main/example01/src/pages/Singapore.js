import { useLoaderData } from "react-router-dom"
import Content from "../compnents/Content"

export default function Singapore() {
  const data = useLoaderData()
  return (
    <div className='layout-detail'>
      <section className="left">
        <img src="/images/01.jpg" alt="Singapore" />
      </section>
      <section className="right">
        <Content data={data} />
      </section>
    </div>
  )
}
