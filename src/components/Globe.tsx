'use client'

import { create3DTileStyle } from '@/lib/utils/cesiumPointStyles'
import { Ion } from 'cesium'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Cesium3DTileset, Viewer } from 'resium'
import { PointCloudStylesStore, createStoreInitFunction } from '../store/PointCloudStylesStore'
import PointCloudControlls from './PointCloudControls'

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN ?? ''

const TEST_URL = process.env.NEXT_PUBLIC_TEST_3DTILES_URL ?? ''

const initStore = createStoreInitFunction()

export default observer(() => {
    const store = useLocalObservable(() => new PointCloudStylesStore())
    initStore(store)

    const showAll = () => {
        store.styles.forEach((_, index) => store.editStyle(index, { visible: true }))
    }

    const style = create3DTileStyle(store)

    return (
        <div>
            <PointCloudControlls store={store}></PointCloudControlls>
            <Viewer full>
                <Cesium3DTileset url={TEST_URL} style={style} onInitialTilesLoad={showAll}></Cesium3DTileset>
            </Viewer>
        </div>
    )
})
