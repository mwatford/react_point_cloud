import { PointCloudStylesStore } from "@/store/PointCloudStylesStore"
import { FC } from "react"

const MIN_OPACITY = 0
const MAX_OPACITY = 1
const MIN_POINT_SIZE = 1
const MAX_POINT_SIZE = 3

const PointCloudControlls: FC<{ store: PointCloudStylesStore }>  = ({ store }) => {
    return (<div style={{ top: 0, left: 0, position: 'fixed', zIndex: 10 }}>
        {store.styles.map((el, index) =>
            <div key={el.color + index}>
                <div>{JSON.stringify(el)}</div>
                <button
                    onClick={e => {
                        store.editStyle(index, { visible: !store.styles.at(index)?.visible })
                    }}
                >{el.visible ? 'hide' : 'show'}</button>
                <input
                    type="color"
                    value={el.color}
                    onChange={(e) => {
                        store.editStyle(index, { color: e.target.value })
                    }}
                />
                <input
                    type="range"
                    min={MIN_OPACITY}
                    max={MAX_OPACITY}
                    step={0.05}
                    value={el.opacity}
                    onChange={(e) => {
                        store.editStyle(index, { opacity: parseFloat(e.target.value) })
                    }}
                />
                <input
                    type="range"
                    min={MIN_POINT_SIZE}
                    max={MAX_POINT_SIZE}
                    step={0.1}
                    value={el.size}
                    onChange={(e) => {
                        store.editStyle(index, { size: parseFloat(e.target.value) })
                    }}
                />
            </div>)}
    </div>)
}

export default PointCloudControlls