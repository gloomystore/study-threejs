import { useLoaderData } from "react-router-dom"
import Content from "../compnents/Content"
import { motion } from 'framer-motion'

export default function Seoul() {
  const data = useLoaderData()
  return (
    <div className='layout-detail'>
      <motion.section 
        className="left"
        initial={{x:'-100%' }}
        animate={{x:0}}
        transition={{ delay: 0.5, duration: 1, type: 'tween'}}
        exit={{x: '-100%'}} // AnimatePresence로 감싸줘야 사용 가능
      >
        <img src="/images/01.jpg" alt="seoul" />
      </motion.section>
      <motion.section 
        className="right"
        initial={{ x: '100%' }}
        animate={{x:0}}
        transition={{ delay: 0.5, duration: 1, type: 'tween'}}
        exit={{x: '100%'}}
      >
        <Content data={data} />
      </motion.section>
    </div>
  )
}
