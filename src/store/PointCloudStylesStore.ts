'use client'

import { action, makeAutoObservable, observable } from "mobx";

export const CLASSIFICATION = 'CLASSIFICATION'
export const INTENSITY = 'INTENSITY'

export type PointInformation = typeof CLASSIFICATION
    | typeof INTENSITY

export type PointCloudStyles = {
    color: string
    type: PointInformation,
    value: number
    visible: boolean
    opacity: number
    label: string
    size: number
}

export class PointCloudStylesStore {
    styles: PointCloudStyles[] = []

    constructor() {
        makeAutoObservable(this, {
            styles: observable,
            addStyle: action,
        })
    }

    addStyle(input: PointCloudStyles) {
        this.styles.push(input)
    }

    editStyle(index: number, changes: Partial<PointCloudStyles>) {
        this.styles[index] = { ...this.styles[index], ...changes }
    }
}

export const createStoreInitFunction = (): (store: PointCloudStylesStore) => void  => {
    let isInitialized = false

    const fn = (store: PointCloudStylesStore) => {
        if (!isInitialized) {
            store.addStyle({ type: CLASSIFICATION, value: 2, label: 'Ground', color: "#ffaacc", opacity: 1, visible: false, size: 1 })
            store.addStyle({ type: CLASSIFICATION, value: 3, label: 'Low Vegetation', color: "#ffaacc", opacity: 1, visible: false, size: 1 })
            store.addStyle({ type: CLASSIFICATION, value: 4, label: 'Medium Vegetation', color: "#ffaacc", opacity: 1, visible: false, size: 2 })
            store.addStyle({ type: CLASSIFICATION, value: 5, label: 'High Vegetation', color: "#ffaacc", opacity: 1, visible: false, size: 3 })
            store.addStyle({ type: CLASSIFICATION, value: 6, label: 'Building', color: "#ffaacc", opacity: 1, visible: false, size: 1 })
            store.addStyle({ type: CLASSIFICATION, value: 7, label: 'Low Point', color: "#ffaacc", opacity: 1, visible: false, size: 1 })
            isInitialized = true
        }
    }

    return fn
}