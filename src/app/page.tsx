import styles from './page.module.css'
import dynamic from 'next/dynamic'
import 'cesium/Build/Cesium/Widgets/widgets.css'

const Globe = dynamic(
  () => import('../components/Globe'),
  { ssr: false }
)

export default function Home() {
  return (
    <main className={styles.main} >
      <Globe></Globe>
    </main>
  )
}
