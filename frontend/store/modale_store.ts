import type {CallbackType, DeleteType} from "~/types/Commun"
import {useStadesStore} from "~/store/stades_store";
import {message} from "memfs/lib/internal/errors";

export const useModaleStore = () => {
    const isOpen = useState<boolean>('is-open', () => false)
    const fonctionDeSuppression = useState<CallbackType>('fonctionDeSuppression')
    const objetASupprimer = useState<DeleteType>(
        'objetASupprimer',
        () => {
            return {
                id: -1, message:
                    'Aucun objet à supprimer'
            }
        })
    const openModale = () => {
        isOpen.value = true
    }

    const closeModale = () => {
        isOpen.value = false
    }

    const configModale = (toDelete: DeleteType, fonction: CallbackType) => {
        objetASupprimer.value = toDelete
        fonctionDeSuppression.value = fonction
    }

    return {
        isOpen,
        openModale,
        closeModale,
        configModale,
        fonctionDeSuppression,
        objetASupprimer,
    }
}