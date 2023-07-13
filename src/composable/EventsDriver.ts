import { UnwrapNestedRefs, reactive } from "vue";
// import { marker } from '@/utils/daysManipulations'

export const schemaMode: UnwrapNestedRefs<{
    visualization: 'people' | 'person'
}> = reactive({
    visualization: 'person'
})



export const useEventDriver = () => {

    const requiresRevision = () => {

    }

    return {
        requiresRevision
    }
}

