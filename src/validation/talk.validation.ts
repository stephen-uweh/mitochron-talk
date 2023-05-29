import * as Joi from 'joi'

export function validateTalk(talk){
    const Schema = Joi.object().keys({
        title: Joi.string().label("Title").required()
    })

    return Schema.validate(talk)
}