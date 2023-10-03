import { PointCloudStyles, PointCloudStylesStore } from "@/store/PointCloudStylesStore"
import { Cesium3DTileStyle } from "cesium"

export {
    getColorConditions,
    getSizeConditions,
    getShowConditions,
    create3DTileStyle
}

const getColorConditions = ({ color, opacity, type, value }: PointCloudStyles): [string, string] => [
    `\${${type}} === ${value}`,
    `color('${color}', ${opacity})`,
]

const getShowConditions = ({ value, type, visible }: PointCloudStyles): [string, string] => [
    `\${${type}} === ${value}`,
    visible.toString()
]

const getSizeConditions = ({ type, value, size }: PointCloudStyles): [string, string] => [
    `\${${type}} === ${value}`,
    size.toString()
]

const create3DTileStyle = (store: PointCloudStylesStore) => {
    return new Cesium3DTileStyle({
        color: {
            conditions: [
                ...store.styles.map(getColorConditions),
                ['true', "color('white', 1)"],
            ]
        },
        show: {
            conditions: [
                ...store.styles.map(getShowConditions),
            ]
        },
        pointSize: {
            conditions: [...store.styles.map(getSizeConditions)]
        },
    })
}
