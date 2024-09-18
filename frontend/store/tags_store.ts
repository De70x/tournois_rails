import type {Tag} from "~/types/Tag";

export const useTagsStore = () => {
    const tags = useState<Tag[]>('tags', () => [])

    const setTags = (nouveauxTags: Tag[]) => {
        tags.value = nouveauxTags;
    }

    const createTag = async (tag: Partial<Tag>) => {
        const {$api} = useNuxtApp()
        const nouveauTag = await $api.post<Tag>('/tags', tag)
        tags.value.push(nouveauTag!.data)
    }

    const editTag = async (tag: Partial<Tag>) => {
        const {$api} = useNuxtApp()
        await $api.patch<Tag>(`/tags/${tag.id}`, {
            nom: tag.nom,
            icon: tag.icon,
        })
        tags.value = tags.value.map(t => t.id === tag.id ? {
            ...t,
            nom: tag.nom,
            icon: tag.icon,
        } as Tag : t)
    }

    const deleteTag = async (id: number) => {
        const {$api} = useNuxtApp()
        await $api.delete<Tag>(`/tags/${id}`)
        tags.value = tags.value.filter(t => t.id !== id)
    }

    return {
        tags,
        setTags,
        createTag,
        editTag,
        deleteTag
    }

}
