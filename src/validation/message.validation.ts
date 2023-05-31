import * as Joi from 'joi'

export function validateMessage(message){
    const Schema = Joi.object().keys({
        talkId: Joi.string().label("TalkID").required(),
        attendeeEmail: Joi.string().label("Attendee ID").required(),
        message: Joi.string().label("Message").required()
    })

    return Schema.validate(message)
}