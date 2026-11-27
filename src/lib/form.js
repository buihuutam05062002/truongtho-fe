import {ERR} from './errorCodes'
export function applyServerErrors(err,setError){
    if(err?.details){
        Object.entries(err.details).forEach(([field,message]) =>
            setError(field,{type: 'server',message})
    )
    }
    if(err?.code === ERR.EMAIL_ALREADY_USED){
        setError('email', {type: 'server', message : err.message})
    }
}